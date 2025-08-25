import { cn } from '@/lib/utils';

/**
 * Typography Components - Shadcn UI Style
 *
 * Consistent text styling using Shadcn design tokens
 * All components use CSS variables for theming support
 */

// Hero title with Shadcn styling
export function HeroTitle({ children, className }) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        'text-foreground',
        className
      )}
    >
      {children}
    </h1>
  );
}

// Professional subtitle
export function Subtitle({ children, className }) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight',
        'text-primary', // Uses ocean-500 via CSS variables
        className
      )}
    >
      {children}
    </h2>
  );
}

// Large body text for taglines
export function Lead({ children, className }) {
  return <p className={cn('text-xl text-muted-foreground leading-7', className)}>{children}</p>;
}

// Standard body text
export function BodyText({ children, className }) {
  return <p className={cn('leading-7 text-muted-foreground', className)}>{children}</p>;
}

// Small text for captions and metadata
export function Small({ children, className }) {
  return (
    <small className={cn('text-sm font-medium leading-none text-muted-foreground', className)}>
      {children}
    </small>
  );
}

// Inline code styling
export function Code({ children, className }) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  );
}

// External links with Shadcn styling
export function ExternalLink({ href, children, className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
        className
      )}
    >
      {children}
    </a>
  );
}
