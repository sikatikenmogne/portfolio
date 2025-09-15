import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { AboutSection } from '@/components/profile/AboutSection';
import portfolioData from '@/data/i18n/fr.json';
import socialLinksData from '@/data/social-links.json';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `À propos - ${fullName} | Développeur Full Stack`;
  const description = `Découvrez mon profil de développeur Full Stack : mes spécialités en développement web, WordPress, et mes compétences techniques approfondies.`;
  const ogImage = `${siteUrl}/images/about/og-about.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/about`,
      languages: {
        'fr-CM': `${siteUrl}/about`,
        'fr-FR': `${siteUrl}/about`,
        'en-US': `${siteUrl}/en/about`,
        'en-GB': `${siteUrl}/en/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/about`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${fullName} - À propos` }],
      locale: 'fr_FR',
      alternateLocale: ['en_US'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <NavigationHeader
        socialLinks={socialLinksData.socialLinks}
        sticky={true}
        logoText="Samuel"
        ctaText="Me contacter"
        ctaHref="/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <AboutSection profileData={portfolioData} variant="full" />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
