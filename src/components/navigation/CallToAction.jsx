'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CallToAction({ cvPath, filename, availability }) {
  const handleDownload = async () => {
    try {
      console.log('CV Download initiated:', filename);

      const link = document.createElement('a');
      link.href = cvPath;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Primary CTA - Download CV */}
      <Button size="lg" onClick={handleDownload} className="group relative overflow-hidden">
        <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
        Télécharger mon CV
      </Button>

      {/* Availability Status Badge */}
      {availability && (
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {availability}
          </Badge>
        </div>
      )}
    </div>
  );
}

/**
 * Secondary CTA Component - Client Component for external links
 */
export function SecondaryCTA({ href, children, variant = 'outline', external = false, className }) {
  const handleClick = () => {
    // Track CTA clicks (future analytics)
    console.log('Secondary CTA clicked:', href);
  };

  if (external) {
    return (
      <Button variant={variant} className={cn('group', className)} onClick={handleClick} asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={className} onClick={handleClick} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
}

/**
 * CTA Group - Layout wrapper for multiple actions
 */
export function CTAGroup({ children, className }) {
  return (
    <div className={cn('flex flex-col sm:flex-row items-center gap-4', className)}>{children}</div>
  );
}
