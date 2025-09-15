import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { extractContentExcerpt } from './markdown';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Chemin vers le dossier de contenu du blog
const blogDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Compile le contenu MDX avec les plugins nécessaires
 */
async function getCompiledMDX(sourceContent) {
  if (!sourceContent) return { frontmatter: {}, content: null };

  const { data: frontmatter, content: mdxContent } = matter(sourceContent);

  // Compiler le MDX avec les plugins nécessaires
  const { content: compiled } = await compileMDX({
    source: mdxContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          // suppression de rehype-highlight: gestion côté composant React
        ],
        format: 'mdx',
      },
    },
  });

  return {
    frontmatter,
    content: mdxContent,
    compiled,
  };
}

/**
 * Récupère un article de blog par son slug
 */
export async function getPostBySlug(slug) {
  if (!slug) return null;

  try {
    // Recherche le fichier avec extension .mdx
    const filePath = path.join(blogDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      console.warn(`Article non trouvé: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content, compiled } = await getCompiledMDX(fileContents);

    // Validation des champs obligatoires
    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`Article invalide: ${slug} - titre et date requis`);
      return null;
    }

    // Calcul du temps de lecture si non spécifié
    if (!frontmatter.readingTime) {
      const wordsPerMinute = 200;
      const wordCount = fileContents.split(/\s+/).length;
      frontmatter.readingTime = Math.ceil(wordCount / wordsPerMinute);
    }

    return {
      slug,
      ...frontmatter,
      content,
      compiled,
      excerpt: frontmatter.summary || extractContentExcerpt(fileContents),
    };
  } catch (error) {
    console.error(`Erreur lors du chargement de l'article ${slug}:`, error);
    return null;
  }
}

/**
 * Récupère tous les articles de blog disponibles
 * Trie par date décroissante et filtre les brouillons en production
 */
export function getAllPosts() {
  try {
    if (!fs.existsSync(blogDirectory)) {
      console.warn("Le dossier content/blog n'existe pas");
      return [];
    }

    const allFiles = fs.readdirSync(blogDirectory);
    const allPosts = allFiles
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Validation de base
        if (!data.title || !data.date) {
          console.warn(`Article invalide: ${fileName} - titre et date requis`);
          return null;
        }

        // Calcul du temps de lecture si non spécifié
        if (!data.readingTime) {
          const wordsPerMinute = 200;
          const wordCount = content.split(/\s+/).length;
          data.readingTime = Math.ceil(wordCount / wordsPerMinute);
        }

        // Déterminer une image de couverture si absente mais qu'une liste d'images est fournie
        if (!data.cover && Array.isArray(data.images) && data.images.length > 0) {
          data.cover = data.images[0];
        }

        return {
          ...data,
          slug: data.slug || fileName.replace(/\.(md|mdx)$/, ''),
          content,
          excerpt: data.summary || extractContentExcerpt(content),
        };
      })
      .filter((post) => post !== null)
      // En production, filtre les brouillons
      .filter((post) => process.env.NODE_ENV !== 'production' || !post.draft)
      // Tri par date décroissante
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return allPosts;
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error);
    return [];
  }
}

/**
 * Récupère les articles précédent et suivant
 */
export async function getSiblingPosts(slug) {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  return {
    previousPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

/**
 * Récupère tous les tags uniques des articles
 */
export function getAllTags() {
  const allPosts = getAllPosts();
  const tagsSet = new Set();

  allPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).sort();
}

/**
 * Récupère les articles par tag
 */
export function getPostsByTag(tag) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}

/**
 * Recherche dans les articles
 */
export function searchPosts(query) {
  if (!query || query.length < 2) {
    return [];
  }

  const allPosts = getAllPosts();
  const searchTerm = query.toLowerCase();

  return allPosts.filter((post) => {
    const searchableContent = `
      ${post.title}
      ${post.summary || ''}
      ${post.content || ''}
      ${post.tags ? post.tags.join(' ') : ''}
    `.toLowerCase();

    return searchableContent.includes(searchTerm);
  });
}

/**
 * Récupère les statistiques du blog
 */
export function getBlogStats() {
  const allPosts = getAllPosts();

  const stats = {
    total: allPosts.length,
    byTag: {},
    byYear: {},
    byCategory: {},
  };

  allPosts.forEach((post) => {
    // Stats par tag
    if (post.tags) {
      post.tags.forEach((tag) => {
        stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
      });
    }

    // Stats par année
    const year = new Date(post.date).getFullYear();
    stats.byYear[year] = (stats.byYear[year] || 0) + 1;

    // Stats par catégorie
    if (post.category) {
      stats.byCategory[post.category] = (stats.byCategory[post.category] || 0) + 1;
    }
  });

  return stats;
}

/**
 * Retourne les N articles les plus récents (option locale filtrée si frontmatter.lang)
 * @param {number} limit
 * @param {string} locale (ex: 'fr' | 'en')
 */
export function getRecentPosts(limit = 3, locale) {
  const all = getAllPosts();
  if (!locale) return all.slice(0, limit);

  const localized = all.filter((p) => !p.lang || p.lang === locale);

  if (localized.length === 0) {
    // Fallback: retourner quand même les plus récents toutes langues pour éviter un bloc vide
    return all.slice(0, limit);
  }
  return localized.slice(0, limit);
}
