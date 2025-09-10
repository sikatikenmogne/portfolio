// app/layout.js - SEO Optimized Layout for Junior Software Engineer Portfolio
// Educational version with detailed comments for beginners

import './globals.css';
import profileData from '../data/profile.json';
import socialLinksData from '../data/social-links.json';
import { Inter, Geist } from 'next/font/google';
import { incognito } from './assets/font/font';
import { gitlabmono } from './assets/font/font';

import { cn } from '@/lib/utils';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

// FONT CONFIGURATION - Optimized for performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Show fallback font first, then swap when loaded
  variable: '--font-sans',
  preload: true,
});

const geist = Geist({
  subsets: ['latin'],

  variable: '--font-display',
  display: 'swap',
  preload: true,
});

// Extract profile data for metadata generation
const { personal, professional } = profileData;
const professionalLinks = socialLinksData.socialLinks?.filter((link) => link.isProfessional) || [];

/**
 * SEO METADATA OPTIMIZED FOR JUNIOR SOFTWARE ENGINEER
 *
 * Strategy for junior profiles:
 * - Emphasize technical skills and certifications
 * - Highlight recent projects and achievements
 * - Focus on growth potential and learning mindset
 * - Target both local (Cameroon) and international opportunities
 */
export const metadata = {
  // Ensure absolute URLs for canonical/hreflang/OG
  metadataBase: new URL(siteUrl),
  // OPTIMIZED TITLE for Junior Positions
  // Format: "Name - Junior Software Engineer | Location | Key Skills"
  title: {
    default: `${personal.fullName} - Ingénieur Logiciel Junior | Développeur Full Stack | ${personal.location}`,
    template: '%s | ' + personal.fullName + ' - Portfolio',
  },

  // DESCRIPTION OPTIMIZED for Recruiters (150-160 characters)
  // Focus: Skills + Education + Location + Availability + Value Proposition
  description: `Ingénieur logiciel junior spécialisé .NET Core, React, Spring Boot. Diplômé UCAC-ICAM. Basé à ${personal.location}. Disponible pour missions et CDI. Portfolio avec projets concrets.`,

  // KEYWORDS targeting Junior Developer positions
  keywords: [
    // Junior-specific job titles
    'ingénieur logiciel junior',
    'développeur web full stack junior',
    'développeur junior',
    'junior software engineer',
    'développeur débutant',
    'fresh graduate developer',

    // Technical skills from CV
    '.NET Core',
    'Spring Boot',
    'React',
    'JavaScript',
    'Python',
    'PostgreSQL',
    'Docker',
    'Git',

    // Education and certifications
    'UCAC-ICAM',
    'diplômé ingénieur',
    'PCEP Python',
    'Scrum certified',

    // Location and availability
    'Yaoundé',
    'Douala',
    'Cameroun',
    'remote',
    'télétravail',
    'disponible immédiatement',

    // Soft skills for junior positions
    'apprentissage rapide',
    'motivation',
    'équipe',
    'adaptabilité',
  ].join(', '),

  // AUTHOR INFORMATION
  authors: [
    {
      name: personal.fullName,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com',
    },
  ],
  creator: personal.fullName,

  // CANONICAL URL and Language Alternatives
  alternates: {
    // Absolute canonical URL
    canonical: siteUrl,
    // Absolute hreflang URLs per locale
    languages: {
      'fr-CM': siteUrl,
      'fr-FR': siteUrl,
      'en-US': `${siteUrl}/en`,
      'en-GB': `${siteUrl}/en`,
    },
  },

  // OPEN GRAPH for Social Media Sharing (LinkedIn, Twitter)
  openGraph: {
    title: `${personal.fullName} - Ingénieur Logiciel Junior`,
    description: `Ingénieur Logiciel Junior | Développeur web full stack | Disponible pour nouveaux défis à ${personal.location}.`,
    type: 'profile', // Use 'profile' for personal portfolios
    locale: 'fr_CM',
    alternateLocale: ['en_US', 'fr_FR'],
    url: siteUrl,
    siteName: `${personal.fullName} - Portfolio Développeur`,
    // Add when you have a professional photo
    images: [
      {
        url: `${siteUrl}/images/profile-photo.jpg`,
        width: 1200,
        height: 630,
        alt: personal.fullName + ' - Software Engineer',
      },
    ],
  },

  // TWITTER CARD for Professional Sharing
  twitter: {
    card: 'summary_large_image',
    title: `${personal.fullName} - Développeur Full Stack Junior`,
    description: `Ingénieur logiciel spécialisé .NET Core & React. Portfolio avec projets concrets. Basé à ${personal.location}.`,
    creator: '@KenmogneSikati', // Add your Twitter handle if you have one
  },

  // ROBOTS and Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // STRUCTURED DATA (Schema.org) for Rich Snippets
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: personal.fullName,
      jobTitle: 'Ingénieur Logiciel Junior',
      description: personal.tagline || 'Développeur Full Stack spécialisé en .NET Core et React',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com',

      // Professional details
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance / Open to opportunities',
      },

      // Location
      workLocation: {
        '@type': 'Place',
        name: personal.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Douala',
          addressCountry: 'CM',
        },
      },

      // Education (important for junior profiles)
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'INSTITUT UCAC-ICAM',
          location: 'Douala, Cameroun',
        },
        {
          '@type': 'EducationalOrganization',
          name: "Institut Africain d'Informatique (IAI)",
          location: 'Douala, Cameroun',
        },
      ],

      // Technical skills
      knowsAbout: [
        '.NET Core',
        'Spring Boot',
        'React',
        'JavaScript',
        'Python',
        'PostgreSQL',
        'Docker',
        'Git',
        'Architecture Logicielle',
        'Développement Web Full Stack',
      ],

      // Certifications
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'PCEP – Certified Entry-Level Python Programmer',
          credentialCategory: 'certification',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Scrum Fundamentals Certified',
          credentialCategory: 'certification',
        },
      ],

      // Social profiles
      sameAs: professionalLinks.map((link) => link.url),

      // Contact info
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: 'sikatikenmogne@gmail.com',
        availableLanguage: ['French', 'English'],
      },
    }),
  },
};

// VIEWPORT CONFIGURATION for Mobile-First Design
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={cn(
        // Custom font variables for CSS
        incognito.variable,
        gitlabmono.variable,
        inter.variable,
        geist.variable,
        // Full height for proper layout
        'h-full'
      )}
      // Suppress hydration warning for theme switching
      suppressHydrationWarning
    >
      <head>
        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body
        className={cn(
          // Layout structure
          'min-h-screen flex flex-col',

          // Background and text colors (theme-aware)
          'bg-background text-foreground',

          // Typography
          'font-sans antialiased',

          // Smooth scrolling for better UX
          'scroll-smooth',

          // Prevent horizontal scroll on mobile
          'overflow-x-hidden'
        )}
      >
        {children}
      </body>
    </html>
  );
}
