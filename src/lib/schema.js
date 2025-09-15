/**
 * Génère le schema.org Article pour un article de blog
 */
export function generateBlogPostSchema(post, siteUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    },
    image: post.cover ? [post.cover] : [`${siteUrl}/images/blog/og-${post.slug}.jpg`],
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Samuel Sikati',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  };
}

/**
 * Génère le schema.org BlogPosting pour un article de blog
 */
export function generateBlogListingSchema(posts, siteUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog - Samuel Sikati',
    description: "Articles techniques, tutoriels et retours d'expérience sur le développement web",
    url: `${siteUrl}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      datePublished: post.date,
      dateModified: post.lastModified || post.date,
      url: `${siteUrl}/blog/${post.slug}`,
      keywords: post.tags?.join(', '),
    })),
  };
}
