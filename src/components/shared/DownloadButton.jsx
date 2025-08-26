'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * DownloadButton avec logique de fallback intelligente
 *
 * Tentative 1: API GitHub dynamique
 * Fallback: Fichier local statique
 */
export function DownloadButton({
  // Paramètres GitHub
  githubUser,
  githubRepo,
  githubResource,

  // Fallback local
  fallbackPath,
  fallbackFilename,

  // Apparence
  className,
  size = 'lg',
  variant = 'default',
  children,
  showStatus = false,
}) {
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle | loading | success | fallback | error
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Tentative de téléchargement via API GitHub
   */
  const attemptGitHubDownload = async () => {
    try {
      setDownloadStatus('loading');

      // Appel à notre API locale qui gère GitHub
      const apiUrl = `https://github-release-file-downloader-grsdjv92s.vercel.app/api/download?user=${encodeURIComponent(githubUser)}&repo=${encodeURIComponent(githubRepo)}&resource=${encodeURIComponent(githubResource)}&format=json`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success && data.download_url) {
        // Succès - téléchargement direct
        console.log('[Download] GitHub API success:', data.release_tag);

        // Créer le lien de téléchargement
        const link = document.createElement('a');
        link.href = data.download_url;
        link.download = data.filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadStatus('success');

        // Reset status après 3 secondes
        setTimeout(() => setDownloadStatus('idle'), 3000);

        return true;
      } else {
        throw new Error(data.error || 'API response invalid');
      }
    } catch (error) {
      console.warn('[Download] GitHub API failed:', error.message);
      setErrorMessage(error.message);
      return false;
    }
  };

  /**
   * Fallback vers fichier local
   */
  const fallbackToLocal = () => {
    console.log('[Download] Using local fallback:', fallbackPath);

    setDownloadStatus('fallback');

    // Téléchargement du fichier local
    const link = document.createElement('a');
    link.href = fallbackPath;
    link.download = fallbackFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset status après 3 secondes
    setTimeout(() => setDownloadStatus('idle'), 3000);
  };

  /**
   * Gestion principale du téléchargement
   */
  const handleDownload = async () => {
    // Vérification des paramètres
    if (!githubUser || !githubRepo || !githubResource) {
      console.warn('[Download] Missing GitHub parameters, using fallback');
      fallbackToLocal();
      return;
    }

    // Tentative GitHub API
    const githubSuccess = await attemptGitHubDownload();

    // Si échec GitHub, utiliser le fallback local
    if (!githubSuccess && fallbackPath) {
      console.log('[Download] GitHub failed, switching to local fallback');
      setTimeout(fallbackToLocal, 500); // Petit délai pour l'UX
    } else if (!githubSuccess) {
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }
  };

  // États visuels du bouton
  const getButtonContent = () => {
    switch (downloadStatus) {
      case 'loading':
        return (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Récupération...
          </>
        );

      case 'success':
        return (
          <>
            <Download className="mr-2 h-4 w-4 text-green-500" />
            Téléchargé !
          </>
        );

      case 'fallback':
        return (
          <>
            <Download className="mr-2 h-4 w-4 text-orange-500" />
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
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:cursor-pointer group-hover:scale-110" />
            {children || 'Télécharger mon CV'}
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (downloadStatus) {
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

  return (
    <div className="flex flex-col gap-2">
      <Button
        size={size}
        variant={getButtonVariant()}
        onClick={handleDownload}
        disabled={downloadStatus === 'loading'}
        className={`group ${className || ''}`}
      >
        {getButtonContent()}
      </Button>

      {/* Affichage du statut si demandé */}
      {showStatus && downloadStatus !== 'idle' && (
        <div className="text-xs text-muted-foreground text-center">
          {downloadStatus === 'loading' && 'Connexion à GitHub...'}
          {downloadStatus === 'success' && 'Dernière version GitHub'}
          {downloadStatus === 'fallback' && 'Version de sauvegarde utilisée'}
          {downloadStatus === 'error' && `Erreur: ${errorMessage}`}
        </div>
      )}
    </div>
  );
}

/**
 * Hook pour construire les URLs de téléchargement (optionnel)
 */
export function useDownloadUrls(profileData) {
  const buildGitHubUrl = async (resource) => {
    try {
      const response = await fetch(
        `https://github-release-file-downloader-grsdjv92s.vercel.app/api/download?user=${profileData.personal.githubUsername}&repo=${profileData.documents.cvGithubRepo}&resource=${resource}&format=json`
      );
      const data = await response.json();
      return data.success ? data.download_url : null;
    } catch {
      return null;
    }
  };

  return { buildGitHubUrl };
}

export default DownloadButton;
