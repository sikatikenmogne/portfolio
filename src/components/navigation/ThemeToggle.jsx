'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import SunIcon from '@/app/assets/icons/SunIcon';
import MoonIcon from '@/app/assets/icons/MoonIcon';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Initial theme from localStorage or prefers-color-scheme
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <button
      aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
      onClick={toggleTheme}
      className="rounded-full p-2 border bg-background hover:bg-muted transition-colors"
      type="button"
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
