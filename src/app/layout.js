import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Configuration des polices avec next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: 'Portfolio',
  description: 'Mon portfolio personnel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
