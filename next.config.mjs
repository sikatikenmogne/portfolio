/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    // Plugins remark (traitement Markdown)
    remarkPlugins: [
      remarkGfm, // Support GitHub Flavored Markdown (tables, strikethrough, etc.)
    ],
    // Plugins rehype (traitement HTML)
    rehypePlugins: [
      rehypeSlug, // Ajoute des IDs aux headings
      [
        rehypeAutolinkHeadings, // Ajoute des liens vers les headings
        {
          behavior: 'wrap',
          properties: {
            className: ['heading-link'],
            ariaLabel: 'Lien vers cette section',
          },
        },
      ],
      [
        rehypeHighlight, // Coloration syntaxique du code
        {
          theme: 'github-dark', // Thème sombre par défaut
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
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['react-syntax-highlighter'],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  ...(process.env.ANALYZE === 'true' && {
    plugins: [(await import('@next/bundle-analyzer')).default({ enabled: true })],
  }),
};

export default mdx(nextConfig);