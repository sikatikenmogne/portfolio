import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { FeaturedProjects } from '@/components/projects/FeaturedProjects';
import { getAllProjects } from '@/lib/content';
import portfolioData from '../../data/i18n/en.json';
import socialLinksData from '../../data/social-links.json';
import { HeroSplit } from '@/components/navigation/HeroVariants';
import { AboutSection } from '@/components/profile/AboutSection';
import { RecentPosts } from '@/components/blog/RecentPosts';
import { ContactSection } from '@/components/contact/ContactSection';

export default function HomePage() {
  const projects = getAllProjects();

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
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <HeroSplit profileData={portfolioData} socialLinks={socialLinksData.socialLinks} />
          <AboutSection profileData={portfolioData} variant="preview" />
          <FeaturedProjects projects={projects} locale="en" />
          <RecentPosts locale="en" limit={3} />
          <ContactSection
            profileData={portfolioData}
            socialLinks={socialLinksData.socialLinks}
            variant="preview"
          />
        </div>
      </main>
      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
        email={portfolioData.personal.email}
      />
    </>
  );
}
