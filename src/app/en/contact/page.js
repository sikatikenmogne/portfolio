import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { ContactSection } from '@/components/contact/ContactSection';
import portfolioData from '@/data/i18n/en.json';
import socialLinksData from '@/data/social-links.json';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `Contact - ${fullName} | Full Stack Developer`;
  const description = `Get in touch with me to discuss your web projects or any other collaboration opportunity.`;
  const ogImage = `${siteUrl}/images/contact/og-contact.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/en/contact`,
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
      url: `${siteUrl}/en/contact`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${fullName} - Contact` }],
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

export default function ContactPage() {
  return (
    <>
      <NavigationHeader
        socialLinks={socialLinksData.socialLinks}
        sticky={true}
        logoText="Samuel"
        ctaText="See my projects"
        ctaHref="/en/projects"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1">
        <ContactSection
          profileData={portfolioData}
          socialLinks={socialLinksData.socialLinks}
          variant="full"
        />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
