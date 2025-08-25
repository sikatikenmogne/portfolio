import { HeroSection } from '../components/navigation/HeroSection';
// Alternative imports pour différents layouts
import {
  HeroMinimal,
  HeroWithSubtleAvatar,
  HeroSplit,
} from '../components/navigation/HeroVariants';

import profileData from '../data/profile.json';
import socialLinksData from '../data/social-links.json';

export default function HomePage() {
  return <HeroSection profileData={profileData} socialLinks={socialLinksData.socialLinks} />;
}

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

  // Responsive
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
