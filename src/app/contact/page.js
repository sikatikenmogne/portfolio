import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { ContactSection } from '@/components/contact/ContactSection';
import { getSocialLinks, filterSocialLinks, sortSocialLinks } from '@/lib/social-links';
import portfolioData from '@/data/i18n/fr.json';

// Base site URL for absolute SEO URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel SIKATI';
  const jobTitle = portfolioData?.personal?.title || 'Développeur Full Stack';
  const title = `Contact - ${fullName} | ${jobTitle}`;
  const description = `Contactez-moi pour discuter de vos projets web ou pour toute autre opportunité de collaboration.`;
  const ogImage = `${siteUrl}/images/profile-photo.jpg`;

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

export default async function ContactPage() {
  // Get and process social links
  const socialLinksData = await getSocialLinks();
  const filteredSocialLinks = filterSocialLinks(socialLinksData);
  const sortedSocialLinks = sortSocialLinks(filteredSocialLinks);

  return (
    <div className="flex min-h-screen flex-col">
      <NavigationHeader
        sticky={true}
        logoText="Samuel"
        ctaText="Me contacter"
        ctaHref="/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1">
        <ContactSection profileData={portfolioData} socialLinks={sortedSocialLinks} />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </div>
  );
}
