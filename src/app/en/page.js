import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import portfolioData from '@/data/i18n/en.json';
import socialLinksData from '@/data/social-links.json';
import { HeroSplit } from '@/components/navigation/HeroVariants';

export default function HomePage() {
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
      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <HeroSplit profileData={portfolioData} socialLinks={socialLinksData.socialLinks} />
      </main>
      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
