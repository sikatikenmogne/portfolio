import Link from 'next/link';

import frJson from '@/data/i18n/fr.json';
import enJson from '@/data/i18n/en.json';

export function BlogNavigation({ previousPost, nextPost, locale = 'fr' }) {
  const i18n = locale === 'fr' ? frJson : enJson;

  return (
    <nav className="flex items-center justify-between border-t mt-8 pt-8">
      <div>
        {previousPost && (
          <Link
            href={`/${locale === 'en' ? 'en/' : ''}blog/${previousPost.slug}`}
            className="group flex flex-col"
          >
            <span className="text-sm text-muted-foreground">{i18n.blog.navigation.previous}</span>
            <span className="text-lg font-medium group-hover:text-primary">
              {previousPost.title}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {nextPost && (
          <Link
            href={`/${locale === 'en' ? 'en/' : ''}blog/${nextPost.slug}`}
            className="group flex flex-col"
          >
            <span className="text-sm text-muted-foreground">{i18n.blog.navigation.next}</span>
            <span className="text-lg font-medium group-hover:text-primary">{nextPost.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
