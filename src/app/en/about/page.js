import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import portfolioData from '@/data/i18n/en.json';
import socialLinksData from '@/data/social-links.json';
import { AboutSection } from '@/components/profile/AboutSection';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `About - ${fullName} | Full Stack Developer`;
  const description = `Discover my Full Stack Developer profile: my specialties in web development, WordPress, and my in-depth technical skills.`;
  const ogImage = `${siteUrl}/images/about/og-about.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/en/about`,
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
      url: `${siteUrl}/en/about`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${fullName} - About` }],
      locale: 'en_US',
      alternateLocale: ['fr_FR'],
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
        ctaText="Contact me"
        ctaHref="/en/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
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
