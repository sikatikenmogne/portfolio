import { NavigationHeader, Footer } from '@/components/navigation/Navigation';
import { BlogNavigation } from '@/components/blog/BlogNavigation';
import { getPostBySlug, getSiblingPosts, getAllPosts } from '@/lib/content-blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { formatDate } from '@/lib/utils';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { processMarkdown, generateTableOfContents } from '@/lib/markdown';
import { TOCInline } from '@/components/mdx/TOCInline';
import portfolioData from '../../../../data/i18n/fr.json';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';

export function generateStaticParams() {
  const posts = getAllPosts().filter((post) => post.lang === 'en');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props) {
  const params = await Promise.resolve(props.params);
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested article does not exist.',
    };
  }

  const title = `${post.title} - Blog | ${portfolioData?.personal?.fullName || 'Samuel Sikati'}`;
  const description = post.summary;
  const ogImage = post.cover || `${siteUrl}/images/blog/og-${post.slug}.jpg`;

  return {
    title,
    description,
    keywords: [...(post.tags || []), 'blog', 'development', portfolioData?.personal?.fullName].join(
      ', '
    ),
    alternates: {
      canonical: `${siteUrl}/en/blog/${post.slug}`,
      languages: {
        'fr-FR': `${siteUrl}/blog/${post.slug}`,
        'fr-CM': `${siteUrl}/blog/${post.slug}`,
        'en-US': `${siteUrl}/en/blog/${post.slug}`,
        'en-GB': `${siteUrl}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/en/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [portfolioData?.personal?.fullName],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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

export default async function BlogPost({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);
  console.log('Post récupéré:', JSON.stringify(post, null, 2));

  if (!post) {
    console.log('Post non trouvé, redirection vers 404');
    notFound();
  }

  console.log('Récupération des posts adjacents...');
  const { previousPost, nextPost } = await getSiblingPosts(resolvedParams.slug);
  console.log('Posts adjacents récupérés');

  if (!post || post.lang !== 'en') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">{portfolioData.blog.notFound.title}</h1>
        <p className="mt-4 text-muted-foreground">{portfolioData.blog.notFound.description}</p>
      </div>
    );
  }

  const toc = generateTableOfContents(post.content || '');
  console.log('Table des matières générée:', toc.length, 'entrées');
  console.log('Structure de la table des matières:', JSON.stringify(toc, null, 2));

  return (
    <div className="flex min-h-screen flex-col">
      <NavigationHeader
        sticky={true}
        logoText="Samuel"
        ctaText="Contact me"
        ctaHref="/en/contact"
        className="border-primary/20"
        navLinks={portfolioData.navLinks}
      />

      <main className="flex-1 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <article className="prose dark:prose-invert mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>
                {post.readingTime} {portfolioData.blog.readingTime}
              </span>
            </div>
            {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex text-primary items-center px-3 py-1 rounded text-sm bg-muted/20"
                  >
                    {tag.toUpperCase().replace(' ', '-')}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Contenu principal */}
          {post.content && (
            <div className="mdx-content">
              <MDXRemote
                source={post.content}
                components={{
                  ...mdxComponents,
                  TOCInline: (props) => (
                    <TOCInline
                      {...props}
                      toc={Array.isArray(props.toc) && props.toc.length > 0 ? props.toc : toc}
                    />
                  ),
                }}
                options={{
                  mdxOptions: {
                    format: 'mdx',
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                  },
                }}
              />
            </div>
          )}
        </article>

        <BlogNavigation
          previousPost={previousPost?.lang === 'en' ? previousPost : null}
          nextPost={nextPost?.lang === 'en' ? nextPost : null}
          locale="en"
        />
      </main>

      <Footer
        CopyrightAuthor={portfolioData.personal.fullName}
        displayText={portfolioData.Footer.displayText}
        portfolioGithubRepo={portfolioData.Footer.portfolioGithubRepo}
      />
    </div>
  );
}
