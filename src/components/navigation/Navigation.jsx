// src/components/navigation/Navigation.js

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useNavigation } from './hooks/useNavigation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import NavigationLink from './NavigationLink';
import MobileNavigation from './MobileNavigation';
import { Button } from '@/components/ui/button';
import { SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GithubIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { SiGmail } from 'react-icons/si';
/**
 * 🧭 Composant Navigation Principal
 *
 * Composant central qui combine navigation desktop et mobile
 * dans une interface responsive et accessible
 *
 * Objectifs pédagogiques :
 * - Comprendre l'approche mobile-first
 * - Apprendre la composition de composants React
 * - Maîtriser les layouts Flexbox avec Tailwind
 * - Découvrir les bonnes pratiques d'architecture composants
 *
 * Fonctionnalités :
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
  navLinks = [],
  ...props
}) => {
  return (
    <nav
      className={cn(
        // Layout principal : flexbox responsive
        'flex items-center justify-between w-full',
        // Padding adaptatif
        'px-4 py-3 md:px-6 md:py-4',
        className
      )}
      aria-label="Navigation principale"
    >
      {/* Section gauche : Logo/Brand */}
      {showLogo && (
        <div className="flex items-center">
          <Link
            href={logoHref}
            className={cn(
              // Style du logo
              'text-xl font-bold text-foreground transition-colors',
              'hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md',
              // Responsive
              'md:text-2xl'
            )}
          >
            {logoText}
          </Link>
        </div>
      )}

      {/* Section centre : Navigation Desktop */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
        {navLinks.map((link) => (
          <NavigationLink
            key={link.href}
            href={link.href}
            className={cn(
              // Adaptations desktop
              'px-4 py-2 lg:px-5 lg:py-2.5 rounded-2xl',
              // États interactifs améliorés
              'hover:scale-105 transition-transform duration-150'
            )}
          >
            {link.label}
          </NavigationLink>
        ))}
      </div>

      {/* Section droite : CTA + Menu Mobile */}
      <div className="flex items-center space-x-2">
        {/* Bouton Call-to-Action (desktop seulement) */}
        {/* {showCTA && <SunIcon />} */}
        <ThemeToggle />
        <LanguageSwitcher />
        {/* Menu mobile */}
        <MobileNavigation navLinks={navLinks} />
      </div>
    </nav>
  );
};

/**
 * Variante avec header/navbar complet
 * Inclut bordure, background et responsive container
 */
export const NavigationHeader = ({
  className = '',
  variant = 'default',
  sticky = false,
  navLinks = [],
  ...props
}) => {
  return (
    <header
      className={cn(
        // Style de base
        'w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        // Position sticky optionnelle
        sticky && 'sticky top-0 z-50',
        className
      )}
    >
      <div
        className={cn(
          // Container responsive
          'container mx-auto max-w-7xl',
          // Adaptations responsive
          'px-4 sm:px-6 lg:px-8'
        )}
      >
        <Navigation className="py-3" {...props} navLinks={navLinks} />
      </div>
    </header>
  );
};

/**
 * Variante avec fond coloré (thème océan)
 */
export const OceanNavigationHeader = ({ className = '', ...props }) => {
  return (
    <NavigationHeader
      className={cn(
        // Gradient océan selon notre thème
        'bg-gradient-to-r from-primary/10 via-background to-primary/5',
        'border-primary/20',
        className
      )}
      {...props}
    />
  );
};

/**
 * Variante navigation mobile-only
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
 * Variante desktop-only pour sidebars
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

export function Footer({
  CopyrightAuthor = 'SIKATI KENMOGNE Samuel',
  displayText = 'Tous droits réservés.',
  portfolioGithubRepo = 'https://github.com/sikatikenmogne/portfolio',
  email = 'sikatikenmogne@gmail.com',
}) {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    // Récupère l'année de dernière mise à jour du repo GitHub (public), fallback sur l'année courante
    async function fetchRepoDate() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${portfolioGithubRepo.replace('https://github.com/', '')}`
        );
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (data.updated_at) {
          setYear(new Date(data.updated_at).getFullYear());
        }
      } catch {
        // Fallback : année courante déjà définie
      }
    }
    fetchRepoDate();
    // eslint-disable-next-line
  }, [portfolioGithubRepo]);

  return (
    <footer className="border-t border-border/50 bg-muted/20 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between w-full px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {CopyrightAuthor}. {displayText}{' '}
            <span className="sr-only">- Tous droits réservés.</span>
          </p>
          <div className="flex space-x-4 text-sm px-2">
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs"
              aria-label="Envoyer un email"
            >
              <SiGmail size={18} />
              {/* <span>Code source</span> */}
            </a>
            <a
              href={portfolioGithubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs"
              aria-label="Voir le code source sur GitHub"
            >
              <SiGithub size={18} />
              {/* <span>Code source</span> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Navigation;
