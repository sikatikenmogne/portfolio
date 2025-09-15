// src/lib/content.js - Chargeur de contenu avec support MDX
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { extractContentExcerpt } from './markdown';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Chemins vers les dossiers de contenu
const projectsDirectory = path.join(process.cwd(), 'content/projects');
const blogDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Récupère un article de blog par son slug
 */
export async function getPostBySlug(slug) {
  if (!slug) return null;

  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Article non trouvé: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, content } = await getCompiledMDX(fileContents);

    return {
      slug,
      ...frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Erreur lors du chargement de l'article ${slug}:`, error);
    return null;
  }
}

/**
 * Charge et compile le contenu MDX d'un fichier
 */
async function getCompiledMDX(content) {
  if (!content) return { frontmatter: {}, content: null };

  const { frontmatter, content: mdxContent } = matter(content);

  const mdx = await compileMDX({
    source: mdxContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    },
  });

  return {
    frontmatter,
    content: mdx,
  };
}

/**
 * Récupère tous les projets disponibles
 * Trie par date décroissante et met les projets vedettes en premier
 */
export function getAllProjects() {
  try {
    // Vérification que le dossier existe
    if (!fs.existsSync(projectsDirectory)) {
      console.warn("Le dossier content/projects n'existe pas");
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);

    const allProjects = fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.(md|mdx)$/, '');
        return getProjectBySlug(slug);
      })
      .filter((project) => project !== null) // Filtre les projets invalides
      .sort((a, b) => {
        // Tri : projets vedettes d'abord, puis par date décroissante
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;

        const dateA = new Date(a.date || '1970-01-01');
        const dateB = new Date(b.date || '1970-01-01');
        return dateB.getTime() - dateA.getTime();
      });

    return allProjects;
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
    return [];
  }
}

/**
 * Récupère un projet spécifique par son slug
 * Charge et parse le fichier Markdown/MDX correspondant
 */
export function getProjectBySlug(slug) {
  try {
    // Recherche du fichier avec extensions .md ou .mdx
    const possibleExtensions = ['md', 'mdx'];
    let filePath = null;
    let fileExtension = null;

    for (const ext of possibleExtensions) {
      const testPath = path.join(projectsDirectory, `${slug}.${ext}`);
      if (fs.existsSync(testPath)) {
        filePath = testPath;
        fileExtension = ext;
        break;
      }
    }

    if (!filePath) {
      console.warn(`Projet non trouvé: ${slug}`);
      return null;
    }

    // Lecture et parsing du fichier
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validation des champs obligatoires
    if (!data.title) {
      console.warn(`Projet ${slug}: titre manquant`);
      return null;
    }

    // Construction de l'objet projet avec valeurs par défaut
    const project = {
      slug,
      title: data.title,
      summary: data.summary || extractContentExcerpt(content, 160),
      content,
      fileExtension,

      // Métadonnées techniques
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      role: data.role || 'Développeur',
      status: data.status || 'completed',

      // Indicateurs
      featured: Boolean(data.featured),

      // Dates
      date: data.date || new Date().toISOString().split('T')[0],
      lastModified: getFileLastModified(filePath),

      // Médias
      cover: data.cover || '/images/projects/default-cover.jpg',
      gallery: Array.isArray(data.gallery) ? data.gallery : [],

      // Liens externes
      demo: data.demo || null,
      repo: data.repo || null,

      // SEO et métadonnées
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.summary,
      keywords: Array.isArray(data.keywords) ? data.keywords : data.technologies || [],

      // Données additionnelles du front matter
      ...data,
    };

    return project;
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${slug}:`, error);
    return null;
  }
}

/**
 * Récupère les projets vedettes pour l'affichage sur la page d'accueil
 */
export function getFeaturedProjects(limit = 3) {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.featured).slice(0, limit);
}

/**
 * Récupère les projets par technologie
 */
export function getProjectsByTechnology(technology) {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.technologies.includes(technology));
}

/**
 * Récupère les technologies utilisées dans tous les projets
 * Utile pour générer des filtres ou des statistiques
 */
export function getAllTechnologies() {
  const allProjects = getAllProjects();
  const technologiesSet = new Set();

  allProjects.forEach((project) => {
    project.technologies.forEach((tech) => {
      technologiesSet.add(tech);
    });
  });

  return Array.from(technologiesSet).sort();
}

/**
 * Recherche dans les projets par terme
 */
export function searchProjects(searchTerm) {
  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  const allProjects = getAllProjects();
  const term = searchTerm.toLowerCase();

  return allProjects.filter((project) => {
    const searchableContent = [
      project.title,
      project.summary,
      project.content,
      ...(project.technologies || []),
      project.role,
    ]
      .join(' ')
      .toLowerCase();

    return searchableContent.includes(term);
  });
}

/**
 * Récupère les statistiques des projets
 * Utile pour des dashboards ou des métriques
 */
export function getProjectsStats() {
  const allProjects = getAllProjects();

  const stats = {
    total: allProjects.length,
    featured: allProjects.filter((p) => p.featured).length,
    byStatus: {},
    byYear: {},
    technologies: {},
  };

  allProjects.forEach((project) => {
    // Statistiques par statut
    const status = project.status || 'completed';
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

    // Statistiques par année
    const year = new Date(project.date).getFullYear();
    stats.byYear[year] = (stats.byYear[year] || 0) + 1;

    // Statistiques par technologie
    project.technologies.forEach((tech) => {
      stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
    });
  });

  return stats;
}

/**
 * Fonction utilitaire pour récupérer la date de dernière modification d'un fichier
 */
function getFileLastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (error) {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Valide la structure d'un projet
 * Utile pour vérifier l'intégrité des données
 */
export function validateProject(project) {
  const errors = [];

  if (!project.title) {
    errors.push('Titre manquant');
  }

  if (!project.summary || project.summary.length < 10) {
    errors.push('Résumé trop court (minimum 10 caractères)');
  }

  if (!project.technologies || project.technologies.length === 0) {
    errors.push('Aucune technologie spécifiée');
  }

  if (!project.date || isNaN(Date.parse(project.date))) {
    errors.push('Date invalide');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Génère un slug à partir d'un titre
 * Utile pour créer automatiquement des slugs
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD') // Normalise les accents
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^\w\s-]/g, '') // Garde seulement lettres, chiffres, espaces et tirets
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim();
}

// Note: Les fonctions de blog sont exportées directement depuis content-blog.js

// Export par défaut pour la compatibilité
const contentUtils = {
  getAllProjects,
  getProjectBySlug,
  getFeaturedProjects,
  getProjectsByTechnology,
  getAllTechnologies,
  searchProjects,
  getProjectsStats,
  validateProject,
  generateSlug,
};

export default contentUtils;
