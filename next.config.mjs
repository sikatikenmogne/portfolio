/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx';

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
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
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  ...(process.env.ANALYZE === 'true' && {
    plugins: [(await import('@next/bundle-analyzer')).default({ enabled: true })],
  }),
};

export default mdx(nextConfig);