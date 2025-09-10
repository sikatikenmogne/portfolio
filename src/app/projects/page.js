import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { getAllProjects } from '@/lib/content';
import portfolioData from '../../data/i18n/fr.json';
import socialLinksData from '../../data/social-links.json';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `Projets - ${fullName} | Portfolio Développeur`;
  const description = `Découvrez mes projets de développement web full stack : applications React, APIs .NET Core, solutions Spring Boot et plus encore.`;
  const ogImage = `${siteUrl}/images/projects/og-projects.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/projects`,
      languages: {
        'fr-CM': `${siteUrl}/projects`,
        'fr-FR': `${siteUrl}/projects`,
        'en-US': `${siteUrl}/en/projects`,
        'en-GB': `${siteUrl}/en/projects`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${fullName} - Projets` }],
      locale: 'fr_FR',
      alternateLocale: ['en_US'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <NavigationHeader
        socialLinks={socialLinksData.socialLinks}
        sticky={true}
        logoText="Samuel"
        ctaText="Me contacter"
        ctaHref="/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Mes Projets
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez mes réalisations en développement web full stack, de la conception à la mise
            en production.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectsGrid projects={projects} locale="fr" />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
