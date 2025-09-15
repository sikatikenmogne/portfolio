'use client';

import { useState, useEffect, useCallback } from 'react';
import { slug } from 'github-slugger';

/**
 * Composant pour générer une table des matières à partir des props toc
 */
export function TOCInline({
  toc = [],
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  exclude = '',
  asDisclosure = false,
}) {
  console.log('TOCInline rendu avec:', { toc, fromHeading, toHeading });

  const [activeId, setActiveId] = useState('');

  if (!Array.isArray(toc)) {
    console.warn("TOCInline: toc n'est pas un tableau", toc);
    return null;
  }

  if (toc.length === 0) {
    console.log('TOCInline: toc est vide');
    return null;
  }

  const minDepth = toc.reduce((min, item) => (item.depth < min ? item.depth : min), 6);
  const filteredToc = toc.filter(
    (item) => item.depth >= fromHeading && item.depth <= toHeading && !exclude.includes(item.value)
  );

  // Fonction pour vérifier si un titre est visible
  const isHeadingVisible = useCallback((id) => {
    const element = document.getElementById(id);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
  }, []);

  // Met à jour le titre actif lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      const headingIds = filteredToc.map((item) => slug(item.value));
      const visibleHeadings = headingIds.filter(isHeadingVisible);

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Vérification initiale

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filteredToc, isHeadingVisible]);

  const content = (
    <ul className="space-y-2 text-sm">
      {filteredToc.map((item) => {
        const id = slug(item.value);
        const isActive = id === activeId;

        return (
          <li key={id} className={`${item.depth >= indentDepth && 'ml-4'}`}>
            <a
              href={`#${id}`}
              className={`block py-0 text-primary transition-colors underline ${
                isActive ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
            >
              {item.value}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (asDisclosure) {
    return (
      <details open className="mt-4">
        <summary className="ml-6 cursor-pointer pb-2 pt-2 text-xl font-bold">
          Table des matières
        </summary>
        <div className="ml-6">{content}</div>
      </details>
    );
  }

  return content;
}
