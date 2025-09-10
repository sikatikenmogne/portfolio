'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Calendar, Code } from 'lucide-react';
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
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
    <>
      <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={project.cover || '/images/projects/default-cover.jpg'}
            alt={project.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            priority={project.featured}
          />
          {project.featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {locale === 'fr' ? 'Vedette' : 'Featured'}
            </Badge>
          )}
          <Badge className={`absolute top-3 right-3 ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </Badge>
        </div>

        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(project.date)}</span>
            </div>
          </div>
          <CardDescription className="line-clamp-3 text-sm">{project.summary}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4" />
              <span>{project.role}</span>
            </div>

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

        <CardFooter className="flex gap-2 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex-1"
          >
            {locale === 'fr' ? 'Voir détails' : 'View Details'}
          </Button>

          {project.demo && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {project.repo && (
            <Button asChild variant="outline" size="sm">
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
