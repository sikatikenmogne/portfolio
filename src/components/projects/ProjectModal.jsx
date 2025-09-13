'use client';

import { ExternalLink, Github, Calendar, Code } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TechnologyBadge } from './TechnologyBadge';
import { extractContentExcerpt } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectModal({ project, isOpen, onClose, locale = 'fr' }) {
  if (!project) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header Section */}
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="space-y-3">
            <DialogTitle className="text-3xl font-bold leading-tight">{project.title}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
              {project.summary}
            </DialogDescription>

            {/* Project Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(project.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>
                  {project.technologies?.length || 0}{' '}
                  {locale === 'fr' ? 'technologies' : 'technologies'}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Project Image */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={project.cover || '/images/projects/default-cover.jpg'}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Project Content Excerpt */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {locale === 'fr' ? 'Aperçu du projet' : 'Project Overview'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {extractContentExcerpt(project.content, 250)}
            </p>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {locale === 'fr' ? 'Technologies utilisées' : 'Technologies Used'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechnologyBadge key={tech} technology={tech} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 border-t border-border/50 bg-muted/30">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="px-6">
              <Link
                href={
                  locale === 'fr' ? `/projects/${project.slug}` : `/en/projects/${project.slug}`
                }
              >
                {locale === 'fr' ? 'En savoir plus' : 'Learn More'}
              </Link>
            </Button>

            {project.demo && (
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Voir la démo' : 'View Demo'}
                </Link>
              </Button>
            )}

            {project.repo && (
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link href={project.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Code source' : 'Source Code'}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
