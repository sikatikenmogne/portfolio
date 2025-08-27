/**
 * Service GitHub API côté client
 * Compatible JAMstack - pas de serveur nécessaire
 */

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_CACHE_KEY = 'github_rate_limit';
const RELEASE_CACHE_PREFIX = 'github_release_';

class GitHubService {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Vérification du rate limiting GitHub
   */
  checkRateLimit() {
    const cached = localStorage.getItem(RATE_LIMIT_CACHE_KEY);
    if (!cached) return { canMakeRequest: true };

    const rateLimitData = JSON.parse(cached);
    const now = Date.now();

    if (now > rateLimitData.resetTime) {
      localStorage.removeItem(RATE_LIMIT_CACHE_KEY);
      return { canMakeRequest: true };
    }

    return {
      canMakeRequest: rateLimitData.remaining > 0,
      remaining: rateLimitData.remaining,
      resetTime: rateLimitData.resetTime,
    };
  }

  /**
   * Mise à jour des informations de rate limiting
   */
  updateRateLimit(headers) {
    const remaining = parseInt(headers.get('x-ratelimit-remaining') || '60');
    const resetTimestamp = parseInt(headers.get('x-ratelimit-reset') || '0');

    localStorage.setItem(
      RATE_LIMIT_CACHE_KEY,
      JSON.stringify({
        remaining: remaining,
        resetTime: resetTimestamp * 1000,
      })
    );
  }

  /**
   * Cache intelligent des releases
   */
  getCachedRelease(username, repo) {
    const cacheKey = `${RELEASE_CACHE_PREFIX}${username}/${repo}`;
    const cached = this.cache.get(cacheKey);

    if (!cached) return null;

    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cached.data;
  }

  setCachedRelease(username, repo, data) {
    const cacheKey = `${RELEASE_CACHE_PREFIX}${username}/${repo}`;
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Récupération de la dernière release
   */
  async getLatestRelease(username, repo) {
    try {
      // Vérifier le cache d'abord
      const cached = this.getCachedRelease(username, repo);
      if (cached) {
        console.log('[GitHub] Using cached release:', cached.tag_name);
        return { success: true, data: cached };
      }

      // Vérifier le rate limiting
      const rateCheck = this.checkRateLimit();
      if (!rateCheck.canMakeRequest) {
        console.warn('[GitHub] Rate limit exceeded');
        return {
          success: false,
          error: 'rate_limit_exceeded',
          message: 'GitHub rate limit exceeded',
          resetTime: rateCheck.resetTime,
        };
      }

      console.log('[GitHub] Fetching latest release for', `${username}/${repo}`);

      // Appel API GitHub
      const response = await fetch(`${GITHUB_API_BASE}/repos/${username}/${repo}/releases/latest`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Client/1.0',
        },
        signal: AbortSignal.timeout(8000), // Timeout 8s
      });

      // Mettre à jour le rate limit
      this.updateRateLimit(response.headers);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');

        console.error('[GitHub] API error:', response.status, errorText);

        return {
          success: false,
          error: 'api_error',
          status: response.status,
          message: this.getErrorMessage(response.status),
          details: errorText,
        };
      }

      const release = await response.json();

      // Mise en cache
      this.setCachedRelease(username, repo, release);

      console.log('[GitHub] Release fetched:', release.tag_name);

      return { success: true, data: release };
    } catch (error) {
      console.error('[GitHub] Request failed:', error);

      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'timeout',
          message: 'GitHub API timeout',
        };
      }

      return {
        success: false,
        error: 'network_error',
        message: error.message,
      };
    }
  }

  /**
   * Construction de l'URL de téléchargement
   */
  buildDownloadUrl(username, repo, releaseTag, filename) {
    return `https://github.com/${username}/${repo}/releases/download/${releaseTag}/${filename}`;
  }

  /**
   * Messages d'erreur user-friendly
   */
  getErrorMessage(status) {
    switch (status) {
      case 404:
        return 'Repository ou release introuvable';
      case 403:
        return 'Rate limit GitHub atteint';
      case 422:
        return 'Repository invalide';
      case 500:
      case 502:
      case 503:
        return 'GitHub temporairement indisponible';
      default:
        return 'Erreur GitHub API';
    }
  }

  /**
   * Vérification qu'un asset existe dans la release
   */
  findAssetInRelease(release, filename) {
    if (!release.assets || !Array.isArray(release.assets)) {
      return null;
    }

    return release.assets.find((asset) => asset.name === filename);
  }

  /**
   * API principale pour obtenir l'URL de téléchargement
   */
  async getDownloadUrl(username, repo, filename) {
    const releaseResult = await this.getLatestRelease(username, repo);

    if (!releaseResult.success) {
      return {
        success: false,
        error: releaseResult.error,
        message: releaseResult.message,
        resetTime: releaseResult.resetTime,
      };
    }

    const release = releaseResult.data;
    const asset = this.findAssetInRelease(release, filename);

    if (!asset) {
      return {
        success: false,
        error: 'asset_not_found',
        message: `Fichier "${filename}" introuvable dans la release ${release.tag_name}`,
        availableAssets: release.assets.map((a) => a.name),
      };
    }

    const downloadUrl = this.buildDownloadUrl(username, repo, release.tag_name, filename);

    return {
      success: true,
      downloadUrl,
      release: {
        tag: release.tag_name,
        name: release.name,
        publishedAt: release.published_at,
        htmlUrl: release.html_url,
      },
      asset: {
        name: asset.name,
        size: asset.size,
        downloadCount: asset.download_count,
      },
    };
  }
}

// Export singleton
export const githubService = new GitHubService();
export default githubService;
