// src/lib/markdown.js - Processeur Markdown amélioré
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { rehype } from 'rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Processeur Markdown principal avec tous les plugins
 * Utilisé pour convertir le Markdown en HTML avec style et fonctionnalités avancées
 */
export async function processMarkdown(markdown) {
  const result = await remark()
    .use(remarkGfm) // Support des tables, strikethrough, task lists
    .use(remarkHtml, {
      sanitize: false, // Permet le HTML dans le markdown
      allowDangerousHtml: true,
    })
    .process(markdown);

  // Post-traitement pour ajouter les classes Tailwind
  let html = result.toString();
  html = await enhanceHtmlWithTailwind(html);

  return html;
}

/**
 * Ajoute les classes Tailwind CSS au HTML généré
 * Cette fonction améliore le style visuel du contenu
 */
async function enhanceHtmlWithTailwind(html) {
  const processor = rehype()
    .use(rehypeSlug) // Ajoute des IDs aux titres
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-link group'],
        ariaLabel: 'Lien vers cette section',
      },
    })
    .use(rehypeHighlight, {
      detectLanguage: true,
      theme: 'github-dark',
    })
    .use(rehypeStringify);

  const result = await processor.process(html);
  return addTailwindClasses(result.toString());
}

/**
 * Extrait un résumé du contenu Markdown
 */
export function extractSummary(content, maxLength = 200) {
  if (!content) return '';

  // Supprime les titres et le formatage Markdown
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // Supprime les titres
    .replace(/\*\*(.*?)\*\*/g, '$1') // Supprime le gras
    .replace(/\*(.*?)\*/g, '$1') // Supprime l'italique
    .replace(/`(.*?)`/g, '$1') // Supprime le code inline
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Supprime les liens
    .replace(/\n\s*\n/g, ' ') // Supprime les doubles retours à la ligne
    .trim();

  if (plainText.length <= maxLength) return plainText;

  // Tronque au dernier mot complet
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Estime le temps de lecture du contenu
 */
export function estimateReadingTime(content) {
  if (!content) return 0;

  const wordsPerMinute = 200; // Moyenne de lecture en français
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1');

  const wordCount = plainText.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes;
}

/**
 * Ajoute des classes Tailwind spécifiques aux éléments HTML
 * Cette fonction assure la cohérence visuelle avec votre design system
 */
function addTailwindClasses(html) {
  return (
    html
      // Headers avec styles cohérents
      .replace(
        /<h1([^>]*)>/g,
        '<h1$1 class="text-3xl font-bold tracking-tight mb-6 mt-8 first:mt-0 text-foreground scroll-mt-20">'
      )
      .replace(
        /<h2([^>]*)>/g,
        '<h2$1 class="text-2xl font-semibold tracking-tight mb-4 mt-8 text-foreground border-b border-border pb-2 scroll-mt-20">'
      )
      .replace(
        /<h3([^>]*)>/g,
        '<h3$1 class="text-xl font-semibold mb-3 mt-6 text-foreground scroll-mt-20">'
      )
      .replace(
        /<h4([^>]*)>/g,
        '<h4$1 class="text-lg font-medium mb-2 mt-4 text-foreground scroll-mt-20">'
      )
      .replace(
        /<h5([^>]*)>/g,
        '<h5$1 class="text-base font-medium mb-2 mt-4 text-foreground scroll-mt-20">'
      )
      .replace(
        /<h6([^>]*)>/g,
        '<h6$1 class="text-sm font-medium mb-2 mt-4 text-muted-foreground scroll-mt-20">'
      )

      // Paragraphes
      .replace(/<p>/g, '<p class="mb-4 text-muted-foreground leading-7">')

      // Listes
      .replace(/<ul>/g, '<ul class="mb-6 ml-6 list-disc space-y-1 text-muted-foreground">')
      .replace(/<ol>/g, '<ol class="mb-6 ml-6 list-decimal space-y-1 text-muted-foreground">')
      .replace(/<li>/g, '<li class="leading-7">')

      // Citations
      .replace(
        /<blockquote>/g,
        '<blockquote class="mt-6 mb-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/30 py-2 rounded-r">'
      )

      // Code inline
      .replace(
        /<code(?![^>]*class="language-)/g,
        '<code class="px-1.5 py-0.5 rounded text-sm bg-muted text-foreground font-mono"'
      )

      // Blocs de code pre
      .replace(
        /<pre><code class="language-([^"]*)"([^>]*)>/g,
        '<div class="my-6 rounded-lg overflow-hidden border bg-card"><pre class="p-4 overflow-x-auto"><code class="language-$1 text-sm"$2>'
      )
      .replace(/<\/code><\/pre>/g, '</code></pre></div>')

      // Tableaux
      .replace(
        /<table>/g,
        '<div class="my-8 overflow-x-auto"><table class="w-full border-collapse border border-border rounded-lg">'
      )
      .replace(/<\/table>/g, '</table></div>')
      .replace(
        /<th>/g,
        '<th class="border border-border px-4 py-2 text-left font-medium bg-muted">'
      )
      .replace(/<td>/g, '<td class="border border-border px-4 py-2">')

      // Liens
      .replace(/<a href="([^"]*)"([^>]*)>/g, (match, href, attrs) => {
        const isExternal = href.startsWith('http');
        const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${href}"${attrs} class="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"${externalAttrs}>`;
      })

      // Images
      .replace(
        /<img([^>]*) src="([^"]*)"([^>]*) alt="([^"]*)"([^>]*)>/g,
        '<div class="my-8 rounded-lg overflow-hidden border"><img$1 src="$2"$3 alt="$4"$5 class="w-full h-auto" loading="lazy"></div>'
      )

      // Séparateurs
      .replace(/<hr>/g, '<hr class="my-8 border-border">')

      // Task lists (GitHub Flavored Markdown)
      .replace(
        /<li><input type="checkbox" disabled checked>/g,
        '<li class="flex items-center space-x-2"><input type="checkbox" disabled checked class="rounded border-border text-primary focus:ring-primary"><span>'
      )
      .replace(
        /<li><input type="checkbox" disabled>/g,
        '<li class="flex items-center space-x-2"><input type="checkbox" disabled class="rounded border-border text-primary focus:ring-primary"><span>'
      )
      .replace(/<\/li>/g, (match, offset, string) => {
        const beforeLi = string.substring(0, offset);
        const hasCheckbox =
          beforeLi.lastIndexOf('<input type="checkbox"') > beforeLi.lastIndexOf('</li>');
        return hasCheckbox ? '</span></li>' : '</li>';
      })

      // Strikethrough
      .replace(/<del>/g, '<del class="line-through text-muted-foreground/70">')

      // Strong et em
      .replace(/<strong>/g, '<strong class="font-semibold text-foreground">')
      .replace(/<em>/g, '<em class="italic">')
  );
}

/**
 * Fonction simplifiée pour le rendu rapide (fallback)
 * Utilisée quand le traitement complet n'est pas nécessaire
 */
export function parseMarkdownContent(content) {
  if (!content) return '';

  return content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6 text-foreground">$1</h3>')
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-semibold tracking-tight mb-4 mt-8 text-foreground border-b border-border pb-2">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold tracking-tight mb-6 mt-8 first:mt-0 text-foreground">$1</h1>'
    )
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded text-sm bg-muted text-foreground font-mono">$1</code>'
    )
    .replace(/^- (.*$)/gim, '<li class="leading-7">$1</li>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors">$1</a>'
    )
    .replace(/\n\n/gim, '</p><p class="mb-4 text-muted-foreground leading-7">')
    .replace(/^(?!<[hl])/gim, '<p class="mb-4 text-muted-foreground leading-7">')
    .replace(
      /(<li.*?<\/li>)/gim,
      '<ul class="mb-6 ml-6 list-disc space-y-1 text-muted-foreground">$1</ul>'
    );
}

/**
 * Formatte les métadonnées d'un projet pour l'affichage
 */
export function formatProjectMetadata(project) {
  return {
    ...project,
    formattedDate: new Date(project.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readingTime: estimateReadingTime(project.content),
    summary: project.summary || extractSummary(project.content),
    statusLabel: getStatusLabel(project.status),
    statusColor: getStatusColor(project.status),
  };
}

/**
 * Retourne le label français du statut
 */
function getStatusLabel(status) {
  const labels = {
    completed: 'Terminé',
    'in-progress': 'En cours',
    planned: 'Planifié',
    archived: 'Archivé',
  };
  return labels[status] || 'Non défini';
}

/**
 * Retourne les classes CSS pour colorier le statut
 */
function getStatusColor(status) {
  const colors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    planned: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return colors[status] || colors.completed;
}

/**
 * Extraction d'un extrait du contenu pour les aperçus
 * Retire le formatage Markdown pour un texte propre
 */
export function extractContentExcerpt(content, maxLength = 200) {
  if (!content) return '';

  // Nettoie le contenu Markdown pour obtenir du texte brut
  let cleanContent = content
    .replace(/^#+\s+/gm, '') // Retire les headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Retire le gras
    .replace(/\*(.*?)\*/g, '$1') // Retire l'italique
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Retire les liens, garde le texte
    .replace(/`([^`]+)`/g, '$1') // Retire les backticks de code
    .replace(/\n+/g, ' ') // Remplace les retours à la ligne par des espaces
    .trim();

  // Si le contenu est plus court que la limite, on le retourne tel quel
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Trouve le dernier mot complet dans la limite
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
}

/**
 * Génère une table des matières à partir du contenu Markdown
 * Utile pour la navigation dans les longs articles
 */
export function generateTableOfContents(content) {
  if (!content) return [];

  const headings = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Retire les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .trim();

    headings.push({
      level,
      text,
      slug,
    });
  }

  return headings;
}
