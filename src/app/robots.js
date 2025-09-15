// app/robots.js
// Compatible avec output: 'export' (statique)
export const dynamic = 'force-static';

export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
