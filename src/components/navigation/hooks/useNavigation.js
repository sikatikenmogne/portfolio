'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useNavigation = (navLinks = []) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Détection de la langue courante
  const lang = pathname.startsWith('/en') ? 'en' : 'fr';
  // Liens selon la langue
  const navigationLinks = navLinks;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const isActiveLink = (href) => {
    // Pour la racine, match exact
    if (href === '/' || href === '/en/') return pathname === href;
    // Pour les autres, commence par le href
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Changement de langue global
  const switchLang = () => {
    if (lang === 'en') {
      router.push(pathname.replace(/^\/en/, '') || '/');
    } else {
      router.push('/en' + (pathname === '/' ? '' : pathname));
    }
    setIsMobileMenuOpen(false);
  };

  /**
   * Génération des breadcrumbs à partir de l'URL
   *
   * @returns {Array} - Array d'objets {label, href} pour les breadcrumbs
   *
   * Exemple :
   * /projects/mon-super-projet → [
   *   {label: 'Accueil', href: '/'},
   *   {label: 'Projets', href: '/projects'},
   *   {label: 'Mon Super Projet', href: '/projects/mon-super-projet'}
   * ]
   */
  const generateBreadcrumbs = () => {
    // Toujours commencer par l'accueil
    const breadcrumbs = [{ label: 'Accueil', href: '/' }];

    // Si on n'est pas à la racine
    if (pathname !== '/') {
      // Découper l'URL en segments (/projects/mon-projet → ['projects', 'mon-projet'])
      const pathSegments = pathname.split('/').filter((segment) => segment);

      // Construire les breadcrumbs progressivement
      pathSegments.forEach((segment, index) => {
        // Construire l'URL cumulative
        const href = '/' + pathSegments.slice(0, index + 1).join('/');

        // Trouver le lien correspondant dans notre navigation
        const matchingLink = navigationLinks.find((link) => link.href === href);

        // Utiliser le label configuré ou formater le segment d'URL
        const label = matchingLink
          ? matchingLink.label
          : segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');

        breadcrumbs.push({ label, href });
      });
    }

    return breadcrumbs;
  };

  return {
    lang,
    navigationLinks,
    isMobile,
    isMobileMenuOpen,
    pathname,
    isActiveLink,
    toggleMobileMenu,
    closeMobileMenu,
    switchLang,
    generateBreadcrumbs,
  };
};
