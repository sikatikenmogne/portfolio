import './globals.css';
import { Inter, Geist } from 'next/font/google';
import { NavigationHeader } from '@/components/navigation/Navigation';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { House } from 'lucide-react';
import { cn } from '@/lib/utils';

// Configuration des polices avec next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const Mono = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={cn(
        // Variables CSS pour les fonts
        inter.variable,
        geist.variable,
        Mono.variable,
        // Support du thème sombre
        'h-full'
      )}
    >
      <body
        className={cn(
          // Application du thème depuis globals.css
          'min-h-full bg-background font-sans antialiased',
          // Smooth scrolling
          'scroll-smooth'
        )}
      >
        {/* Navigation principale - Couche Présentation */}
        <NavigationHeader
          sticky={true}
          logoText="Portfolio"
          ctaText="Me contacter"
          ctaHref="/contact"
          className="border-primary/20"
        />

        {/* Layout principal */}

        {/* Contenu principal */}
        <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer optionnel */}
        <Footer />
      </body>
    </html>
  );

  function Footer() {
    return (
      <footer className="border-t border-border/50 bg-muted/20 mt-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Samuel SIKATI. Tous droits réservés.
            </p>
            <div className="flex space-x-4 text-sm">
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
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
