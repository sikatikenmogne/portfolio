// app/sitemap.js
import { getAllPosts } from '@/lib/content-blog';

// For static export compatibility
export const dynamic = 'force-static';
export const revalidate = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export default async function sitemap() {
  const posts = getAllPosts();

  // Routes de base du blog
  const blogRoutes = [
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Routes des articles en français
  const frenchPostRoutes = posts
    .filter((post) => post.lang === 'fr')
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.lastModified || post.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  // Routes des articles en anglais
  const englishPostRoutes = posts
    .filter((post) => post.lang === 'en')
    .map((post) => ({
      url: `${siteUrl}/en/blog/${post.slug}`,
      lastModified: post.lastModified || post.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  // Routes des tags
  const tags = [...new Set(posts.flatMap((post) => post.tags || []))];
  const tagRoutes = tags.flatMap((tag) => [
    {
      url: `${siteUrl}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/en/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]);

  // Next sitemap route expects an array of objects with url/lastModified
  return [...blogRoutes, ...frenchPostRoutes, ...englishPostRoutes, ...tagRoutes];
}
