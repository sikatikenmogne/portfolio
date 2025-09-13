// src/components/mdx/MDXComponents.jsx
// Composants personnalisés pour le rendu MDX

import Image from 'next/image';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Composant pour les images optimisées
function CustomImage({ src, alt, width = 800, height = 400, ...props }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        {...props}
      />
    </div>
  );
}

// Composant pour les liens externes
function CustomLink({ href, children, ...props }) {
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

// Composant pour les blocs de code
function CustomCodeBlock({ children, className, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1] || 'text';

  return (
    <div className="my-6">
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="rounded-lg !bg-card border"
        showLineNumbers={language !== 'text'}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'hsl(var(--card))',
          fontSize: '14px',
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}

// Composant pour le code inline
function InlineCode({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-sm bg-muted text-foreground font-mono">
      {children}
    </code>
  );
}

// Composant pour les alertes/callouts
function Callout({ type = 'info', children }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    warning:
      'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
    error:
      'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
    success:
      'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
  };

  return <div className={`p-4 rounded-lg border-l-4 my-6 ${styles[type]}`}>{children}</div>;
}

// Composant pour les tableaux
function CustomTable({ children }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse border border-border rounded-lg">{children}</table>
    </div>
  );
}

// Mapping des composants MDX
export const mdxComponents = {
  // Headers avec styles personnalisés
  h1: (props) => (
    <h1
      className="text-3xl font-bold tracking-tight mb-6 mt-8 first:mt-0 text-foreground"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-semibold tracking-tight mb-4 mt-8 text-foreground border-b pb-2"
      {...props}
    />
  ),
  h3: (props) => <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground" {...props} />,
  h4: (props) => <h4 className="text-lg font-medium mb-2 mt-4 text-foreground" {...props} />,

  // Paragraphes et texte
  p: (props) => <p className="mb-4 text-muted-foreground leading-7" {...props} />,

  // Listes
  ul: (props) => (
    <ul className="mb-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,

  // Citations
  blockquote: (props) => (
    <blockquote
      className="mt-6 mb-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
      {...props}
    />
  ),

  // Code
  pre: CustomCodeBlock,
  code: InlineCode,

  // Médias
  img: CustomImage,
  Image: CustomImage,

  // Liens
  a: CustomLink,
  Link: CustomLink,

  // Tableaux
  table: CustomTable,
  th: (props) => (
    <th className="border border-border px-4 py-2 text-left font-medium bg-muted" {...props} />
  ),
  td: (props) => <td className="border border-border px-4 py-2" {...props} />,

  // Composants personnalisés
  Callout,

  // Séparateur
  hr: (props) => <hr className="my-8 border-border" {...props} />,
};
