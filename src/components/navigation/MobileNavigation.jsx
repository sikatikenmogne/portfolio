// src/components/navigation/MobileNavigation.js

'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useNavigation } from './hooks/useNavigation';
import { MobileNavigationLink } from './NavigationLink';

/**
 * 📱 Composant MobileNavigation
 *
 * Menu de navigation mobile avec un design moderne utilisant
 * le composant Sheet de Shadcn UI pour une expérience utilisateur optimale
 *
 * 🎯 Objectifs pédagogiques :
 * - Comprendre les composants Shadcn UI (Sheet)
 * - Apprendre la gestion d'état pour les modals/drawers
 * - Maîtriser le responsive design mobile-first
 * - Découvrir les bonnes pratiques tactiles
 *
 * 📱 Fonctionnalités :
 * - Menu hamburger accessible
 * - Drawer/Sheet qui s'ouvre depuis la gauche
 * - Fermeture automatique après navigation
 * - Animation fluide avec Shadcn
 * - Support du clavier et des lecteurs d'écran
 */
const MobileNavigation = ({ className = '' }) => {
  // 🎣 Utilisation de notre hook personnalisé
  const { isMobile, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, navigationLinks } =
    useNavigation();

  return (
    <>
      {/* 📱 Affichage uniquement sur mobile */}
      <div className={cn('md:hidden', className)}>
        <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
          {/* 🍔 Trigger : Bouton hamburger */}
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                // 🎨 Style du bouton hamburger
                'h-10 w-10 p-2',
                // 🎯 Accessibilité et feedback tactile
                'hover:bg-secondary/80 focus:ring-2 focus:ring-ring',
                'active:scale-95 transition-transform duration-150'
              )}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
            >
              {/* 🔄 Animation d'icône entre hamburger et croix */}
              <div className="relative w-5 h-5">
                <Menu
                  className={cn(
                    'absolute inset-0 w-5 h-5 transition-all duration-200',
                    isMobileMenuOpen
                      ? 'rotate-180 opacity-0 scale-75'
                      : 'rotate-0 opacity-100 scale-100'
                  )}
                />
                <X
                  className={cn(
                    'absolute inset-0 w-5 h-5 transition-all duration-200',
                    isMobileMenuOpen
                      ? 'rotate-0 opacity-100 scale-100'
                      : 'rotate-180 opacity-0 scale-75'
                  )}
                />
              </div>
            </Button>
          </SheetTrigger>

          {/* 📋 Contenu du Sheet : Menu de navigation */}
          <SheetContent
            side="left"
            className={cn(
              // 🎨 Style du drawer
              'w-80 p-0',
              // 📱 Adaptations mobiles
              'sm:w-96'
            )}
          >
            {/* 🏷️ En-tête du menu */}
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle className="text-left text-lg font-semibold">Navigation</SheetTitle>
            </SheetHeader>

            {/* 📋 Liste des liens de navigation */}
            <nav className="flex flex-col py-4" aria-label="Navigation mobile principale">
              {navigationLinks.map((link) => (
                <MobileNavigationLink
                  key={link.href}
                  href={link.href}
                  className={cn(
                    // 🎨 Style des liens mobiles
                    'mx-4 mb-1 rounded-lg',
                    // 📱 Optimisation tactile
                    'min-h-12 flex items-center'
                  )}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{link.label}</span>
                    {/* 📝 Description optionnelle pour clarifier */}
                    {link.description && (
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {link.description}
                      </span>
                    )}
                  </div>
                </MobileNavigationLink>
              ))}
            </nav>

            {/* 🔍 Section supplémentaire : Actions rapides */}
            <div className="mt-auto p-6 border-t bg-muted/20">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Actions rapides</h3>

                {/* 📞 Bouton de contact rapide */}
                <Button
                  variant="default"
                  className="w-full justify-start"
                  onClick={closeMobileMenu}
                  asChild
                >
                  <a href="/contact">Me contacter</a>
                </Button>

                {/* 📄 Téléchargement CV */}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={closeMobileMenu}
                  asChild
                >
                  <a href="/cv.pdf" download target="_blank" rel="noopener noreferrer">
                    Télécharger mon CV
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

/**
 * 🎨 Variante avec menu en overlay (style plus moderne)
 */
export const OverlayMobileNavigation = ({ className = '' }) => {
  const { isMobileMenuOpen, toggleMobileMenu, navigationLinks } = useNavigation();

  return (
    <div className={cn('md:hidden', className)}>
      {/* 🍔 Bouton trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileMenu}
        className="h-10 w-10 p-2"
        aria-label="Menu de navigation"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* 🌫️ Overlay modal plein écran */}
      {isMobileMenuOpen && (
        <>
          {/* 🌑 Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* 📋 Menu overlay */}
          <div className="fixed inset-x-4 top-20 z-50 rounded-xl border bg-card p-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="space-y-1">
              {navigationLinks.map((link) => (
                <MobileNavigationLink
                  key={link.href}
                  href={link.href}
                  className="w-full rounded-lg px-4 py-3 text-left"
                >
                  {link.label}
                </MobileNavigationLink>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * 📱 Composant minimaliste pour très petits espaces
 */
export const CompactMobileNavigation = ({ className = '' }) => {
  const { toggleMobileMenu } = useNavigation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMobileMenu}
      className={cn('md:hidden p-2', className)}
      aria-label="Menu"
    >
      <Menu className="w-4 h-4" />
    </Button>
  );
};

export default MobileNavigation;

/**
 * 📋 EXEMPLE D'UTILISATION DANS UN HEADER :
 *
 * // src/components/layout/Header.js
 * import MobileNavigation from '@/components/navigation/MobileNavigation';
 *
 * const Header = () => {
 *   return (
 *     <header className="border-b">
 *       <div className="container mx-auto flex items-center justify-between p-4">
 *         <Logo />
 *         <DesktopNavigation className="hidden md:flex" />
 *         <MobileNavigation />
 *       </div>
 *     </header>
 *   );
 * };
 *
 * 💡 BONNES PRATIQUES UX MOBILE :
 *
 * 1. 📱 Zones tactiles :
 *    - Minimum 44px × 44px (recommandation Apple/Google)
 *    - Espacement suffisant entre les éléments
 *    - Feedback visuel au tap (active:scale-95)
 *
 * 2. ⚡ Performance :
 *    - Animations fluides (60fps)
 *    - Lazy loading si menu complexe
 *    - Gestion des états de chargement
 *
 * 3. ♿ Accessibilité :
 *    - Labels ARIA descriptifs
 *    - Support navigation clavier
 *    - Focus management dans le drawer
 *    - Contraste suffisant
 *
 * 4. 🎯 UX :
 *    - Fermeture automatique après navigation
 *    - Possibilité de fermer avec backdrop
 *    - Indication visuelle de l'état ouvert/fermé
 *    - Actions rapides facilement accessibles
 *
 * 📚 RESSOURCES SHADCN UI :
 *
 * 🔗 Sheet component documentation :
 * https://ui.shadcn.com/docs/components/sheet
 *
 * 🔗 Button component variants :
 * https://ui.shadcn.com/docs/components/button
 *
 * 🔗 Mobile UX Guidelines :
 * https://material.io/design/layout/responsive-layout-grid.html
 */
