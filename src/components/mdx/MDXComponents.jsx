// src/components/mdx/MDXComponents.jsx
// Composants personnalisés pour le rendu MDX

import Image from 'next/image';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TOCInline } from './TOCInline';

// (Utilisation de Prism complet pour éviter l'enregistrement manuel ici)

// (Anciennes définitions de tableau supprimées pour éviter conflits)

// Composant pour les images optimisées avec gestion portrait/paysage
function CustomImage({ src, alt, width = 0, height = 0, maxHeight = 650, caption, ...props }) {
  const fallbackWidth = 1200;
  const fallbackHeight = 630;
  const w = width || fallbackWidth;
  const h = height || fallbackHeight;
  const isPortrait = h > w * 1.1;
  const Wrapper = caption ? 'div' : 'span';
  return (
    <Wrapper className={`block my-8 ${isPortrait ? 'mx-auto max-w-sm' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={[
          'rounded-lg border',
          isPortrait
            ? 'h-auto max-h-[650px] w-auto object-contain mx-auto'
            : 'w-full h-auto object-cover',
        ].join(' ')}
        style={isPortrait ? { maxHeight: maxHeight } : undefined}
        {...props}
      />
      {caption && (
        <span className="mt-2 block text-center text-sm text-muted-foreground">{caption}</span>
      )}
    </Wrapper>
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

// Code inline personnalisé (pas de fond/bordure, couleur complémentaire)
const InlineCode = ({ children }) => (
  <code className="font-mono text-[15px] text-complement tracking-tight bg-complement-foreground rounded px-1 py-0.5">
    {children}
  </code>
);

// Bloc de code
const CodeBlock = ({ className = '', children }) => {
  const match = /language-(\w+)/.exec(className);
  const lang = match?.[1] || 'text';
  return (
    <SyntaxHighlighter
      language={lang}
      style={oneDark}
      showLineNumbers={lang !== 'text'}
      PreTag="div"
      CodeTag="code"
      customStyle={{
        margin: '1.25rem 0',
        padding: '1rem 0.75rem',
        borderRadius: '0.5rem',
        fontSize: '13px',
        background: 'hsl(var(--muted))',
      }}
      wrapLongLines
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

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
// Mapping des composants MDX
export const mdxComponents = {
  // Composant TOC
  TOCInline,

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
  code: InlineCode,
  pre: ({ children }) => {
    // next-mdx-remote enveloppe le contenu du bloc de code dans <pre><code/></pre>
    const child = Array.isArray(children) ? children[0] : children;
    if (child?.props?.className?.startsWith('language-')) {
      return <CodeBlock className={child.props.className}>{child.props.children}</CodeBlock>;
    }
    return <pre className="overflow-x-auto rounded bg-muted p-4 text-sm">{children}</pre>;
  },

  // Tableaux
  table: (props) => (
    <div className="my-6 overflow-x-auto not-prose">
      <table className="w-full text-sm border border-border/60 rounded-md overflow-hidden [&_th]:bg-muted/60 [&_th]:font-semibold [&_th]:text-foreground/90 [&_td]:align-top [&_td,th]:border [&_td,th]:border-border/50">
        {props.children}
      </table>
    </div>
  ),
  thead: (props) => <thead className="bg-muted/40" {...props} />,
  tbody: (props) => <tbody className="divide-y divide-border" {...props} />,
  tr: (props) => <tr className="even:bg-muted/30" {...props} />,
  th: (props) => (
    <th className="px-4 py-2 text-left font-semibold border border-border" {...props} />
  ),
  td: (props) => <td className="px-4 py-2 border border-border align-top" {...props} />,

  // Médias & liens
  // Images markdown simples -> wrapper neutre pour éviter figure dans <p>
  img: (props) => (
    <span className="block my-6">
      <Image
        alt={props.alt || ''}
        src={props.src}
        width={props.width || 1200}
        height={props.height || 630}
        className="w-full h-auto rounded-lg border object-contain max-h-[650px]"
      />
    </span>
  ),
  Image: CustomImage,
  a: CustomLink,
  Link: CustomLink,

  // Composants personnalisés
  Callout,

  // Séparateur
  hr: (props) => <hr className="my-8 border-border" {...props} />,
};
