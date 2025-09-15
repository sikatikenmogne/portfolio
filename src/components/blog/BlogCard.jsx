'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function BlogCard({ post, locale = '' }) {
  return (
    <article className="group relative flex flex-col space-y-2">
      {post.cover && (
        <Image
          src={post.cover}
          alt={post.title}
          width={804}
          height={452}
          className="rounded-lg border bg-muted transition-colors"
          priority={false}
        />
      )}
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime} min</span>
      </div>
      {post.summary && <p className="text-muted-foreground">{post.summary}</p>}
      {post.tags && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale ? locale + '/' : ''}blog/tag/${tag.toLowerCase()}`}
              className="text-sm text-primary hover:text-foreground"
            >
              {tag.toUpperCase().replace(' ', '-')}
            </Link>
          ))}
        </div>
      )}
      <Link href={`/${locale ? locale + '/' : ''}blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">Voir l'article {post.title}</span>
      </Link>
    </article>
  );
}
