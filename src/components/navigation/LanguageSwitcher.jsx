'use client';
import { useNavigation } from './hooks/useNavigation';
import { useRef, useEffect, useState } from 'react';
import { HiMiniLanguage } from 'react-icons/hi2';

export default function LanguageSwitcher() {
  const { lang, switchLang } = useNavigation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Changer la langue"
        onClick={() => setOpen((v) => !v)}
        className="max-md:hidden p-2 rounded border bg-background hover:bg-muted transition-colors"
        type="button"
      >
        <HiMiniLanguage className="w-5 h-5" />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-background border border-zinc-200 dark:border-zinc-800 z-50">
          <li>
            <button
              onClick={() => {
                switchLang();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-primary/10 rounded"
              aria-current="page"
            >
              {lang === 'fr' ? 'English' : 'Français'}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
