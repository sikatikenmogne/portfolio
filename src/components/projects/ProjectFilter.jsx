'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function ProjectFilter({ projects, onFilterChange, locale = 'fr' }) {
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);

  // Extract unique technologies and statuses
  const technologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  const statuses = Array.from(new Set(projects.map((project) => project.status))).sort();

  const statusLabels = {
    completed: locale === 'fr' ? 'Terminé' : 'Completed',
    'in-progress': locale === 'fr' ? 'En cours' : 'In Progress',
    planned: locale === 'fr' ? 'Planifié' : 'Planned',
  };

  const handleTechChange = (value) => {
    setSelectedTech(value);
    updateFilters();
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    updateFilters();
  };

  const updateFilters = () => {
    const filters = [];
    if (selectedTech !== 'all') filters.push({ type: 'technology', value: selectedTech });
    if (selectedStatus !== 'all') filters.push({ type: 'status', value: selectedStatus });

    setActiveFilters(filters);
    onFilterChange(filters);
  };

  const removeFilter = (filterType) => {
    if (filterType === 'technology') {
      setSelectedTech('all');
    } else if (filterType === 'status') {
      setSelectedStatus('all');
    }
    updateFilters();
  };

  const clearAllFilters = () => {
    setSelectedTech('all');
    setSelectedStatus('all');
    setActiveFilters([]);
    onFilterChange([]);
  };

  // Update filters when selections change
  useEffect(() => {
    updateFilters();
  }, [selectedTech, selectedStatus]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Technology Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">
            {locale === 'fr' ? 'Technologie' : 'Technology'}
          </label>
          <Select value={selectedTech} onValueChange={handleTechChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={locale === 'fr' ? 'Toutes les technologies' : 'All technologies'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {locale === 'fr' ? 'Toutes les technologies' : 'All technologies'}
              </SelectItem>
              {technologies.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">
            {locale === 'fr' ? 'Statut' : 'Status'}
          </label>
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder={locale === 'fr' ? 'Tous les statuts' : 'All statuses'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {locale === 'fr' ? 'Tous les statuts' : 'All statuses'}
              </SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusLabels[status] || status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {locale === 'fr' ? 'Filtres actifs:' : 'Active filters:'}
          </span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter.type === 'technology' ? 'Tech' : 'Status'}: {filter.value}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => removeFilter(filter.type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            {locale === 'fr' ? 'Effacer tout' : 'Clear all'}
          </Button>
        </div>
      )}
    </div>
  );
}
