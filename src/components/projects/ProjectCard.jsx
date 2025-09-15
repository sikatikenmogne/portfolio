'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TechnologyBadge } from './TechnologyBadge';
import { ProjectModal } from './ProjectModal';

export function ProjectCard({ project, locale = 'fr' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Date display removed for simplified card

  // Status and role visuals removed for a cleaner card

  return (
    <>
      <Card className="group h-full flex flex-col hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border-border/50 hover:-translate-y-1 bg-primary/10">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={project.cover || '/images/projects/default-cover.jpg'}
            alt={project.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            priority={project.featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-3 text-sm">{project.summary}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <TechnologyBadge key={tech} technology={tech} />
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 pt-0 border-t border-border/50 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
          >
            {locale === 'fr' ? 'Voir détails' : 'View Details'}
          </Button>

          {project.demo && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="group-hover:bg-accent group-hover:border-accent transition-all duration-300"
            >
              <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {project.repo && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="group-hover:bg-accent group-hover:border-accent transition-all duration-300"
            >
              <Link href={project.repo} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
