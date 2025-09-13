// src/app/projects/[slug]/page.js
// Page projet avec support MDX complet et styles cohérents

import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { processMarkdown, generateTableOfContents, formatProjectMetadata } from '@/lib/markdown';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import portfolioData from '@/data/i18n/fr.json';
import socialLinksData from '@/data/social-links.json';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Clock, Tag, User } from 'lucide-react';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

// Génération statique des paramètres
export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: "Le projet demandé n'existe pas.",
    };
  }

  const formattedProject = formatProjectMetadata(project);
  const title = `${project.title} - Projets | ${portfolioData?.personal?.fullName || 'Samuel Sikati'}`;
  const description = formattedProject.summary;
  const ogImage = `${siteUrl}/images/projects/og-${project.slug}.jpg`;

  return {
    title,
    description,
    keywords: [
      ...(project.technologies || []),
      'développement web',
      'portfolio',
      'projet',
      project.title,
      portfolioData?.personal?.fullName,
    ].join(', '),

    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
      languages: {
        'fr-FR': `${siteUrl}/projects/${project.slug}`,
        'fr-CM': `${siteUrl}/projects/${project.slug}`,
        'en-US': `${siteUrl}/en/projects/${project.slug}`,
        'en-GB': `${siteUrl}/en/projects/${project.slug}`,
      },
    },

    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      type: 'article',
      publishedTime: project.date,
      modifiedTime: project.lastUpdated || project.date,
      authors: [portfolioData?.personal?.fullName],
      tags: project.technologies,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
          type: 'image/jpeg',
        },
      ],
      locale: 'fr_FR',
      alternateLocale: ['en_US'],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: portfolioData?.social?.twitter || '@samuelsikati',
    },

    // Données structurées pour les moteurs de recherche
    other: {
      'article:author': portfolioData?.personal?.fullName,
      'article:published_time': project.date,
      'article:modified_time': project.lastUpdated || project.date,
      'article:section': 'Portfolio',
      'article:tag': project.technologies?.join(', '),
    },
  };
}

// Composant Badge de statut
function ProjectStatusBadge({ status, className = '' }) {
  const statusConfig = {
    completed: {
      label: 'Terminé',
      className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    'in-progress': {
      label: 'En cours',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    },
    planned: {
      label: 'Planifié',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    },
    archived: {
      label: 'Archivé',
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    },
  };

  const config = statusConfig[status] || statusConfig.completed;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}

// Composant Badge de technologie
function TechnologyBadge({ tech, className = '' }) {
  const techColors = {
    React: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Next.js': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Python: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    PostgreSQL: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    MongoDB: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Docker: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const defaultColor = 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  const colorClass = techColors[tech] || defaultColor;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colorClass} ${className}`}
    >
      {tech}
    </span>
  );
}

// Composant Table des matières
function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) return null;

  return (
    <div className="table-of-contents bg-muted/30 rounded-lg p-6 mb-8 border">
      <h2 className="flex items-center gap-2 font-semibold text-base text-foreground mb-4">
        <Tag className="h-4 w-4" />
        Table des matières
      </h2>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map((heading, index) => (
            <li key={index} style={{ marginLeft: `${(heading.level - 1) * 16}px` }}>
              <a
                href={`#${heading.slug}`}
                className="text-muted-foreground hover:text-foreground transition-colors block py-1 hover:underline"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// Composant Actions du projet
function ProjectActions({ demo, repo, className = '' }) {
  if (!demo && !repo) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {demo && (
        <Link
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <ExternalLink className="h-4 w-4" />
          Voir la démo
        </Link>
      )}
      {repo && (
        <Link
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
        >
          <Github className="h-4 w-4" />
          Code source
        </Link>
      )}
    </div>
  );
}

// Composant principal de la page
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Traitement des données du projet
  const formattedProject = formatProjectMetadata(project);
  const processedContent = await processMarkdown(project.content || '');
  const tableOfContents = generateTableOfContents(project.content || '');

  return (
    <div className="min-h-screen bg-background">
      {/* Header de navigation */}
      <NavigationHeader
        socialLinks={socialLinksData.socialLinks}
        sticky={true}
        logoText="Samuel"
        ctaText="Contact"
        ctaHref="/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation de retour */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Retour aux projets
          </Link>
        </nav>

        <article className="space-y-8">
          {/* En-tête du projet */}
          <header className="space-y-6">
            {/* Image de couverture */}
            {project.cover && (
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={project.cover}
                  alt={`Aperçu du projet ${project.title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Projet vedette
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Titre et métadonnées */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <ProjectStatusBadge status={project.status} />
                {project.role && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    {project.role}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {project.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {formattedProject.summary}
              </p>

              {/* Métadonnées du projet */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedProject.formattedDate}</span>
                </div>
                {formattedProject.readingTime > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formattedProject.readingTime} min de lecture</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Technologies utilisées */}
          {project.technologies && project.technologies.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <TechnologyBadge key={index} tech={tech} />
                ))}
              </div>
            </section>
          )}

          {/* Actions du projet */}
          <ProjectActions demo={project.demo} repo={project.repo} />

          {/* Table des matières */}
          <TableOfContents headings={tableOfContents} />

          {/* Contenu principal */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
          </section>

          {/* Footer de l'article */}
          <footer className="border-t border-border pt-8 mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                {project.lastUpdated && (
                  <p>
                    Dernière mise à jour :{' '}
                    {new Date(project.lastUpdated).toLocaleDateString('fr-FR')}
                  </p>
                )}
                <p>Auteur : {portfolioData?.personal?.fullName}</p>
              </div>

              <ProjectActions demo={project.demo} repo={project.repo} />
            </div>
          </footer>
        </article>

        {/* Navigation vers d'autres projets */}
        <nav className="mt-16 pt-8 border-t border-border" aria-label="Projets connexes">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Découvrir d&apos;autres projets</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted hover:bg-accent rounded-lg transition-colors font-medium"
            >
              Voir tous les projets
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </nav>
      </main>

      {/* Footer */}
      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </div>
  );
}
