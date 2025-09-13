import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import portfolioData from '@/data/i18n/en.json';
import socialLinksData from '@/data/social-links.json';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { parseMarkdownContent } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  const title = `${project.title} - Projects | ${portfolioData?.personal?.fullName || 'Samuel Sikati'}`;
  const description = project.summary;
  const ogImage = `${siteUrl}/images/projects/og-${project.slug}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/en/projects/${project.slug}`,
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
      url: `${siteUrl}/en/projects/${project.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
      locale: 'en_US',
      alternateLocale: ['fr_FR'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectDetailPageEN({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <NavigationHeader
        socialLinks={socialLinksData.socialLinks}
        sticky={true}
        logoText="Samuel"
        ctaText="Contact me"
        ctaHref="/en/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <article className="space-y-6">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
            <p className="text-muted-foreground text-lg">{project.summary}</p>
          </header>

          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={project.cover || '/images/projects/default-cover.jpg'}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-72 object-cover"
            />
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-muted">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            {project.demo && (
              <Link
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" /> View demo
              </Link>
            )}
            {project.repo && (
              <Link
                className="inline-flex items-center gap-2 px-4 py-2 rounded border"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> Source code
              </Link>
            )}
          </section>

          <section className="prose prose-gray dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: parseMarkdownContent(project.content || '') }}
            />
          </section>
        </article>
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
