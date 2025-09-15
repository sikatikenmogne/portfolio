import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { BlogContent } from '@/components/blog/BlogContent';
import { getAllPosts } from '@/lib/content-blog';
import portfolioData from '../../../data/i18n/en.json';
import socialLinksData from '../../../data/social-links.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export async function generateMetadata() {
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `Blog - ${fullName} | Developer Portfolio`;
  const description = `Technical articles, tutorials and experience sharing about web development, DevOps and best practices.`;
  const ogImage = `${siteUrl}/images/blog/og-blog.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/en/blog`,
      languages: {
        'fr-CM': `${siteUrl}/blog`,
        'fr-FR': `${siteUrl}/blog`,
        'en-US': `${siteUrl}/en/blog`,
        'en-GB': `${siteUrl}/en/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/en/blog`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${fullName} - Blog` }],
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

export default function BlogPage() {
  const posts = getAllPosts().filter((post) => post.lang === 'en');
  const tags = [...new Set(posts.flatMap((post) => post.tags || []))].sort();

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

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            {portfolioData.blog.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {portfolioData.blog.description}
          </p>
        </div>
        <hr className="mt-6 mb-8 border-t border-secondary/10" />
        <BlogContent initialPosts={posts} locale="en" />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </>
  );
}
