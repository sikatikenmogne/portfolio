'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

/**
 * DownloadButton - Client Component for Interactivity
 *
 * Handles CV download logic on the client side
 * Separated from Server Components to avoid Next.js 13+ errors
 */
export function DownloadButton({
  cvPath,
  filename,
  className,
  size = 'lg',
  variant = 'default',
  children,
}) {
  const handleDownload = async () => {
    try {
      // Track download event for analytics (future)
      console.log('CV Download initiated:', filename);

      // Create download link
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Could add toast notification here with Shadcn Toast
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleDownload}
      className={`group ${className || ''}`}
    >
      <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
      {children || 'Télécharger mon CV'}
    </Button>
  );
}
