// src/lib/social-links.js
import socialLinksRawData from '../data/social-links.json';

/**
 * Récupère les liens sociaux à partir du fichier JSON
 * avec validation et traitement des erreurs
 */
export function getSocialLinks() {
  if (!socialLinksRawData || !Array.isArray(socialLinksRawData.socialLinks)) {
    console.error('Format des liens sociaux invalide:', socialLinksRawData);
    return [];
  }

  return socialLinksRawData.socialLinks || [];
}

/**
 * Filtre les liens sociaux par type (professionnel ou personnel)
 */
export function filterSocialLinks(links, isProfessional = true) {
  if (!Array.isArray(links)) return [];
  return links.filter((link) => link.isProfessional === isProfessional);
}

/**
 * Trie les liens sociaux par priorité
 */
export function sortSocialLinks(links) {
  if (!Array.isArray(links)) return [];
  return [...links].sort((a, b) => (a.priority || Infinity) - (b.priority || Infinity));
}
