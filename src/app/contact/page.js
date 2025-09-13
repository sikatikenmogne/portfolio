import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { ContactSection } from '@/components/contact/ContactSection';
import portfolioData from '@/data/i18n/fr.json';
import { socialLinks as socialLinksData } from '@/data/social-links.json';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `Contact - ${fullName} | Développeur Full Stack`;
  const description = `Contactez-moi pour discuter de vos projets web ou pour toute autre opportunité de collaboration.`;
  const ogImage = `${siteUrl}/images/contact/og-contact.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/contact`,
      languages: {
        'fr-CM': `${siteUrl}/contact`,
        'fr-FR': `${siteUrl}/contact`,
        'en-US': `${siteUrl}/en/contact`,
        'en-GB': `${siteUrl}/en/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/contact`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${fullName} - Contact` }],
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

export default function ContactPage() {
  return (
    <>
      <NavigationHeader
        socialLinks={socialLinksData}
        sticky={true}
        logoText="Samuel"
        ctaText="Voir mes projets"
        ctaHref="/projects"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ContactSection
            profileData={portfolioData}
            socialLinks={socialLinksData}
            variant="full"
          />
        </div>
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
