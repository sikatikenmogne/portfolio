// src/components/shared/DownloadButton.jsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, RefreshCw, Clock, Wifi, WifiOff } from 'lucide-react';
import { useGitHubDownload } from '@/hooks/useGitHubDownload';

/**
 * DownloadButton avec GitHub API client-side
 * Compatible JAMstack avec fallback intelligent
 */
export function DownloadButton({
  // Configuration GitHub
  githubUser,
  githubRepo,
  githubFilename,

  // Configuration fallback
  fallbackPath,
  fallbackFilename,

  // Apparence
  className,
  size = 'lg',
  variant = 'default',
  children,
  showStatus = false,
  showReleaseInfo = false,
}) {
  const { downloadFromGitHub, status, error, releaseInfo, isLoading } = useGitHubDownload();

  const handleDownload = async () => {
    if (!githubUser || !githubRepo || !githubFilename) {
      console.warn('[Download] Configuration GitHub incomplète, utilisation du fallback');

      if (fallbackPath) {
        const link = document.createElement('a');
        link.href = fallbackPath;
        link.download = fallbackFilename || 'download.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return;
    }

    await downloadFromGitHub(
      githubUser,
      githubRepo,
      githubFilename,
      fallbackPath ? { path: fallbackPath, filename: fallbackFilename } : null
    );
  };

  // États visuels du bouton
  const getButtonContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Connexion GitHub...
          </>
        );

      case 'success':
        return (
          <>
            <Download className="mr-2 h-4 w-4 text-green-500" />
            <Wifi className="mr-1 h-3 w-3 text-green-500" />
            Téléchargé
          </>
        );

      case 'fallback':
        return (
          <>
            <Download className="mr-2 h-4 w-4 text-orange-500" />
            <WifiOff className="mr-1 h-3 w-3 text-orange-500" />
            Version locale
          </>
        );

      case 'error':
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            Erreur
          </>
        );

      default:
        return (
          <>
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {children || 'Télécharger CV'}
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (status) {
      case 'success':
        return 'default';
      case 'fallback':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return variant;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'loading':
        return 'Récupération de la dernière version...';
      case 'success':
        return releaseInfo
          ? `Version ${releaseInfo.tag} (${new Date(releaseInfo.publishedAt).toLocaleDateString()})`
          : 'Dernière version GitHub';
      case 'fallback':
        return 'Version de sauvegarde utilisée';
      case 'error':
        if (error?.error === 'rate_limit_exceeded') {
          const resetDate = new Date(error.resetTime);
          return `Limite GitHub atteinte (reset: ${resetDate.toLocaleTimeString()})`;
        }
        return error?.message || 'Erreur GitHub';
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        size={size}
        variant={getButtonVariant()}
        onClick={handleDownload}
        disabled={isLoading}
        className={`group ${className || ''}`}
      >
        {getButtonContent()}
      </Button>

      {/* Status avec informations détaillées */}
      {showStatus && status !== 'idle' && (
        <div className="text-xs text-muted-foreground text-center">{getStatusMessage()}</div>
      )}

      {/* Informations de release en mode succès */}
      {showReleaseInfo && releaseInfo && status === 'success' && (
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <div className="font-medium">{releaseInfo.name}</div>
          <div>Publié le {new Date(releaseInfo.publishedAt).toLocaleDateString()}</div>
        </div>
      )}

      {/* Debug en développement */}
      {process.env.NODE_ENV === 'development' && error && (
        <details className="text-xs text-red-600">
          <summary>Debug Info</summary>
          <pre className="mt-1 p-2 bg-red-50 rounded text-xs overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

export default DownloadButton;
