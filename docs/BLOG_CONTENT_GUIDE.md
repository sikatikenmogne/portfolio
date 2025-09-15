# Guide de Rédaction & Gestion du Contenu Blog

Ce tutoriel explique comment ajouter, structurer, maintenir et optimiser les articles du blog dans ce projet (Next.js + MDX + système i18n statique).

---
## 1. Emplacement & Nommage des Fichiers
- Dossier des articles : `content/blog/`
- Extension recommandée : `.mdx`
- Nom de fichier = *slug* par défaut (ex: `how-to-optimize-your-vscode-workflow-setup.mdx`)
- Slug personnalisé possible via frontmatter `slug:` (rarement nécessaire).

### Structure minimale d’un fichier
```mdx
---
title: Mon Titre d’article
date: '2025-01-15'
lang: 'fr'
tags: ['nextjs','performance']
summary: Courte description utilisée dans les listes.
images: [/images/blog/posts/mon-article/cover.png]
draft: false
---

## Introduction
Contenu...
```

---
## 2. Champs Frontmatter Pris en Charge
| Champ | Obligatoire | Type | Description |
|-------|-------------|------|-------------|
| `title` | Oui | string | Titre affiché & SEO (balise `<title>`) |
| `date` | Oui | string (YYYY-MM-DD) | Date de publication (ISO) |
| `lang` | Recommandé | `'fr' | 'en'` | Permet le filtrage par langue |
| `tags` | Optionnel | string[] | Mots-clés (filtre & SEO) |
| `summary` | Recommandé | string | Extrait utilisé dans cartes / meta |
| `images` | Optionnel | string[] | Chemins d’illustrations (premier = cover si `cover` absent) |
| `cover` | Optionnel | string | Image de couverture explicite |
| `draft` | Optionnel | boolean | Si `true`, masqué en production |
| `readingTime` | Optionnel | number | Calculé automatiquement si absent |
| `slug` | Optionnel | string | Force le slug (sinon dérivé du nom fichier) |
| `lastmod` | Optionnel | string | Dernière modification (affichage futur) |
| `canonicalUrl` | Optionnel | string | Canonical SEO si syndication |
| `authors` | Optionnel | string[] | Auteurs (future extension) |

Notes :
- Si `lang` manquant, l’article est visible dans toutes les locales (fallback).
- `excerpt` est dérivé automatiquement de `summary` ou du début du contenu.

---
## 3. Conventions Contenu
### Titres
- Un seul `#` (H1) implicite : ne pas déclarer de `#` explicite (Commencer à `##`).
- Hiérarchie logique : `##`, `###`, etc. pour un TOC propre (`<TOCInline />`).

### Table des matières
Insérer où souhaité :
```mdx
<TOCInline toc={props.toc} exclude="Overview" toHeading={3} />
```

### Code
- Blocs : triple ``` avec langue (ex: ```js). Prism s’occupe du highlight.
- Inline code : utiliser \`code\` (style custom minimal).

### Images
- Mettre les assets sous `public/images/blog/posts/<slug>/`.
- Utiliser des chemins absolus `/images/...`.
- Portraits : la feuille de style gère automatiquement la hauteur max.
- Éviter de wrapper une image dans un `<p>` avec HTML complexe (laisser Markdown faire).

### Tableaux
- Supportés via GFM (`remark-gfm`).
- Syntaxe standard Markdown.

### HTML Inline
- Possible avec MDX, mais éviter les containers imbriqués invalides (`<div>` dans un paragraphe Markdown).

---
## 4. Internationalisation (i18n)
Actuellement :
- Un fichier = une langue
- Pas de liaison automatique FR ↔ EN (peut être ajoutée plus tard)

Pour une traduction :
1. Dupliquer le fichier original.
2. Traduire `title`, `summary`, `lang`, contenu.
3. Renommer si besoin (`-fr` / `-en` non nécessaire si répertoires partagés).
4. Vérifier `lang: 'en'` ou `lang: 'fr'`.

---
## 5. Ajout d’Images
1. Créer le dossier : `public/images/blog/posts/<slug>/`.
2. Ajouter les fichiers (formats recommandés : `.jpg`, `.png`, `.webp`).
3. Référencer :
```mdx
![Alt text descriptif](/images/blog/posts/<slug>/mon-image.png)
```
4. Première image => couverture si `cover` manquant.

---
## 6. Rendu & Pipeline Technique
- Chargement : `getAllPosts()` lit tous les fichiers, parse frontmatter (gray-matter).
- Compilation page article : `compileMDX` (remark-gfm, rehype-slug, autolink headings).
- Highlight : côté client avec composant Prism (pas de `rehype-highlight`).
- Tables : transformées par GFM.
- TOC : généré via parsing des headings (utilisé par `<TOCInline/>`).

---
## 7. Fonctions Utiles (`src/lib/content-blog.js`)
| Fonction | Usage |
|----------|-------|
| `getAllPosts()` | Liste tous les articles (tri décroissant par date) |
| `getPostBySlug(slug)` | Retourne un article + contenu MDX brut/compilé |
| `getRecentPosts(limit, locale)` | N récents (filtre langue + fallback) |
| `getPostsByTag(tag)` | Filtre par tag |
| `searchPosts(query)` | Recherche plein texte simple |
| `getAllTags()` | Liste de tous les tags uniques |
| `getSiblingPosts(slug)` | Article précédent / suivant |

---
## 8. Composants Clés
| Composant | Rôle |
|-----------|------|
| `MDXComponents.jsx` | Mapping custom (code, tables, images...) |
| `BlogContent` | Regroupe filtre + liste (client) |
| `BlogFilter` | Tags + barre de recherche |
| `BlogList` / `BlogCard` | Grille & carte article |
| `RecentPosts` | Section articles récents (homepage) |

---
## 9. Performance & Bonnes Pratiques
- Garder les images légères (< 200KB idéalement) – utiliser conversion WebP si possible.
- Limiter le nombre de gifs / iframes.
- Éviter les titres quasi identiques (impact SEO & TOC).
- Inclure des tags pertinents (3–8, max ~12).
- Rester cohérent dans le casing des tags (`Next.js` vs `nextjs`).

---
## 10. Check-list Publication
Avant commit :
- [ ] `title`, `date`, `lang`, `summary` renseignés
- [ ] Pas de `draft: true`
- [ ] Pas de HTML invalide dans des paragraphes
- [ ] Code fenced avec langues (`js`, `ts`, `bash`, etc.)
- [ ] Images existent sous `public/`
- [ ] Table des matières insérée si article long
- [ ] Tags cohérents existants ou nouveaux pertinents

---
## 11. Exemple Complet
```mdx
---
title: "Optimiser les performances Next.js"
date: '2025-02-10'
lang: 'fr'
tags: ['nextjs','performance','web']
summary: Stratégies concrètes pour améliorer les temps de rendu et le TTFB dans Next.js.
images: [/images/blog/posts/optimiser-nextjs/cover.png]
draft: false
---

<TOCInline toc={props.toc} toHeading={3} />

## Pourquoi la performance compte
Intro...

## Méthodes
### 1. Analyse
Code:
```js
console.time('heavy');
// ...
console.timeEnd('heavy');
```

| Technique | Gain |
|-----------|------|
| Mise en cache | Haute |
| Streaming | Moyen |

```

---
## 12. Extension Potentielle (Idées Futures)
- Liaison FR ↔ EN (clé `translationOf`)
- Génération RSS/Atom
- Sitemap dynamique
- Comptage de vues (pageviews)
- Champ `category` hiérarchique

---
## 13. FAQ Rapide
| Question | Réponse |
|----------|---------|
| Pas d’article sur la page d’accueil ? | Vérifier `lang` et `draft`. `getRecentPosts` a un fallback. |
| Styles de code non appliqués ? | Vérifier que le bloc est bien en fenced code avec une langue. |
| Table non rendue ? | Confirmer l’usage de la syntaxe GFM + pas d’espace superflu autour des pipes. |

---
Bonne rédaction !

---
## 14. SEO (Référencement)

### 14.1 Métadonnées Clés
- `title` (60–65 caractères max recommandé)
- `summary` (sert de meta description – viser 140–160 caractères)
- `canonicalUrl` (ajouter si contenu syndiqué ailleurs / Medium / Dev.to)
- `images[0]` ou `cover` → image Open Graph (taille idéale 1200×630)
- `date` + `lastmod` → peuvent alimenter les données structurées

### 14.2 Bonnes Pratiques Contenu
- Un seul objectif par article, mot-clé principal présent dans : titre, 1er paragraphe, 1–2 sous‑titres, alt d’une image si pertinent.
- Hiérarchie des headings propre (pas de saut H2 → H4 direct) pour un TOC clair et crawl optimal.
- Paragraphes courts (2–4 lignes) + listes pour lisibilité.
- Ajoutez des liens internes (vers autres articles / projets) + éventuellement 1–2 liens externes de qualité.
- Évitez le contenu dupliqué entre versions FR/EN : différencier légèrement si nécessaire.

### 14.3 Images
- Nom de fichier descriptif (`optimiser-nextjs-cache.png`).
- Attribut alt toujours renseigné (décrit le rôle, pas juste répéter le titre).
- Utiliser formats modernes (WebP) si possible.

### 14.4 Données Structurées (Optionnel)
Vous pouvez injecter un bloc JSON-LD dans un article MDX :
```mdx
<script type="application/ld+json">{JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: 'Optimiser les performances Next.js',
	datePublished: '2025-02-10',
	dateModified: '2025-02-12',
	inLanguage: 'fr',
	author: { '@type': 'Person', name: 'Samuel SIKATI' },
	image: ['https://samuelsikati.com/images/blog/posts/optimiser-nextjs/cover.png'],
	description: 'Stratégies concrètes pour améliorer les temps de rendu et le TTFB dans Next.js.'
})}</script>
```

### 14.5 Champs Additionnels Futurs (Idées)
- `translationOf`: relier FR ↔ EN pour canonical croisé.
- `series`: regrouper des articles thématiques.
- `category`: taxonomie de haut niveau.

---
## 15. Flux RSS / Atom

### 15.1 Pourquoi
Permet aux lecteurs / agrégateurs (Feedly, Mailbrew, etc.) de suivre automatiquement les nouveaux articles.

### 15.2 End-point Recommandé
Créer un route handler : `src/app/feed.xml/route.js` (ou `rss.xml`). Exemple minimal :
```js
// src/app/feed.xml/route.js
import { getAllPosts } from '@/lib/content-blog';

export async function GET() {
	const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://samuelsikati.com';
	const posts = getAllPosts().slice(0, 30);
	const items = posts
		.map(
			(p) => `\n  <item>\n    <title><![CDATA[${p.title}]]></title>\n    <link>${site}/blog/${p.slug}</link>\n    <guid>${site}/blog/${p.slug}</guid>\n    <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n    <description><![CDATA[${p.summary || p.excerpt}]]></description>\n  </item>`
		)
		.join('');

	const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss version=\"2.0\">\n<channel>\n  <title>Samuel Sikati – Blog</title>\n  <link>${site}/blog</link>\n  <description>Articles techniques & tutoriels</description>${items}\n</channel>\n</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=UTF-8',
			'Cache-Control': 's-maxage=3600, stale-while-revalidate',
		},
	});
}
```

### 15.3 Ajouts Possibles

- Ajouter `<language>fr-fr</language>` / locale dynamique.
- Générer un flux par langue : `/en/feed.xml` en filtrant `lang`.
- Ajouter `content:encoded` pour le HTML complet (nécessite rendu MDX → HTML côté build).

### 15.4 Publication & Découverte

Dans `<head>` global (layout) :

```html
<link rel="alternate" type="application/rss+xml" title="Flux RSS" href="/feed.xml" />
```

### 15.5 Validation

Utiliser un validateur RSS (W3C Feed Validation) après mise en place.

---

## 16. Checklist SEO Rapide

- [ ] Titre unique & descriptif
- [ ] Summary orienté intention de recherche
- [ ] Alt images pertinents
- [ ] Liens internes ajoutés
- [ ] Tags cohérents (eviter doublons casse)
- [ ] Image OG 1200x630 disponible
- [ ] Canonical défini si duplication externe
- [ ] Données structurées optionnelles valides

---
