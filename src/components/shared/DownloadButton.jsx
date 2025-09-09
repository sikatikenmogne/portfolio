// src/components/shared/DownloadButton.jsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { useGitHubDownload } from '@/hooks/useGitHubDownload';

/**
 * ==============================================
 * CONCEPTS REACT POUR DÉBUTANTS
 * ==============================================
 *
 * 1. useState : Gérer l'état local du composant
 * 2. useEffect : Exécuter du code après le rendu
 * 3. useCallback : Optimiser les fonctions (éviter les re-créations)
 * 4. usePathname : Hook Next.js pour récupérer l'URL actuelle
 * 5. Conditional rendering : Affichage conditionnel avec &&
 * 6. Template literals : Chaînes de caractères dynamiques avec ``
 */

/**
 * Configuration des traductions
 *
 * CONCEPT : Objet JavaScript pour gérer l'internationalisation
 * Chaque langue a ses propres messages
 */
const TRANSLATIONS = {
  fr: {
    download: 'Télécharger CV',
    downloading: 'Téléchargement...',
    success: 'Téléchargé',
    error: 'Erreur',
    fallback: 'Version locale',
    connecting: 'Connexion...',
    retry: 'Réessayer',
  },
  en: {
    download: 'Download CV',
    downloading: 'Downloading...',
    success: 'Downloaded',
    error: 'Error',
    fallback: 'Local version',
    connecting: 'Connecting...',
    retry: 'Retry',
  },
};

/**
 * Fonction utilitaire pour détecter la langue
 *
 * CONCEPT : Pure function qui prend un pathname et retourne une langue
 * Une pure function ne dépend que de ses paramètres d'entrée
 */
const getLanguageFromPath = (pathname) => {
  // Si l'URL commence par /en, on utilise l'anglais
  return pathname.startsWith('/en') ? 'en' : 'fr';
};

/**
 * Composant DownloadButton principal
 *
 * CONCEPT : Functional Component avec props destructurées
 * Les props sont les données passées au composant depuis son parent
 */
export function DownloadButton({
  // Configuration GitHub
  githubUser,
  githubRepo,
  githubFilename,

  // Configuration fallback (solution de secours)
  fallbackPath,
  fallbackFilename,

  // Apparence du bouton
  className,
  size = 'lg',
  variant = 'default',
  children,

  // Options d'affichage
  autoResetDelay = 5000, // Temps avant retour à l'état initial (3 secondes)
}) {
  // ==========================================
  // HOOKS - Les "super-pouvoirs" de React
  // ==========================================

  /**
   * Hook personnalisé pour GitHub (supposé existant)
   * CONCEPT : Custom Hook - Logique réutilisable
   */
  const { downloadFromGitHub, status, error, isLoading } = useGitHubDownload();

  /**
   * Hook Next.js pour récupérer l'URL actuelle
   * CONCEPT : Next.js Hook pour la navigation
   */
  const pathname = usePathname();

  /**
   * État local pour gérer les transitions du bouton
   * CONCEPT : useState pour l'état local du composant
   */
  const [buttonState, setButtonState] = useState('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  // ==========================================
  // LOGIQUE MÉTIER
  // ==========================================

  /**
   * Récupération de la langue basée sur l'URL
   * CONCEPT : Dérivation d'état - calculer une valeur à partir d'autres valeurs
   */
  const currentLanguage = getLanguageFromPath(pathname);
  const t = TRANSLATIONS[currentLanguage]; // 't' est une convention pour 'translate'

  /**
   * Fonction de téléchargement avec gestion d'état
   * CONCEPT : useCallback évite de recréer la fonction à chaque rendu
   *
   * Pourquoi useCallback ?
   * - Performance : évite les re-rendus inutiles
   * - Dépendances contrôlées : la fonction ne change que si ses dépendances changent
   */
  const handleDownload = useCallback(async () => {
    try {
      // Étape 1 : Changer l'état en "chargement"
      setButtonState('loading');
      setShowSuccess(false);

      // Étape 2 : Vérifier la configuration GitHub
      if (!githubUser || !githubRepo || !githubFilename) {
        console.warn('[Download] Configuration GitHub incomplète, utilisation du fallback');

        // Téléchargement fallback (solution de secours)
        if (fallbackPath) {
          // CONCEPT : Manipulation du DOM avec JavaScript vanilla
          // Créer un lien temporaire pour déclencher le téléchargement
          const link = document.createElement('a');
          link.href = fallbackPath;
          link.download = fallbackFilename || 'download.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Succès du fallback
          setButtonState('fallback');
          setShowSuccess(true);
        }
        return;
      }

      // Étape 3 : Téléchargement depuis GitHub
      await downloadFromGitHub(
        githubUser,
        githubRepo,
        githubFilename,
        fallbackPath ? { path: fallbackPath, filename: fallbackFilename } : null
      );

      // Étape 4 : Succès
      setButtonState('success');
      setShowSuccess(true);
    } catch (err) {
      // Étape 5 : Gestion d'erreur
      console.error('[Download] Erreur:', err);
      setButtonState('error');
    }
  }, [githubUser, githubRepo, githubFilename, fallbackPath, fallbackFilename, downloadFromGitHub]);

  /**
   * Effet pour le retour automatique à l'état initial
   * CONCEPT : useEffect pour les effets de bord
   *
   * Un effet de bord = une action qui n'affecte pas directement le rendu
   * Ici : programmer un timer pour réinitialiser le bouton
   */
  useEffect(() => {
    let timeoutId;

    // Si on est dans un état de succès ou d'erreur, programmer le reset
    if (buttonState === 'success' || buttonState === 'error' || buttonState === 'fallback') {
      timeoutId = setTimeout(() => {
        setButtonState('idle');
        setShowSuccess(false);
      }, autoResetDelay);
    }

    // CONCEPT : Cleanup function
    // Cette fonction s'exécute quand le composant se démonte ou avant le prochain effet
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [buttonState, autoResetDelay]);

  // ==========================================
  // FONCTIONS DE RENDU
  // ==========================================

  /**
   * Fonction pour déterminer le contenu du bouton
   * CONCEPT : Switch statement pour la logique conditionnelle
   * Alternative au if/else pour plusieurs conditions
   */
  const getButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            {t.connecting}
          </>
        );

      case 'success':
        return (
          <>
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            {t.success}
          </>
        );

      case 'fallback':
        return (
          <>
            <CheckCircle className="mr-2 h-4 w-4 text-orange-500" />
            {t.fallback}
          </>
        );

      case 'error':
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            {t.error}
          </>
        );

      default:
        return (
          <>
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {children || t.download}
          </>
        );
    }
  };

  /**
   * Fonction pour déterminer la variante du bouton
   * CONCEPT : Logique de style basée sur l'état
   */
  const getButtonVariant = () => {
    switch (buttonState) {
      case 'success':
      case 'fallback':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return variant;
    }
  };

  /**
   * Déterminer si le bouton doit être désactivé
   * CONCEPT : Boolean logic
   */
  const isDisabled = buttonState === 'loading' || isLoading;

  // ==========================================
  // RENDU DU COMPOSANT
  // ==========================================

  /**
   * CONCEPT : JSX - syntaxe qui ressemble à HTML mais qui est du JavaScript
   * - className au lieu de class (class est un mot réservé en JS)
   * - Événements avec camelCase : onClick au lieu de onclick
   * - Expressions JavaScript entre accolades : {variable}
   * - Fragments <> </> pour retourner plusieurs éléments
   */
  return (
    <div className="inline-flex flex-col gap-2">
      <Button
        size={size}
        variant={getButtonVariant()}
        onClick={handleDownload}
        disabled={isDisabled}
        className={`group transition-all duration-200 ${className || ''}`}
      >
        {getButtonContent()}
      </Button>

      {/* 
        CONCEPT : Conditional Rendering avec &&
        Si showSuccess est true, alors afficher le div
        Si showSuccess est false, rien ne s'affiche
      */}
      {showSuccess && buttonState === 'success' && (
        <div className="text-xs text-green-600 text-center font-medium animate-fade-in">
          ✓ {currentLanguage === 'fr' ? 'Téléchargement réussi' : 'Download successful'}
        </div>
      )}

      {/* Message d'erreur - seulement en mode développement */}
      {process.env.NODE_ENV === 'development' && buttonState === 'error' && error && (
        <div className="text-xs text-red-600 text-center">{error.message || 'Erreur inconnue'}</div>
      )}
    </div>
  );
}

/**
 * ==============================================
 * COMPOSANT SIMPLE POUR DÉBUTANTS
 * ==============================================
 *
 * Version simplifiée sans GitHub, juste pour le téléchargement local
 * Parfait pour comprendre les concepts de base
 */
export function SimpleDownloadButton({
  filePath,
  filename = 'document.pdf',
  children = 'Télécharger',
  className,
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const pathname = usePathname();
  const currentLanguage = getLanguageFromPath(pathname);
  const t = TRANSLATIONS[currentLanguage];

  const handleSimpleDownload = async () => {
    try {
      setIsDownloading(true);

      // Simuler un petit délai pour l'UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Créer le lien de téléchargement
      const link = document.createElement('a');
      link.href = filePath;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Afficher le succès
      setIsDownloading(false);
      setShowSuccess(true);

      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleSimpleDownload}
      disabled={isDownloading}
      className={`group ${className || ''}`}
    >
      {isDownloading ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          {t.downloading}
        </>
      ) : showSuccess ? (
        <>
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          {t.success}
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {children}
        </>
      )}
    </Button>
  );
}

// Export par défaut
export default DownloadButton;

/**
 * ==============================================
 * RESSOURCES COMPLÉMENTAIRES POUR DÉBUTANTS
 * ==============================================
 *
 * 1. React Hooks :
 *    https://react.dev/reference/react/hooks
 *
 * 2. Next.js usePathname :
 *    https://nextjs.org/docs/app/api-reference/functions/use-pathname
 *
 * 3. Tailwind CSS Classes :
 *    https://tailwindcss.com/docs/utility-first
 *
 * 4. JavaScript Async/Await :
 *    https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * 5. Array Methods (filter, map) :
 *    https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
 *
 * 6. Template Literals :
 *    https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals
 */
