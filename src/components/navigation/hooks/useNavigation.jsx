// src/components/navigation/hooks/useNavigation.js
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook personnalisé pour gérer l'état de navigation
 *
 * 🎯 Objectifs pédagogiques :
 * - Comprendre les hooks personnalisés React
 * - Apprendre usePathname de Next.js
 * - Gérer l'état responsive
 *
 * 📚 Concepts utilisés :
 * - useState pour l'état local
 * - useEffect pour les effets de bord
 * - usePathname pour l'URL actuelle
 */
export const useNavigation = () => {
  // 📱 Gestion de l'état mobile - Détecte si on est sur mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 📍 Récupération de l'URL actuelle avec Next.js
  const pathname = usePathname();

  // 📱 Détection de la taille d'écran (responsive)
  useEffect(() => {
    // Fonction pour vérifier la taille de l'écran
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px = breakpoint 'md:' de Tailwind
    };

    // Vérification initiale
    checkScreenSize();

    // Ajout d'un listener pour les changements de taille
    window.addEventListener('resize', checkScreenSize);

    // 🧹 Nettoyage : suppression du listener au démontage du composant
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 📱 Fermeture automatique du menu mobile quand on passe en desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  /**
   * 🔗 Configuration des liens de navigation
   *
   * 💡 Astuce pédagogique :
   * Cette configuration pourrait venir d'un fichier séparé
   * ou même d'un CMS dans un vrai projet
   */
  const navigationLinks = [
    {
      label: 'Accueil',
      href: '/',
      description: "Page d'accueil du portfolio",
    },
    {
      label: 'Projets',
      href: '/projects',
      description: 'Mes réalisations et projets',
    },
    {
      label: 'À propos',
      href: '/about',
      description: 'En savoir plus sur moi',
    },
    {
      label: 'Blog',
      href: '/blog',
      description: 'Articles et tutoriels',
    },
    {
      label: 'Contact',
      href: '/contact',
      description: 'Me contacter',
    },
  ];

  /**
   * 🎯 Fonction pour déterminer si un lien est actif
   *
   * @param {string} href - L'URL du lien à tester
   * @returns {boolean} - true si le lien correspond à la page actuelle
   *
   * 💡 Logique :
   * - Exact match pour la page d'accueil (/)
   * - Partial match pour les autres pages (/projects match /projects/mon-projet)
   */
  const isActiveLink = (href) => {
    if (href === '/') {
      // Page d'accueil : match exact seulement
      return pathname === '/';
    }
    // Autres pages : commence par le href
    return pathname.startsWith(href);
  };

  /**
   * 🍔 Gestion du menu hamburger mobile
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * 🧩 Génération des breadcrumbs à partir de l'URL
   *
   * @returns {Array} - Array d'objets {label, href} pour les breadcrumbs
   *
   * 📖 Exemple :
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

  // 📤 Retour des données et fonctions utiles
  return {
    // État
    isMobile,
    isMobileMenuOpen,
    pathname,

    // Configuration
    navigationLinks,

    // Fonctions utilitaires
    isActiveLink,
    toggleMobileMenu,
    closeMobileMenu,
    generateBreadcrumbs,
  };
};

/**
 * 📚 RESSOURCES COMPLÉMENTAIRES POUR APPROFONDIR :
 *
 * 🔗 Hooks personnalisés React :
 * https://fr.react.dev/learn/reusing-logic-with-custom-hooks
 *
 * 🔗 usePathname Next.js :
 * https://nextjs.org/docs/app/api-reference/functions/use-pathname
 *
 * 🔗 Responsive Design Tailwind :
 * https://tailwindcss.com/docs/responsive-design
 *
 * 📖 Points clés à retenir :
 * 1. Les hooks personnalisés permettent de réutiliser la logique
 * 2. usePathname donne l'URL actuelle (côté client uniquement)
 * 3. L'état responsive doit être géré côté client
 * 4. Toujours nettoyer les event listeners avec useEffect
 */
