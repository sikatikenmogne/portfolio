'use client';

import { ExternalLink, Github, Calendar, Code, User, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TechnologyBadge } from './TechnologyBadge';
import { parseMarkdownContent } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectModal({ project, isOpen, onClose, locale = 'fr' }) {
  if (!project) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      completed: locale === 'fr' ? 'Terminé' : 'Completed',
      'in-progress': locale === 'fr' ? 'En cours' : 'In Progress',
      planned: locale === 'fr' ? 'Planifié' : 'Planned',
    };
    return statusMap[status] || status;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">{project.title}</DialogTitle>
              <DialogDescription className="text-lg">{project.summary}</DialogDescription>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </Badge>
              {project.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  {locale === 'fr' ? 'Vedette' : 'Featured'}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={project.cover || '/images/projects/default-cover.jpg'}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{project.role}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4" />
              <span>{project.technologies.length} technologies</span>
            </div>
          </div>

          <Separator />

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {locale === 'fr' ? 'Technologies utilisées' : 'Technologies Used'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechnologyBadge key={tech} technology={tech} className="text-sm" />
              ))}
            </div>
          </div>

          <Separator />

          {/* Project Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: parseMarkdownContent(project.content) }} />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <Button asChild>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Voir la démo' : 'View Demo'}
                </Link>
              </Button>
            )}

            {project.repo && (
              <Button asChild variant="outline">
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
