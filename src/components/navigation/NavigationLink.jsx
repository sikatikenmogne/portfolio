// src/components/navigation/NavigationLink.js

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useNavigation } from './hooks/useNavigation';

/**
 * 🔗 Composant NavigationLink
 *
 * Ce composant encapsule un lien Next.js avec la gestion automatique
 * de l'état "actif" selon l'URL actuelle
 *
 * 🎯 Objectifs pédagogiques :
 * - Comprendre le composant Link de Next.js
 * - Apprendre la composition de composants React
 * - Découvrir l'utility function cn() de Shadcn
 * - Maîtriser le conditional styling avec Tailwind
 *
 * 📚 Props :
 * @param {string} href - URL de destination
 * @param {string} children - Contenu du lien (texte)
 * @param {string} className - Classes CSS personnalisées (optionnel)
 * @param {boolean} showActiveIndicator - Afficher l'indicateur visuel d'état actif
 * @param {function} onClick - Fonction appelée au clic (optionnel)
 */
const NavigationLink = ({
  href,
  children,
  className = '',
  showActiveIndicator = true,
  onClick,
  ...props
}) => {
  // 🎣 Utilisation de notre hook personnalisé
  const { isActiveLink } = useNavigation();

  // 📍 Détermine si ce lien est actif
  const isActive = isActiveLink(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        // 🎨 Classes de base (toujours appliquées)
        'relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md',

        // 🌊 Classes conditionnelles selon l'état actif
        // Utilisation du thème "ocean" défini dans globals.css
        isActive
          ? [
              // État actif : couleur primary (bleu océan)
              'text-primary bg-primary/10',
              'hover:bg-primary/20',
              // Focus visible pour l'accessibilité (ADR exigence accessibilité)
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            ]
          : [
              // État inactif : couleur muted
              'text-muted-foreground hover:text-foreground',
              'hover:bg-primary/80',
              'hover:text-white',
              // Focus visible pour l'accessibilité
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            ],

        // 📱 Classes responsive (mobile first - Tailwind convention)
        'md:px-4 md:py-2',

        // 🎨 Classes personnalisées passées en props
        className
      )}
      {...props}
    >
      {children}

      {/* 🔸 Indicateur visuel d'état actif (optionnel) */}
      {showActiveIndicator && isActive && (
        <span
          className={cn(
            // Petit indicateur sous le lien actif
            'absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 transform',
            'bg-primary rounded-full',
            // Animation d'apparition
            'animate-in slide-in-from-bottom-1 duration-200'
          )}
          aria-hidden="true" // Masqué pour les lecteurs d'écran (décoratif)
        />
      )}
    </Link>
  );
};

/**
 * 🔗 Variante pour liens de navigation mobile
 *
 * Design adapté aux écrans tactiles avec des zones de clic plus grandes
 */
export const MobileNavigationLink = ({ href, children, onClick, className = '', ...props }) => {
  const { isActiveLink, closeMobileMenu } = useNavigation();
  const isActive = isActiveLink(href);

  // 📱 Gestion du clic mobile : fermer le menu après navigation
  const handleClick = (e) => {
    if (onClick) onClick(e);
    closeMobileMenu(); // Ferme automatiquement le menu mobile
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        // 📱 Design optimisé mobile : zones de clic plus grandes
        'block w-full px-4 py-3 text-base font-medium transition-colors duration-200',

        // 🌊 États actif/inactif avec thème océan
        isActive
          ? 'text-primary bg-primary/10 border-l-4 border-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',

        // 🎯 Accessibilité tactile améliorée
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset',
        'active:bg-secondary/80', // Feedback tactile au tap

        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {/* 🔸 Indicateur d'état actif pour mobile */}
        {isActive && <span className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />}
      </div>
    </Link>
  );
};

/**
 * 🍞 Variante pour liens de breadcrumbs
 *
 * Design minimaliste adapté au fil d'Ariane
 */
export const BreadcrumbLink = ({ href, children, isLast = false, className = '', ...props }) => {
  return (
    <Link
      href={href}
      className={cn(
        // 🍞 Style breadcrumb : discret mais cliquable
        'text-sm transition-colors duration-200',

        // 🎨 Différentiation visuelle du dernier élément (page actuelle)
        isLast
          ? 'text-foreground font-medium cursor-default pointer-events-none'
          : 'text-muted-foreground hover:text-foreground',

        // 🎯 Accessibilité
        !isLast && 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm',

        className
      )}
      // Désactiver la navigation si c'est le dernier élément
      {...(isLast ? {} : props)}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;

/**
 * 💡 ASTUCES PÉDAGOGIQUES IMPORTANTES :
 *
 * 1. 🔧 cn() utility function :
 *    - Vient de Shadcn UI (lib/utils.js)
 *    - Combine clsx + tailwind-merge
 *    - Permet de merger intelligemment les classes Tailwind
 *
 * 2. 🎨 Conditional styling :
 *    - Utilise les classes Tailwind conditionnelles
 *    - Préfère les arrays pour la lisibilité
 *    - Sépare les états actif/inactif
 *
 * 3. ♿ Accessibilité :
 *    - focus:ring pour la navigation clavier
 *    - aria-hidden pour les éléments décoratifs
 *    - Zones de clic suffisamment grandes sur mobile
 *
 * 4. 📱 Responsive design :
 *    - Mobile-first avec breakpoints Tailwind
 *    - Adaptations spécifiques pour le tactile
 *    - Fermeture automatique du menu mobile
 *
 * 📚 RESSOURCES POUR APPROFONDIR :
 *
 * 🔗 Next.js Link component :
 * https://nextjs.org/docs/app/api-reference/components/link
 *
 * 🔗 Tailwind conditional styles :
 * https://tailwindcss.com/docs/hover-focus-and-other-states
 *
 * 🔗 Accessibilité web (WCAG) :
 * https://www.w3.org/WAI/WCAG21/quickref/
 */
