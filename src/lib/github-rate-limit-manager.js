/**
 * Gestionnaire intelligent du rate limiting GitHub
 */
export class RateLimitManager {
  static STORAGE_KEY = 'github_rate_limit_info';
  static DEFAULT_LIMIT = 60; // GitHub anonymous rate limit

  static getRemainingRequests() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return this.DEFAULT_LIMIT;

    const data = JSON.parse(stored);
    if (Date.now() > data.resetTime) {
      localStorage.removeItem(this.STORAGE_KEY);
      return this.DEFAULT_LIMIT;
    }

    return Math.max(0, data.remaining);
  }

  static canMakeRequest() {
    return this.getRemainingRequests() > 5; // Garder une marge
  }

  static getResetTime() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    return new Date(data.resetTime);
  }

  static updateFromHeaders(headers) {
    const remaining = parseInt(headers.get('x-ratelimit-remaining') || this.DEFAULT_LIMIT);
    const resetTimestamp = parseInt(headers.get('x-ratelimit-reset') || 0);

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        remaining,
        resetTime: resetTimestamp * 1000,
        updatedAt: Date.now(),
      })
    );
  }
}
