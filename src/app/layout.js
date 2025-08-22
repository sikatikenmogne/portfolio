import { Inter } from 'next/font/google';
import './globals.css';

// Configuration des polices avec next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const Mono = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Portfolio - Samuel SIKATI',
  description: 'Découvrez Samuel SIKATI, Ingénieur logiciel, Développeur web full stack',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${Mono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
