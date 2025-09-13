'use client';

import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedProjects({ projects, locale = 'fr' }) {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            {locale === 'fr' ? 'Projets Vedettes' : 'Featured Projects'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {locale === 'fr'
              ? 'Découvrez quelques-unes de mes réalisations les plus récentes et innovantes.'
              : 'Discover some of my most recent and innovative achievements.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href={locale === 'fr' ? '/projects' : '/en/projects'}>
              {locale === 'fr' ? 'Voir tous les projets' : 'View All Projects'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
