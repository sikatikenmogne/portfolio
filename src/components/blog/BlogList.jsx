import { BlogCard } from './BlogCard';

export function BlogList({ posts, locale = 'fr' }) {
  if (!posts?.length) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-muted-foreground">
          {locale === 'fr' ? 'Aucun article trouvé' : 'No posts found'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} locale={locale} />
      ))}
    </div>
  );
}
