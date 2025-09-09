'use client';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useNavigation } from './hooks/useNavigation';
import {
  HiBeaker,
  HiBookmarkAlt,
  HiCamera,
  HiUser,
  HiGlobeAlt,
  HiOutlineHome,
} from 'react-icons/hi';
import { HiMiniLanguage } from 'react-icons/hi2';

export default function MobileNavigation() {
  const { navigationLinks, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, switchLang, lang } =
    useNavigation();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="Ouvrir le menu"
        onClick={toggleMobileMenu}
        className="md:hidden rounded p-2 border dark:border-zinc-800 border-zinc-200 bg-background"
        type="button"
      >
        <RxHamburgerMenu className="text-xl" />
      </button>
      {isMobileMenuOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl bg-background border border-zinc-200 dark:border-zinc-800 z-50">
          <nav className="flex flex-col py-3">
            {navigationLinks.map((link) => {
              const IconComponent = getNavigationIcon(link.label);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-start gap-x-4 px-6 py-4 font-incognito font-medium text-lg hover:bg-primary/10 transition-colors rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <IconComponent className="text-primary mt-1 text-2xl" aria-hidden="true" />
                  <span>
                    <span className="block text-left">{link.label}</span>
                    <span className="block text-xs text-muted-foreground font-normal">
                      {link.description}
                    </span>
                  </span>
                </Link>
              );
            })}
            <button
              onClick={switchLang}
              className="flex items-start gap-x-4 px-6 py-4 font-incognito font-medium text-lg hover:bg-primary/10 transition-colors rounded-lg"
              type="button"
            >
              <HiMiniLanguage className="text-primary mt-1 text-2xl" aria-hidden="true" />
              <span>
                <span className="block text-left">{lang === 'fr' ? 'EN' : 'FR'}</span>
                <span className="block text-xs text-muted-foreground font-normal">
                  {lang === 'fr' ? 'Switch to English' : 'Passer au français'}
                </span>
              </span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

function getNavigationIcon(label) {
  const iconMap = {
    Home: HiOutlineHome,
    About: HiUser,
    Projects: HiBeaker,
    Blog: HiBookmarkAlt,
    Contact: HiGlobeAlt,
  };
  return iconMap[label] || HiOutlineHome;
}
