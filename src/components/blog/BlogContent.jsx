'use client';

import { useState } from 'react';
import { BlogFilter } from './BlogFilter';
import { BlogList } from './BlogList';

export function BlogContent({ initialPosts, locale = 'fr' }) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const tags = [...new Set(initialPosts.flatMap((post) => post.tags || []))].sort();

  return (
    <>
      <BlogFilter tags={tags} posts={initialPosts} onFilter={setFilteredPosts} locale={locale} />
      <BlogList posts={filteredPosts} locale={locale} />
    </>
  );
}
