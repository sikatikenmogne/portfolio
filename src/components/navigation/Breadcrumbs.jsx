// src/components/navigation/Breadcrumbs.js
'use client';

import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from './hooks/useNavigation';
import { BreadcrumbLink } from './NavigationLink';

/**
 * 🍞 Composant Breadcrumbs (Fil d'Ariane)
 *
 * Affiche le chemin de navigation contextuuel sous forme de fil d'Ariane.
 * Génère automatiquement les breadcrumbs selon l'URL actuelle.
 *
 * 🎯 Objectifs pédagogiques :
 * - Comprendre la navigation contextuelle UX
 * - Apprendre la génération dynamique de contenu
 * - Maîtriser les listes React avec keys
 * - Découvrir les bonnes pratiques d'accessibilité
 *
 * 📚 Props :
 * @param {string} className - Classes CSS personnalisées
 * @param {React.ReactNode} homeIcon - Icône pour l'accueil (optionnel)
 * @param {React.ReactNode} separator - Séparateur entre les éléments (optionnel)
 * @param {boolean} showOnHomePage - Afficher sur la page d'accueil (défaut: false)
 * @param {number} maxItems - Nombre maximum d'éléments affichés (défaut: 5)
 */
const Breadcrumbs = ({
  className = '',
  homeIcon = <Home className="w-4 h-4" />,
  separator = <ChevronRight className="w-4 h-4" />,
  showOnHomePage = false,
  maxItems = 5,
}) => {
  // 🎣 Utilisation de notre hook personnalisé
  const { generateBreadcrumbs, pathname } = useNavigation();

  // 🍞 Génération des breadcrumbs
  const breadcrumbs = generateBreadcrumbs();

  // 🏠 Masquer sur la page d'accueil si configuré ainsi
  if (!showOnHomePage && pathname === '/') {
    return null;
  }

  // 📏 Troncature si trop d'éléments
  let displayedBreadcrumbs = breadcrumbs;
  let hasEllipsis = false;

  if (breadcrumbs.length > maxItems) {
    hasEllipsis = true;
    // Garder le premier, le dernier, et quelques éléments du milieu
    displayedBreadcrumbs = [
      breadcrumbs[0], // Toujours garder l'accueil
      ...breadcrumbs.slice(-(maxItems - 2)), // Garder les derniers éléments
    ];
  }

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={cn(
        // 🎨 Style de base
        'flex items-center space-x-1 text-sm text-muted-foreground',
        // 📱 Responsive : masquer sur très petits écrans si nécessaire
        'hidden sm:flex',
        className
      )}
    >
      {/* 📋 Liste des breadcrumbs */}
      <ol className="flex items-center space-x-1" role="list">
        {displayedBreadcrumbs.map((crumb, index) => {
          const isLast = index === displayedBreadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={crumb.href} className="flex items-center space-x-1">
              {/* 🔗 Lien breadcrumb */}
              <BreadcrumbLink
                href={crumb.href}
                isLast={isLast}
                className={cn(
                  // 🎯 Style spécial pour l'accueil avec icône
                  isFirst && 'flex items-center space-x-1'
                )}
              >
                {/* 🏠 Icône d'accueil pour le premier élément */}
                {isFirst && (
                  <>
                    {homeIcon}
                    <span className="sr-only">Accueil</span>
                  </>
                )}
                {/* 📝 Texte du breadcrumb */}
                <span className={isFirst ? 'hidden sm:inline' : ''}>{crumb.label}</span>
              </BreadcrumbLink>

              {/* ➡️ Séparateur (pas pour le dernier élément) */}
              {!isLast && (
                <span className="text-muted-foreground/60" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}

        {/* 🔄 Ellipsis si breadcrumbs tronqués */}
        {hasEllipsis && (
          <li className="flex items-center space-x-1">
            <span className="text-muted-foreground/60" aria-hidden="true">
              ...
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
};

/**
 * 🎨 Variante compacte pour les espaces réduits
 */
export const CompactBreadcrumbs = ({ className = '', ...props }) => {
  const { generateBreadcrumbs, pathname } = useNavigation();
  const breadcrumbs = generateBreadcrumbs();

  if (pathname === '/') return null;

  // 📱 Version ultra-compacte : juste "Retour" vers la page parent
  const parentBreadcrumb =
    breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : breadcrumbs[0];

  return (
    <nav aria-label="Navigation rapide" className={cn('flex items-center', className)}>
      <BreadcrumbLink
        href={parentBreadcrumb.href}
        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span>Retour à {parentBreadcrumb.label}</span>
      </BreadcrumbLink>
    </nav>
  );
};

/**
 * 🔧 Breadcrumbs avec données personnalisées
 *
 * Permet de bypasser la génération automatique pour des cas spéciaux
 * (ex: pages avec des titres dynamiques venant d'une API)
 */
export const CustomBreadcrumbs = ({ items = [], className = '', ...props }) => {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Fil d'Ariane personnalisé"
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
    >
      <ol className="flex items-center space-x-1" role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href || index} className="flex items-center space-x-1">
              <BreadcrumbLink href={item.href} isLast={isLast}>
                {item.label}
              </BreadcrumbLink>

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-muted-foreground/60" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

/**
 * 📋 EXEMPLE D'UTILISATION :
 *
 * // Usage basique (génération automatique)
 * <Breadcrumbs />
 *
 * // Avec personnalisation
 * <Breadcrumbs
 *   homeIcon={<House className="w-4 h-4" />}
 *   separator="/"
 *   maxItems={3}
 * />
 *
 * // Version compacte
 * <CompactBreadcrumbs />
 *
 * // Avec données personnalisées
 * <CustomBreadcrumbs
 *   items={[
 *     { label: 'Accueil', href: '/' },
 *     { label: 'Mon Projet Spécial', href: '/projects/special' },
 *     { label: 'Page Actuelle', href: '/projects/special/details' }
 *   ]}
 * />
 *
 * 💡 BONNES PRATIQUES UX :
 *
 * 1. 🍞 Positionnement :
 *    - Placer sous le header principal
 *    - Avant le titre de page
 *    - Visible mais discret
 *
 * 2. 📱 Responsive :
 *    - Masquer sur très petits écrans si nécessaire
 *    - Utiliser la version compacte sur mobile
 *    - Priorité au contenu principal
 *
 * 3. ♿ Accessibilité :
 *    - Landmark nav avec aria-label
 *    - Liste sémantique (ol + li)
 *    - Différenciation visuelle du dernier élément
 *
 * 📚 RESSOURCES UX/UI :
 *
 * 🔗 Breadcrumbs UX Guidelines :
 * https://www.nngroup.com/articles/breadcrumbs/
 *
 * 🔗 ARIA Breadcrumbs Pattern :
 * https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
