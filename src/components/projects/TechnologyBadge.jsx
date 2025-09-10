'use client';

import { Badge } from '@/components/ui/badge';
import technologiesData from '@/data/technologies.json';

export function TechnologyBadge({ technology, className = '' }) {
  const techConfig = technologiesData.technologies.find((tech) => tech.name === technology);

  if (!techConfig) {
    return (
      <Badge variant="secondary" className={`text-xs ${className}`}>
        {technology}
      </Badge>
    );
  }

  return <Badge className={`text-xs ${techConfig.color} ${className}`}>{technology}</Badge>;
}
