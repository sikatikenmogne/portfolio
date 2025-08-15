# Décisions Architecturales Consolidées (ADRs)
## Portfolio Développeur Full Stack

---

### **ADR-001 : Style Architectural Principal - Architecture en Couches**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Besoin d'une architecture logique claire pour un portfolio web avec contraintes de simplicité (développeur débutant) tout en maintenant l'évolutivité et la maintenabilité. Le système doit gérer présentation, logique métier, services et données de manière structurée.

#### **Décision**
Adopter une **Architecture en Couches (Layered Architecture)** avec 4 couches distinctes :
- Couche Présentation (React Components)
- Couche Logique Métier (Business Logic)
- Couche Services (Services transversaux)
- Couche Données (Static Files)

#### **Alternatives Considérées**
- **MVC (Model-View-Controller)** : Trop complexe pour un site statique
- **Clean Architecture** : Over-engineering pour le contexte
- **Architecture Hexagonale** : Complexité excessive pour MVP
- **Composants plats** : Manque de structure pour évolution

#### **Justification**
- Séparation claire des responsabilités
- Facilite la compréhension pour développeur junior
- Permet l'évolution indépendante des couches
- Testabilité améliorée
- Pattern bien documenté et éprouvé

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Structure claire et prévisible | Légère complexité initiale vs approche plate |
| Maintenance facilitée | Risque de couches trop rigides |
| Réutilisabilité des composants | |
| Évolutivité maîtrisée | |

---

### **ADR-002 : Style Architectural Complémentaire - Architecture Modulaire**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Nécessité d'organiser le code par domaines métier (portfolio, blog, contact) pour faciliter la maintenance et permettre le développement incrémental avec possibilité d'équipe élargie future.

#### **Décision**
Implémenter une **Architecture Modulaire par Domaines** avec :
- Modules métier indépendants (portfolio, blog, contact)
- Modules partagés (shared components, utilities)
- Module core (configuration, infrastructure)

#### **Alternatives Considérées**
- **Feature-First Organization** : Moins évolutif
- **Technology-First Organization** : Couplage fort
- **Monolithe simple** : Manque de scalabilité

#### **Justification**
- Isolation des domaines métier
- Réutilisabilité maximisée
- Facilite le travail en équipe
- Évolution indépendante des modules
- Cohérence avec les user stories par Epic

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Code organisé et prévisible | Structure initiale plus complexe |
| Développement parallèle possible | Risque de sur-modularisation |
| Tests isolés par domaine | |
| Déploiement incrémental facilité | |

---

### **ADR-003 : Framework Frontend - Next.js**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Besoin d'un framework frontend performant, SEO-friendly, avec courbe d'apprentissage accessible pour développeur React débutant. Contraintes de performance et référencement critiques.

#### **Décision**
Utiliser **Next.js 14+** comme framework frontend principal avec TypeScript.

#### **Alternatives Considérées**
- **Gatsby** : Complexité GraphQL non nécessaire
- **Nuxt.js** : Écosystème Vue moins familier
- **React + Vite** : Pas de SSG natif
- **HTML/CSS/JS Vanilla** : Manque de structure pour évolution

#### **Justification**
- Static Site Generation (SSG) natif
- Optimisations performance intégrées
- Écosystème React mature
- Documentation excellente
- Déploiement simplifié
- SEO optimisé par défaut

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Performance exceptionnelle (SSG) | Vendor lock-in relatif |
| SEO natif optimisé | Complexité supérieure vs HTML pur |
| Developer Experience excellente | |
| Écosystème riche | |
| Courbe d'apprentissage progressive | |

---

### **ADR-004 : Stratégie de Déploiement - JAMstack**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Contrainte budgétaire forte (solutions gratuites privilégiées) avec exigences de performance, sécurité et disponibilité élevées. Besoin de déploiement simple pour développeur débutant.

#### **Décision**
Adopter l'approche **JAMstack** (JavaScript, APIs, Markup) avec génération statique et CDN global.

#### **Alternatives Considérées**
- **Hébergement traditionnel (LAMP)** : Coûts et maintenance
- **Serveur VPS** : Complexité infrastructure
- **Platform-as-a-Service** : Coûts récurrents
- **Serveur Node.js** : Complexité déploiement

#### **Justification**
- Hébergement gratuit possible
- Performance exceptionnelle (CDN)
- Sécurité renforcée (pas de serveur)
- Scalabilité automatique
- Maintenance minimale

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Coût zéro pour démarrer | Limitations fonctionnalités dynamiques |
| Performance maximale | Dépendance aux services externes |
| Sécurité élevée | |
| Maintenance réduite | |
| Déploiement automatisé | |

---

### **ADR-005 : Plateforme d'Hébergement - Vercel**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Besoin d'une plateforme d'hébergement gratuite, performante, avec déploiement automatisé et CDN global. Intégration native avec Next.js souhaitée.

#### **Décision**
Utiliser **Vercel** comme plateforme d'hébergement principale avec **GitHub Pages** en backup.

#### **Alternatives Considérées**
- **Netlify** : Fonctionnalités similaires, moins intégré Next.js
- **GitHub Pages** : Limitations fonctionnalités
- **Surge.sh** : Moins de fonctionnalités
- **Firebase Hosting** : Écosystème Google plus lourd

#### **Justification**
- Intégration native Next.js
- Déploiement automatique Git
- CDN global Edge Network
- HTTPS automatique
- Analytics inclus
- Generous free tier

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Déploiement zero-config | Vendor lock-in partiel |
| Performance globale optimale | Limitations free tier futures possibles |
| Monitoring inclus | |
| Évolution possible vers plans payants | |

---

### **ADR-006 : Gestion de Contenu - Git-based CMS**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Besoin de gérer le contenu (projets, expériences, articles) de manière simple et gratuite. Contrôle version nécessaire. Éviter les dépendances externes complexes.

#### **Décision**
Utiliser **Markdown + Front Matter** avec Git comme système de gestion de contenu.

#### **Alternatives Considérées**
- **Headless CMS (Strapi, Contentful)** : Complexité et/ou coûts
- **Base de données traditionnelle** : Infrastructure supplémentaire
- **CMS WordPress** : Over-engineering, sécurité
- **Notion API** : Dépendance externe forte

#### **Justification**
- Solution gratuite et pérenne
- Contrôle version natif (Git)
- Simplicité d'utilisation
- Portabilité maximale
- Pas de dépendance externe
- Performance optimale (static)

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Coût zéro permanent | Interface d'administration manuelle |
| Contrôle total des données | Courbe d'apprentissage Markdown |
| Performance optimale | |
| Migration simple | |
| Workflow développeur natif | |

---

### **ADR-007 : Gestion des Formulaires - Service Externe**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Nécessité de traiter les formulaires de contact dans un environnement statique sans backend. Contrainte de gratuité et simplicité d'intégration.

#### **Décision**
Utiliser **Formspree** comme service de traitement des formulaires avec **EmailJS** en alternative.

#### **Alternatives Considérées**
- **Backend custom** : Complexité infrastructure
- **Netlify Forms** : Vendor lock-in
- **Google Forms** : UX limitée
- **Serverless Functions** : Complexité développement

#### **Justification**
- Intégration simple (HTML form)
- Plan gratuit généreux
- Anti-spam intégré
- Notifications email automatiques
- Pas de code backend nécessaire

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Implémentation rapide | Dépendance service externe |
| Maintenance zéro | Limitations plan gratuit |
| Anti-spam inclus | |
| Analytics formulaires | |

---

### **ADR-008 : Stratégie SEO - Multi-langue**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Objectif d'acquisition de clients locaux (francophone) et internationaux (anglophone). Nécessité d'optimiser le référencement sur les deux marchés.

#### **Décision**
Implémenter une **stratégie SEO multi-langue** avec pages françaises et anglaises, optimisées par marché géographique.

#### **Alternatives Considérées**
- **Anglais uniquement** : Perte marché local
- **Français uniquement** : Limitation marché international  
- **Auto-traduction** : Qualité insuffisante
- **Site séparé par langue** : Maintenance double

#### **Justification**
- Ciblage marché local Cameroun (français)
- Ouverture marché international (anglais)
- SEO optimisé par langue/région
- Expérience utilisateur native

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Double marché adressé | Maintenance contenu double |
| SEO local et international | Complexité routing initiale |
| Crédibilité renforcée | |
| Compétitivité accrue | |

---

### **ADR-009 : Stratégie de Monitoring - Gratuit avec Evolution**
**Date :** 05 Août 2025  
**Statut :** Acceptée

#### **Contexte**
Besoin de surveiller les performances, le trafic et la disponibilité du site pour optimiser l'acquisition client. Contrainte budgétaire initiale forte.

#### **Décision**
Utiliser **Google Analytics 4** + **Vercel Analytics** + **Uptime Robot** (gratuit) avec migration progressive vers outils premium selon ROI.

#### **Alternatives Considérées**
- **Solutions premium d'emblée** : Coût prohibitif
- **Aucun monitoring** : Optimisation impossible
- **Analytics uniquement** : Vision partielle
- **Self-hosted** : Complexité technique

#### **Justification**
- Solutions gratuites performantes disponibles
- Données essentielles couvertes
- Évolution possible selon budget
- Conformité RGPD possible

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Visibilité performance immédiate | Fonctionnalités limitées initialement |
| Optimisation data-driven possible | Multiple outils à configurer |
| Coût contrôlé | |
| Évolution progressive | |

---

### **ADR-010 : Stratégie de Tests - Pragmatique**
**Date :** 05 Août 2025  
**Statut :** ✅ Acceptée

#### **Contexte**
Besoin d'assurer la qualité du code et des fonctionnalités avec des ressources limitées (développeur solo débutant). Équilibre entre qualité et vélocité nécessaire.

#### **Décision**
Adopter une **approche de tests pragmatique** : Tests unitaires pour la logique métier critique + Tests E2E pour les parcours utilisateur principaux + Validation manuelle.

#### **Alternatives Considérées**
- **TDD complet** : Ralentissement développement
- **Aucun test automatisé** : Risque qualité
- **Tests tous niveaux** : Over-engineering
- **Tests unitaires uniquement** : Couverture insuffisante

#### **Justification**
- Couverture essentielle assurée
- Temps développement optimisé  
- Apprentissage progressif des tests
- Qualité/vélocité équilibrée

#### **Conséquences**

| Positives | Négatives |
|-----------|-----------|
| Qualité de base assurée | Couverture non exhaustive |
| Refactoring sécurisé | Tests manuels requis |
| Apprentissage progressif | |
| Vélocité préservée | |

---

### **ADR-011 : Langage Frontend - JavaScript au lieu de TypeScript**
**Date :** 13 août 2025  
**Statut :** Acceptée

#### **Contexte**
Le projet initial prévoyait l’utilisation de TypeScript avec Next.js pour bénéficier du typage statique et de la robustesse. Cependant, des contraintes de performance, de simplicité et de rapidité de développement ont été identifiées, notamment pour un développeur débutant et un MVP à livrer rapidement.

#### **Décision**
Utiliser **JavaScript** (ES2020+) comme langage principal pour le frontend au lieu de TypeScript.

#### **Alternatives Considérées**
- **TypeScript** : Typage statique, meilleure maintenabilité, mais configuration et compilation plus lourdes.
- **CoffeeScript/Babel** : Complexité et écosystème moins courant.
- **JavaScript Vanilla** : Simplicité maximale, support natif Next.js.

#### **Justification**
- Démarrage plus rapide et configuration simplifiée
- Compilation plus légère, build plus rapide
- Réduction du temps d’apprentissage et de la complexité pour le développeur
- Moins de friction pour l’intégration de librairies externes
- Optimisation des performances pour le MVP

#### **Conséquences**

| Positives                                   | Négatives                        |
|---------------------------------------------|----------------------------------|
| Build plus rapide, moins de configuration   | Moins de sécurité sur le typage  |
| Courbe d’apprentissage plus douce           | Risque d’erreurs runtime         |
| Simplicité pour un développeur débutant     | Maintenabilité réduite           |
| Intégration facilitée avec Next.js          | Documentation moins stricte      |
| MVP livré plus rapidement                   |                                 |

---

## Résumé des Décisions

| ADR | Décision | Impact | Risque |
|-----|----------|--------|--------|
| 001 | Architecture en Couches | Structure | Moyen |
| 002 | Architecture Modulaire | Organisation | Moyen |
| 003 | Next.js Framework | Performance | Moyen |
| 004 | JAMstack Deployment | Coût | Moyen |
| 005 | Vercel Hosting | Simplicité | Moyen |
| 006 | Git-based CMS | Contrôle | Moyen |
| 007 | Formspree Forms | Simplicité | Moyen |
| 008 | SEO Multi-langue | Marché | Élevé |
| 009 | Monitoring Gratuit | Visibilité | Moyen |
| 010 | Tests Pragmatiques | Équilibre | Élevé |
| 011 | JavaScript en FrontEnd | Équilibre | Moyen |

**Légende Risques :** Faible | Moyen | Élevé | Critique
