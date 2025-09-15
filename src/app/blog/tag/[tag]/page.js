import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { BlogList } from '@/components/blog/BlogList';
import { getAllTags, getPostsByTag } from '@/lib/content-blog';
import portfolioData from '@/data/i18n/fr.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const fullName = portfolioData?.personal?.fullName || 'Samuel Sikati';
  const title = `Articles sur ${decodedTag} - Blog | ${fullName}`;
  const description = `Découvrez tous mes articles sur ${decodedTag} : tutoriels, guides et retours d'expérience.`;
  const ogImage = `${siteUrl}/images/blog/og-tag-${decodedTag}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/blog/tag/${tag}`,
      languages: {
        'fr-CM': `${siteUrl}/blog/tag/${tag}`,
        'fr-FR': `${siteUrl}/blog/tag/${tag}`,
        'en-US': `${siteUrl}/en/blog/tag/${tag}`,
        'en-GB': `${siteUrl}/en/blog/tag/${tag}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog/tag/${tag}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Articles sur ${decodedTag}` }],
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

export default async function BlogTagPage({ params }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag).filter((post) => post.lang === 'fr');

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

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            {portfolioData.blog.tags.title.replace('{tag}', decodedTag)}
          </h1>
          <p className="text-xl text-muted-foreground">
            {portfolioData.blog.tags.count
              .replace('{count}', posts.length)
              .replace('{plural}', posts.length > 1 ? 's' : '')
              .replace('{tag}', decodedTag)}
          </p>
        </div>

        <BlogList posts={posts} locale="fr" />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </div>
  );
}
