'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';

export function ProjectsGrid({ projects, locale = 'fr' }) {
  const [filters, setFilters] = useState([]);

  const filteredProjects = useMemo(() => {
    if (!filters || filters.length === 0) {
      return projects;
    }

    return projects.filter((project) => {
      return filters.every((filter) => {
        if (filter.type === 'technology') {
          return project.technologies && project.technologies.includes(filter.value);
        }
        if (filter.type === 'status') {
          return project.status === filter.value;
        }
        return true;
      });
    });
  }, [projects, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-8">
      <ProjectFilter projects={projects} onFilterChange={handleFilterChange} locale={locale} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {locale === 'fr'
              ? 'Aucun projet trouvé avec ces filtres. Essayez de modifier vos critères de recherche.'
              : 'No projects found with these filters. Try adjusting your search criteria.'}
          </p>
        </div>
      )}
    </div>
  );
}
