# Section Projets - Documentation

## Vue d'ensemble

La section projets du portfolio permet de présenter les réalisations techniques de manière interactive et professionnelle, avec un design moderne basé sur shadcn/ui.

## Architecture

### Structure des fichiers

```
src/
├── app/
│   ├── projects/
│   │   └── page.js              # Page projets FR
│   └── en/projects/
│       └── page.js              # Page projets EN
├── components/projects/
│   ├── ProjectCard.jsx          # Carte projet individuelle
│   ├── ProjectModal.jsx         # Modal détaillée
│   ├── ProjectFilter.jsx        # Système de filtrage
│   ├── ProjectsGrid.jsx         # Grille avec filtres
│   ├── FeaturedProjects.jsx     # Projets vedettes (Home)
│   └── TechnologyBadge.jsx      # Badge technologie coloré
├── lib/
│   ├── content.js               # Chargement données projets
│   └── markdown.js              # Parsing Markdown
└── data/
    └── technologies.json         # Configuration technologies
```

### Données des projets

Les projets sont stockés dans `content/projects/` au format Markdown avec front matter :

```markdown
---
title: "Nom du projet"
slug: "slug-projet"
summary: "Résumé court"
technologies: ["React", "Next.js", "TypeScript"]
role: "Développeur Full Stack"
status: "completed" | "in-progress" | "planned"
featured: true | false
date: "2025-08-15"
cover: "/images/projects/cover.jpg"
demo: "https://demo.example.com"
repo: "https://github.com/user/repo"
---

# Contenu détaillé du projet
```

## Composants

### ProjectCard
- **Rôle** : Affichage compact d'un projet
- **Fonctionnalités** :
  - Image de couverture avec overlay de statut
  - Badge "Vedette" pour les projets mis en avant
  - Technologies avec badges colorés
  - Liens vers démo et code source
  - Bouton pour ouvrir la modal détaillée

### ProjectModal
- **Rôle** : Vue détaillée d'un projet
- **Fonctionnalités** :
  - Contenu Markdown rendu
  - Technologies avec badges colorés
  - Liens d'action (démo, code)
  - Design responsive

### ProjectFilter
- **Rôle** : Filtrage des projets
- **Fonctionnalités** :
  - Filtre par technologie
  - Filtre par statut
  - Affichage des filtres actifs
  - Bouton de réinitialisation

### TechnologyBadge
- **Rôle** : Badge coloré pour les technologies
- **Fonctionnalités** :
  - Couleurs prédéfinies par technologie
  - Fallback pour technologies non configurées
  - Tailles personnalisables

## Fonctionnalités

### Filtrage
- **Par technologie** : Filtre les projets utilisant une technologie spécifique
- **Par statut** : Terminé, En cours, Planifié
- **Combinable** : Plusieurs filtres simultanés
- **Réactif** : Mise à jour en temps réel

### Responsive Design
- **Mobile** : 1 colonne
- **Tablet** : 2 colonnes
- **Desktop** : 3 colonnes
- **Modal** : Adaptative selon la taille d'écran

### SEO
- **Métadonnées** : Titre et description uniques par page
- **Hreflang** : Support FR/EN
- **Open Graph** : Images et descriptions optimisées
- **Structured Data** : Prêt pour l'implémentation

### Performance
- **Images** : Optimisées avec `next/image`
- **Lazy Loading** : Chargement différé des modals
- **Code Splitting** : Composants chargés à la demande

## Utilisation

### Ajouter un nouveau projet

1. Créer un fichier `content/projects/nom-projet.md`
2. Remplir le front matter selon le schéma
3. Ajouter le contenu Markdown
4. Ajouter l'image de couverture dans `public/images/projects/`

### Modifier les technologies

Éditer `src/data/technologies.json` pour :
- Ajouter de nouvelles technologies
- Modifier les couleurs
- Ajouter des descriptions

### Personnaliser l'affichage

- **Couleurs** : Modifier `technologies.json`
- **Layout** : Ajuster les classes Tailwind
- **Contenu** : Modifier les templates de composants

## Internationalisation

### Français (FR)
- Route : `/projects`
- Fichier de données : `src/data/i18n/fr.json`
- Labels : "Projets", "Technologies", "Voir détails"

### Anglais (EN)
- Route : `/en/projects`
- Fichier de données : `src/data/i18n/en.json`
- Labels : "Projects", "Technologies", "View Details"

## Accessibilité

- **Navigation clavier** : Tous les éléments interactifs accessibles
- **Contraste** : Couleurs conformes WCAG AA
- **Screen readers** : Labels et descriptions appropriés
- **Focus visible** : Indicateurs de focus clairs

## Tests

### Tests manuels recommandés
1. **Filtrage** : Tester tous les filtres et combinaisons
2. **Responsive** : Vérifier sur mobile, tablet, desktop
3. **Modal** : Ouverture/fermeture, contenu, liens
4. **Navigation** : Liens internes et externes
5. **Performance** : Temps de chargement, images

### Tests automatisés
- **Unit** : Composants individuels
- **Integration** : Flux de filtrage
- **E2E** : Parcours utilisateur complet

## Maintenance

### Ajouts fréquents
- Nouveaux projets
- Mises à jour de statut
- Nouvelles technologies

### Optimisations
- Images : Conversion WebP/AVIF
- Bundle : Analyse de taille
- Performance : Lighthouse CI

Cette section projets offre une expérience utilisateur moderne et professionnelle pour présenter les réalisations techniques du portfolio.
