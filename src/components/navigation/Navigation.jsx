// src/components/navigation/Navigation.js

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useNavigation } from './hooks/useNavigation';
import NavigationLink from './NavigationLink';
import MobileNavigation from './MobileNavigation';
import { Button } from '@/components/ui/button';
import { SunIcon } from 'lucide-react';
/**
 * 🧭 Composant Navigation Principal
 *
 * Composant central qui combine navigation desktop et mobile
 * dans une interface responsive et accessible
 *
 * 🎯 Objectifs pédagogiques :
 * - Comprendre l'approche mobile-first
 * - Apprendre la composition de composants React
 * - Maîtriser les layouts Flexbox avec Tailwind
 * - Découvrir les bonnes pratiques d'architecture composants
 *
 * 📱 Fonctionnalités :
 * - Navigation desktop horizontale (masquée sur mobile)
 * - Menu mobile hamburger (masqué sur desktop)
 * - Logo/Brand cliquable
 * - Bouton CTA (Call To Action) optionnel
 * - Indicateurs d'état actif
 * - Support complet accessibilité
 */
const Navigation = ({
  className = '',
  showLogo = true,
  showCTA = true,
  logoHref = '/',
  logoText = 'Samuel',
  ctaText = 'Me contacter',
  ctaHref = '/contact',
}) => {
  // 🎣 Utilisation de notre hook personnalisé
  const { navigationLinks, pathname } = useNavigation();

  return (
    <nav
      className={cn(
        // 🎨 Layout principal : flexbox responsive
        'flex items-center justify-between w-full',
        // 📱 Padding adaptatif
        'px-4 py-3 md:px-6 md:py-4',
        className
      )}
      aria-label="Navigation principale"
    >
      {/* 🏠 Section gauche : Logo/Brand */}
      {showLogo && (
        <div className="flex items-center">
          <Link
            href={logoHref}
            className={cn(
              // 🎨 Style du logo
              'text-xl font-bold text-foreground transition-colors',
              'hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md',
              // 📱 Responsive
              'md:text-2xl'
            )}
          >
            {logoText}
          </Link>
        </div>
      )}

      {/* 🖥️ Section centre : Navigation Desktop */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
        {navigationLinks.map((link) => (
          <NavigationLink
            key={link.href}
            href={link.href}
            className={cn(
              // 🎨 Adaptations desktop
              'px-4 py-2 lg:px-5 lg:py-2.5',
              // 🎯 États interactifs améliorés
              'hover:scale-105 transition-transform duration-150'
            )}
          >
            {link.label}
          </NavigationLink>
        ))}
      </div>

      {/* 📱 Section droite : CTA + Menu Mobile */}
      <div className="flex items-center space-x-2">
        {/* 🎯 Bouton Call-to-Action (desktop seulement) */}
        {/* {showCTA && <SunIcon />} */}

        {/* 📱 Menu mobile */}
        <MobileNavigation />
      </div>
    </nav>
  );
};

/**
 * 🎨 Variante avec header/navbar complet
 * Inclut bordure, background et responsive container
 */
export const NavigationHeader = ({
  className = '',
  variant = 'default',
  sticky = false,
  ...props
}) => {
  return (
    <header
      className={cn(
        // 🎨 Style de base
        'w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        // 📌 Position sticky optionnelle
        sticky && 'sticky top-0 z-50',
        className
      )}
    >
      <div
        className={cn(
          // 📦 Container responsive
          'container mx-auto max-w-7xl',
          // 📱 Adaptations responsive
          'px-4 sm:px-6 lg:px-8'
        )}
      >
        <Navigation {...props} className="py-3" />
      </div>
    </header>
  );
};

/**
 * 🌊 Variante avec fond coloré (thème océan)
 */
export const OceanNavigationHeader = ({ className = '', ...props }) => {
  return (
    <NavigationHeader
      className={cn(
        // 🌊 Gradient océan selon notre thème
        'bg-gradient-to-r from-primary/10 via-background to-primary/5',
        'border-primary/20',
        className
      )}
      {...props}
    />
  );
};

/**
 * 📱 Variante navigation mobile-only
 * (utile pour certains layouts spéciaux)
 */
export const MobileOnlyNavigation = ({ className = '', ...props }) => {
  return (
    <nav className={cn('md:hidden', className)}>
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">
          Portfolio
        </Link>
        <MobileNavigation />
      </div>
    </nav>
  );
};

/**
 * 🖥️ Variante desktop-only pour sidebars
 */
export const DesktopSidebarNavigation = ({ className = '', ...props }) => {
  const { navigationLinks } = useNavigation();

  return (
    <nav
      className={cn('hidden md:flex flex-col space-y-2 p-4', className)}
      aria-label="Navigation latérale"
    >
      {navigationLinks.map((link) => (
        <NavigationLink
          key={link.href}
          href={link.href}
          className="w-full justify-start px-4 py-3 rounded-lg"
        >
          {link.label}
        </NavigationLink>
      ))}
    </nav>
  );
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Samuel SIKATI. Tous droits réservés.
          </p>
          {/* <div className="flex space-x-4 text-sm">
              <a
                href="/mentions-legales"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Mentions légales
              </a>
              <a
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Navigation;

/**
 * 📋 EXEMPLES D'UTILISATION COMPLÈTE :
 *
 * // 1. Usage basique dans un layout
 * // src/app/layout.js
 * import { NavigationHeader } from '@/components/navigation/Navigation';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="fr">
 *       <body>
 *         <NavigationHeader sticky={true} />
 *         <main>{children}</main>
 *       </body>
 *     </html>
 *   );
 * }
 *
 * // 2. Customisation avancée
 * <NavigationHeader
 *   logoText="Mon Portfolio"
 *   ctaText="Travaillons ensemble"
 *   ctaHref="/contact"
 *   sticky={true}
 *   className="shadow-lg"
 * />
 *
 * // 3. Variante océan
 * <OceanNavigationHeader sticky={true} />
 *
 * // 4. Dans un dashboard avec sidebar
 * <div className="flex">
 *   <DesktopSidebarNavigation className="w-64" />
 *   <main className="flex-1">
 *     <MobileOnlyNavigation />
 *     {content}
 *   </main>
 * </div>
 *
 * 🏗️ ARCHITECTURE MODULAIRE (ADR-002) :
 *
 * Cette approche respecte les principes architecturaux :
 *
 * 1. 📦 Séparation des responsabilités :
 *    - Navigation.js : Composant principal + variantes
 *    - MobileNavigation.js : Logique mobile spécialisée
 *    - NavigationLink.js : Gestion des liens actifs
 *    - useNavigation.js : Logique métier centralisée
 *
 * 2. 🔄 Réutilisabilité :
 *    - Composants configurables avec props
 *    - Variantes pour différents cas d'usage
 *    - Hooks personnalisés réutilisables
 *
 * 3. 🧪 Testabilité :
 *    - Logique isolée dans le hook
 *    - Composants purs avec props
 *    - État centralisé et prévisible
 *
 * 💡 BONNES PRATIQUES NAVIGATION :
 *
 * 1. 📍 Indicateurs d'état :
 *    - Lien actuel visuellement distinct
 *    - Breadcrumbs pour la profondeur
 *    - Loading states si navigation asynchrone
 *
 * 2. ♿ Accessibilité :
 *    - Landmarks sémantiques (nav, header)
 *    - Labels ARIA descriptifs
 *    - Navigation clavier complète
 *    - Skip links pour lecteurs d'écran
 *
 * 3. ⚡ Performance :
 *    - Prefetch des liens importants (Next.js le fait automatiquement)
 *    - Lazy loading des menus complexes
 *    - Optimisation des re-renders
 *
 * 📚 RESSOURCES COMPLÉMENTAIRES :
 *
 * 🔗 Navigation UX Best Practices :
 * https://www.nngroup.com/articles/main-navigation-menus/
 *
 * 🔗 Next.js Navigation Optimization :
 * https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
 *
 * 🔗 Responsive Navigation Patterns :
 * https://bradfrost.com/blog/web/responsive-nav-patterns/
 */
