import './globals.css';
import profileData from '../data/profile.json';
import socialLinksData from '../data/social-links.json';
import { Inter, Geist } from 'next/font/google';
import { NavigationHeader } from '@/components/navigation/Navigation';
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

/**
 * Metadata optimized for Hero7-style landing
 */
export const metadata = {
  title: `${profileData.personal.fullName} - ${profileData.personal.title}`,
  description: `${profileData.personal.tagline} Portfolio moderne et épuré créé avec Next.js et Shadcn UI.`,
  keywords:
    'développeur, software engineer, React, Next.js, Shadcn UI, portfolio moderne, clean design',

  // Multi-langue
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'en-US': '/en',
    },
  },

  // Open Graph for social sharing
  openGraph: {
    title: `${profileData.personal.fullName} - Portfolio Développeur`,
    description: profileData.personal.tagline,
    type: 'website',
    locale: 'fr_FR',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.personal.fullName} - ${profileData.personal.title}`,
    description: profileData.personal.tagline,
  },

  // Structured data for better SEO
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profileData.personal.fullName,
      jobTitle: profileData.personal.title,
      description: profileData.personal.tagline,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.dev',
      workLocation: {
        '@type': 'Place',
        name: profileData.personal.location,
      },
      knowsAbout: profileData.professional.specializations,
      sameAs: socialLinksData.socialLinks
        .filter((link) => link.isProfessional)
        .map((link) => link.url),
    }),
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

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
