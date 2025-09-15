import Link from 'next/link';
import { getRecentPosts } from '@/lib/content-blog';
import fr from '@/data/i18n/fr.json';
import en from '@/data/i18n/en.json';
import { BlogList } from './BlogList';

// Section des articles récents en réutilisant le même layout (BlogCard) que la page blog
export function RecentPosts({ locale = 'fr', limit = 3 }) {
  const dict = locale === 'en' ? en : fr;
  const posts = getRecentPosts(limit, locale);
  // Debug SSR (apparaîtra dans la console serveur Next.js)
  if (typeof console !== 'undefined') {
    console.log(
      '[RecentPosts] locale=%s - posts found=%d slugs=%o',
      locale,
      posts.length,
      posts.map((p) => p.slug)
    );
  }

  return (
    <section className="lg:py-24" aria-labelledby="recent-posts-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 id="recent-posts-heading" className="text-3xl font-bold tracking-tight mb-1">
              {dict.blog?.recentPosts?.title ||
                (locale === 'en' ? 'Recent Articles' : 'Articles récents')}
            </h2>
            <p className="text-muted-foreground text-base">
              {dict.blog?.recentPosts?.subtitle ||
                (locale === 'en' ? 'Latest posts from the blog' : 'Les derniers articles publiés')}
            </p>
          </div>
          <Link
            href={`/${locale === 'en' ? 'en/' : ''}blog`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {dict.blog?.recentPosts?.allLink || (locale === 'en' ? 'View all' : 'Voir tout')}
          </Link>
        </div>
        {posts.length ? (
          <BlogList posts={posts} locale={locale === 'fr' ? '' : locale} />
        ) : (
          <p className="text-sm text-muted-foreground">
            {locale === 'en' ? 'No recent posts.' : 'Aucun article récent.'}
          </p>
        )}
      </div>
    </section>
  );
}
