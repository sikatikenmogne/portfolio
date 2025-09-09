import { useState, useCallback } from 'react';
import githubService from '@/lib/github-service';

export function useGitHubDownload() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | fallback | error
  const [error, setError] = useState(null);
  const [releaseInfo, setReleaseInfo] = useState(null);

  const downloadFromGitHub = useCallback(
    async (username, repo, filename, fallbackConfig) => {
      try {
        setStatus('loading');
        setError(null);

        console.log(`[Download] Attempting GitHub: ${username}/${repo}/${filename}`);

        const result = await githubService.getDownloadUrl(username, repo, filename);

        if (result.success) {
          // Succès GitHub - téléchargement direct
          setReleaseInfo(result.release);

          const link = document.createElement('a');
          link.href = result.downloadUrl;
          link.download = filename;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setStatus('success');

          console.log(`[Download] GitHub success: ${result.release.tag}`);

          return { success: true, method: 'github', release: result.release };
        } else {
          // Échec GitHub - utiliser fallback si disponible
          console.warn(`[Download] GitHub failed: ${result.message}`);

          if (fallbackConfig && fallbackConfig.path) {
            console.log(`[Download] Using fallback: ${fallbackConfig.path}`);

            const link = document.createElement('a');
            link.href = fallbackConfig.path;
            link.download = fallbackConfig.filename || filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus('fallback');

            return { success: true, method: 'fallback' };
          } else {
            // Pas de fallback disponible
            setStatus('error');
            setError(result);

            return { success: false, error: result };
          }
        }
      } catch (error) {
        console.error('[Download] Unexpected error:', error);

        setStatus('error');
        setError({
          error: 'unexpected_error',
          message: error.message,
        });

        // Fallback en cas d'erreur inattendue
        if (fallbackConfig && fallbackConfig.path) {
          console.log('[Download] Emergency fallback');

          const link = document.createElement('a');
          link.href = fallbackConfig.path;
          link.download = fallbackConfig.filename || filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setStatus('fallback');
          return { success: true, method: 'fallback' };
        }

        return { success: false, error: { error: 'unexpected_error', message: error.message } };
      } finally {
        // Reset status après 3 secondes
        setTimeout(() => {
          if (status !== 'idle') {
            setStatus('idle');
            setError(null);
          }
        }, 3000);
      }
    },
    [status]
  );

  return {
    downloadFromGitHub,
    status,
    error,
    releaseInfo,
    isLoading: status === 'loading',
  };
}
