/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['heading-link'],
            ariaLabel: 'Lien vers cette section',
          },
        },
      ],
      [
        rehypeHighlight,
        {
          theme: 'github-dark',
          detectLanguage: true,
        },
      ],
    ],
  },
});

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost'],
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['react-syntax-highlighter'],
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
};

export default mdx(nextConfig);
