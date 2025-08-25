import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes
 *
 * This is the core utility used by all Shadcn components
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format functions for display
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDuration(months) {
  if (months < 12) {
    return `${months} mois`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} an${years > 1 ? 's' : ''}`;
  }

  return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
}

/**
 * Analytics helpers for tracking
 */
export function trackEvent(eventName, properties = {}) {
  // Future implementation for analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }

  console.log('Analytics Event:', eventName, properties);
}

/**
 * SEO and meta helpers
 */
export function generateMetaTitle(title, siteName = 'Portfolio Développeur') {
  return title ? `${title} | ${siteName}` : siteName;
}

export function generateMetaDescription(description, maxLength = 160) {
  if (!description) return '';

  return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
}
