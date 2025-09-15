'use client';

import { useState, useMemo } from 'react';
import fr from '@/data/i18n/fr.json';
import en from '@/data/i18n/en.json';

export function BlogFilter({ tags, posts, onFilter, locale = 'fr' }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [query, setQuery] = useState('');
  const dict = locale === 'en' ? en : fr;

  const filtered = useMemo(() => {
    let result = posts;
    if (selectedTag) {
      result = result.filter((post) => post.tags && post.tags.includes(selectedTag));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((post) => {
        const haystack =
          ` ${post.title} ${post.summary || ''} ${(post.tags || []).join(' ')} `.toLowerCase();
        return haystack.includes(q);
      });
    }
    return result;
  }, [posts, selectedTag, query]);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  // Propagate filtered list upward
  // (Simple effect-less approach: call on each render; parent state setter is stable)
  if (onFilter) {
    onFilter(filtered);
  }

  return (
    <div className="mb-6 space-y-6">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => handleTagSelect(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            !selectedTag
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {locale === 'fr' ? 'Tous' : 'All'}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagSelect(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      {/* Search */}
      <div className="w-full sm:w-80 relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground/60">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          aria-label={locale === 'en' ? 'Search posts' : 'Rechercher des articles'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            dict.blog?.search?.placeholder ||
            (locale === 'en' ? 'Search a post...' : 'Rechercher un article...')
          }
          className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
      </div>
    </div>
  );
}
