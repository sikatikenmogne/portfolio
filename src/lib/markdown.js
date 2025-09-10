import { remark } from 'remark';
import html from 'remark-html';

export async function processMarkdown(markdown) {
  const processedContent = await remark().use(html).process(markdown);

  return processedContent.toString();
}

export function parseMarkdownContent(content) {
  // Simple markdown parsing for basic formatting
  // This is a basic implementation - you might want to use a more robust solution
  return content
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n\n/gim, '</p><p class="mb-4">')
    .replace(/^(?!<[h|l])/gim, '<p class="mb-4">')
    .replace(/(<li.*<\/li>)/gim, '<ul class="list-disc list-inside mb-4">$1</ul>');
}
