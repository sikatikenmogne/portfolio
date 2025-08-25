# User Stories - Portfolio

## Personas et Contexte

### Personas Identifiés

**Recruteur/RH (Persona Principal)**
- Recherche rapide d'informations clés
- Évaluation des compétences techniques
- Vérification de l'expérience professionnelle

**Développeur/Lead Tech (Persona Secondaire)**
- Évaluation technique approfondie
- Analyse de la qualité du code
- Recherche de collaborateurs potentiels

**Client/Entrepreneur (Persona Tertiaire)**
- Recherche de freelance/prestataire
- Évaluation des réalisations
- Prise de contact commercial

**Collègues/Pairs (Persona Quaternaire)**
- Networking professionnel
- Partage de connaissances
- Collaboration sur projets

## User Stories par Epic

## EPIC 1: Navigation et Découverte

### US-001: Première Impression
**En tant que** recruteur visitant le portfolio pour la première fois  

**Je veux** comprendre immédiatement qui est la personne et son profil (software engineer)  
**Afin de** décider rapidement si le profil correspond au poste  

**Critères d'acceptation:**
- [ ] Le nom et titre professionnel sont visibles dans les 3 secondes
- [ ] Une phrase d'accroche résume la proposition de valeur
- [ ] La photo professionnelle inspire confiance
- [ ] Un call to action incitant à télécharger le CV
- [ ] La liste des reseaux sociaux professionnel avec lies pour suivre
- [ ] Le temps de chargement initial < 2 secondes

**Points d'effort:** 5  
**Priorité:** Critique

---

### US-002: Navigation Intuitive
**En tant que** visiteur sur le site  
**Je veux** naviguer facilement entre les différentes sections  
**Afin de** trouver rapidement l'information recherchée  

**Critères d'acceptation:**
- [ ] Menu principal toujours accessible
- [ ] Navigation responsive sur mobile
- [ ] Indicateur de section active
- [ ] Retour à l'accueil possible depuis toute page
- [ ] Breadcrumbs sur les pages profondes

**Points d'effort:** 3  
**Priorité:** Élevée

---

### US-003: Recherche de Contenu
**En tant que** développeur intéressé par des sujets spécifiques  
**Je veux** rechercher du contenu par mots-clés ou technologies  
**Afin de** trouver des articles ou projets pertinents  

**Critères d'acceptation:**
- [ ] Barre de recherche visible et fonctionnelle
- [ ] Filtrage par technologie/catégorie
- [ ] Résultats de recherche pertinents
- [ ] Suggestions de recherche automatiques
- [ ] Historique de recherche local

**Points d'effort:** 8  
**Priorité:** Moyenne

## EPIC 2: Présentation des Projets

### US-004: Vue d'Ensemble des Projets
**En tant que** recruteur technique  
**Je veux** voir rapidement tous les projets réalisés  
**Afin d'** évaluer l'expérience et la diversité des compétences  

**Critères d'acceptation:**
- [ ] Grille de projets avec images représentatives
- [ ] Technologies utilisées visibles sur chaque projet
- [ ] Statut du projet (terminé, en cours, personnel, professionnel)
- [ ] Possibilité de filtrer par technologie/type
- [ ] Tri par date ou importance

**Points d'effort:** 5  
**Priorité:** Critique

---

### US-005: Détail d'un Projet
**En tant que** lead développeur  
**Je veux** voir les détails techniques d'un projet spécifique  
**Afin d'** évaluer la complexité et la qualité du travail  

**Critères d'acceptation:**
- [ ] Description détaillée du projet et contexte
- [ ] Architecture technique utilisée
- [ ] Défis rencontrés et solutions apportées
- [ ] Screenshots/démo interactive
- [ ] Liens vers code source et démo live
- [ ] Métriques de performance si pertinentes
- [ ] Durée du projet et équipe impliquée

**Points d'effort:** 8  
**Priorité:** Élevée

---

### US-006: Démonstration en Direct
**En tant que** client potentiel  
**Je veux** tester une démonstration live du projet  
**Afin de** voir concrètement le résultat final  

**Critères d'acceptation:**
- [ ] Liens vers démos fonctionnelles
- [ ] Indications claires sur l'utilisation
- [ ] Performances optimales des démos
- [ ] Fallback si démo indisponible
- [ ] Avertissement si démo en développement

**Points d'effort:** 3  
**Priorité:** Élevée

---

### US-007: Code Source Accessible
**En tant que** développeur pair  
**Je veux** consulter le code source des projets  
**Afin d'** évaluer la qualité du code et les bonnes pratiques  

**Critères d'acceptation:**
- [ ] Liens GitHub bien visibles
- [ ] README détaillé dans les repositories
- [ ] Code commenté et bien structuré
- [ ] Instructions d'installation claires
- [ ] Licence open source si applicable

**Points d'effort:** 2  
**Priorité:** Moyenne

## EPIC 3: Profil Personnel et Compétences

### US-008: Parcours Professionnel
**En tant que** recruteur  
**Je veux** consulter l'expérience professionnelle détaillée  
**Afin de** vérifier l'adéquation avec le poste proposé  

**Critères d'acceptation:**
- [ ] Timeline chronologique claire
- [ ] Entreprises, postes et durées
- [ ] Descriptions des responsabilités
- [ ] Technologies utilisées par expérience
- [ ] Réalisations quantifiées quand possible
- [ ] Formation et certifications

**Points d'effort:** 5  
**Priorité:** Critique

---

### US-009: Évaluation des Compétences
**En tant que** lead technique  
**Je veux** voir le niveau de maîtrise des différentes technologies  
**Afin de** déterminer l'autonomie sur les projets futurs  

**Critères d'acceptation:**
- [ ] Grille de compétences avec niveaux
- [ ] Catégorisation (frontend, backend, outils, etc.)
- [ ] Années d'expérience par technologie
- [ ] Projets utilisant chaque technologie
- [ ] Certifications associées si disponibles
- [ ] Visualisation graphique attractive

**Points d'effort:** 6  
**Priorité:** Élevée

---

### US-010: Personnalité et Culture
**En tant que** manager d'équipe  
**Je veux** découvrir la personnalité et les valeurs du candidat  
**Afin de** évaluer l'adéquation culturelle avec l'équipe  

**Critères d'acceptation:**
- [ ] Section "À propos" personnalisée
- [ ] Centres d'intérêt et hobbies
- [ ] Valeurs professionnelles
- [ ] Style de travail préféré
- [ ] Projets personnels et passions
- [ ] Photo décontractée en complément

**Points d'effort:** 4  
**Priorité:** Moyenne

## EPIC 4: Blog et Partage de Connaissances

### US-011: Articles Techniques
**En tant que** développeur cherchant des solutions  
**Je veux** lire des articles techniques détaillés  
**Afin d'** apprendre de nouvelles approches ou résoudre des problèmes  

**Critères d'acceptation:**
- [ ] Articles avec code syntax highlighting
- [ ] Exemples pratiques et reproductibles
- [ ] Catégorisation par sujet/technologie
- [ ] Temps de lecture estimé
- [ ] Date de publication et dernière mise à jour
- [ ] Commentaires ou discussions possibles

**Points d'effort:** 10  
**Priorité:** Moyenne

---

### US-012: Veille Technologique
**En tant que** pair développeur  
**Je veux** voir les dernières découvertes et opinions techniques  
**Afin de** rester informé des tendances et innovations  

**Critères d'acceptation:**
- [ ] Articles de veille et opinions
- [ ] Retours d'expérience sur nouvelles technologies
- [ ] Curation de ressources externes
- [ ] Newsletter ou flux RSS disponible
- [ ] Partage sur réseaux sociaux intégré

**Points d'effort:** 6  
**Priorité:** Faible

---

### US-013: Tutoriels et Guides
**En tant qu'** apprenant en développement  
**Je veux** suivre des tutoriels step-by-step  
**Afin d'** acquérir de nouvelles compétences pratiques  

**Critères d'acceptation:**
- [ ] Guides détaillés avec étapes numérotées
- [ ] Code complet téléchargeable
- [ ] Niveau de difficulté indiqué
- [ ] Prérequis clairement définis
- [ ] Résultat final démontré

**Points d'effort:** 12  
**Priorité:** Faible

## EPIC 5: Contact et Networking

### US-014: Prise de Contact Simple
**En tant que** recruteur intéressé  
**Je veux** contacter facilement le candidat  
**Afin de** proposer une opportunité ou planifier un entretien  

**Critères d'acceptation:**
- [ ] Formulaire de contact visible et fonctionnel
- [ ] Validation côté client des champs obligatoires
- [ ] Confirmation d'envoi du message
- [ ] Email professionnel visible
- [ ] Temps de réponse habituel indiqué
- [ ] Statut de disponibilité (disponible/en poste)

**Points d'effort:** 4  
**Priorité:** Critique

---

### US-015: Réseaux Sociaux Professionnels
**En tant que** professionnel du secteur  
**Je veux** me connecter sur les réseaux sociaux  
**Afin de** maintenir un contact et suivre l'actualité  

**Critères d'acceptation:**
- [ ] Liens LinkedIn, GitHub, Twitter visibles
- [ ] Ouverture dans nouvel onglet
- [ ] Profils à jour et professionnels
- [ ] Cohérence de personal branding
- [ ] Statistiques GitHub visibles (contributions)

**Points d'effort:** 2  
**Priorité:** Élevée

---

### US-016: Téléchargement de CV
**En tant que** recruteur  
**Je veux** télécharger le CV au format PDF  
**Afin de** le partager en interne ou l'archiver  

**Critères d'acceptation:**
- [ ] Bouton téléchargement CV visible
- [ ] PDF optimisé pour impression
- [ ] CV à jour avec informations du portfolio
- [ ] Version française et anglaise si pertinent
- [ ] Nom de fichier professionnel

**Points d'effort:** 3  
**Priorité:** Élevée

## EPIC 6: Expérience Utilisateur

### US-017: Expérience Mobile Optimale
**En tant que** visiteur sur mobile  
**Je veux** naviguer confortablement sur tous les écrans  
**Afin d'** accéder à l'information même en mobilité  

**Critères d'acceptation:**
- [ ] Design 100% responsive
- [ ] Navigation tactile optimisée
- [ ] Temps de chargement < 3s sur 3G
- [ ] Texte lisible sans zoom
- [ ] Boutons suffisamment grands pour le tactile
- [ ] Images adaptées à la résolution

**Points d'effort:** 8  
**Priorité:** Critique

---

### US-018: Thème Sombre/Clair
**En tant que** utilisateur sensible à la lumière  
**Je veux** choisir entre thème sombre et clair  
**Afin de** préserver mon confort visuel  

**Critères d'acceptation:**
- [ ] Toggle thème accessible facilement
- [ ] Préférence sauvegardée localement
- [ ] Détection automatique préférence système
- [ ] Transition fluide entre thèmes
- [ ] Lisibilité maintenue dans les deux modes
- [ ] Images/logos adaptés au thème

**Points d'effort:** 6  
**Priorité:** Moyenne

---

### US-019: Performance et Vitesse
**En tant que** visiteur impatient  
**Je veux** accéder rapidement au contenu  
**Afin de** ne pas abandonner ma visite  

**Critères d'acceptation:**
- [ ] Score Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images lazy-loadées et optimisées
- [ ] Code splitting pour réduire les bundles

**Points d'effort:** 10  
**Priorité:** Élevée

---

### US-020: Accessibilité Universelle
**En tant que** personne en situation de handicap  
**Je veux** naviguer le site avec des technologies d'assistance  
**Afin d'** accéder à l'information de manière autonome  

**Critères d'acceptation:**
- [ ] Navigation complète au clavier
- [ ] Lecteurs d'écran compatibles (ARIA)
- [ ] Contraste suffisant (WCAG AA)
- [ ] Textes alternatifs sur toutes les images
- [ ] Focus visible et logique
- [ ] Pas d'animations déclenchant l'épilepsie

**Points d'effort:** 8  
**Priorité:** Élevée

## EPIC 7: SEO et Visibilité

### US-021: Référencement Naturel
**En tant que** recruteur recherchant des profils  
**Je veux** trouver le portfolio via les moteurs de recherche  
**Afin de** découvrir des candidats pertinents  

**Critères d'acceptation:**
- [ ] Métadonnées complètes et optimisées
- [ ] Structure HTML sémantique
- [ ] Sitemap XML généré automatiquement
- [ ] URLs propres et descriptives
- [ ] Temps de chargement optimisé
- [ ] Contenu unique et de qualité

**Points d'effort:** 6  
**Priorité:** Moyenne

---

### US-022: Partage sur Réseaux Sociaux
**En tant que** contact professionnel  
**Je veux** partager facilement le portfolio  
**Afin de** recommander le profil à mon réseau  

**Critères d'acceptation:**
- [ ] Meta tags Open Graph configurés
- [ ] Image de prévisualisation attractive
- [ ] Titre et description optimisés pour partage
- [ ] Boutons de partage sur articles de blog
- [ ] URLs canoniques pour éviter duplications

**Points d'effort:** 4  
**Priorité:** Faible

## EPIC 8: Analytics et Amélioration

### US-023: Suivi des Performances
**En tant que** propriétaire du portfolio  
**Je veux** analyser le comportement des visiteurs  
**Afin d'** optimiser le contenu et l'expérience  

**Critères d'acceptation:**
- [ ] Google Analytics intégré et configuré
- [ ] Suivi des conversions (téléchargements CV, contacts)
- [ ] Heatmaps sur les pages principales
- [ ] Métriques de performance en temps réel
- [ ] Rapports automatisés mensuels
- [ ] Respect du RGPD pour les données

**Points d'effort:** 5  
**Priorité:** Faible

---

### US-024: Tests A/B
**En tant que** propriétaire du portfolio  
**Je veux** tester différentes versions de contenu  
**Afin d'** optimiser le taux de conversion  

**Critères d'acceptation:**
- [ ] Framework de tests A/B intégré
- [ ] Tests sur CTA, titres, dispositions
- [ ] Métriques de conversion mesurées
- [ ] Implémentation des versions gagnantes
- [ ] Historique des tests et résultats

**Points d'effort:** 8  
**Priorité:** Très faible

## Priorisation et Planification

### Sprint 1 - MVP (Stories Critiques)
- US-001: Première Impression
- US-004: Vue d'Ensemble des Projets  
- US-008: Parcours Professionnel
- US-014: Prise de Contact Simple
- US-017: Expérience Mobile Optimale

**Total Points d'Effort:** 22 points

### Sprint 2 - Fonctionnalités Core (Priorité Élevée)
- US-002: Navigation Intuitive
- US-005: Détail d'un Projet
- US-006: Démonstration en Direct
- US-009: Évaluation des Compétences
- US-015: Réseaux Sociaux Professionnels
- US-016: Téléchargement de CV
- US-019: Performance et Vitesse
- US-020: Accessibilité Universelle

**Total Points d'Effort:** 39 points

### Sprint 3 - Améliorations (Priorité Moyenne)  
- US-003: Recherche de Contenu
- US-007: Code Source Accessible
- US-010: Personnalité et Culture
- US-011: Articles Techniques
- US-018: Thème Sombre/Clair
- US-021: Référencement Naturel

**Total Points d'Effort:** 31 points

### Sprint 4+ - Features Avancées (Priorité Faible)
- US-012: Veille Technologique
- US-013: Tutoriels et Guides
- US-022: Partage sur Réseaux Sociaux
- US-023: Suivi des Performances
- US-024: Tests A/B

**Total Points d'Effort:** 35 points

## Tableaux récapitulatifs

### Tableau récapitulatif des Sprints

| Sprint      | User Stories incluses                                                                                                   | Epics Principaux (synthèse)                                   | Total Points d'Effort |
|-------------|------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|-----------------------|
| Sprint 1    | US-001, US-004, US-008, US-014, US-017                                                                                 | Navigation, Projets, Profil, Contact, Expérience Utilisateur   | 22                    |
| Sprint 2    | US-002, US-005, US-006, US-009, US-015, US-016, US-019, US-020                                                        | Navigation, Projets, Profil, Contact, Expérience Utilisateur, SEO | 39                    |
| Sprint 3    | US-003, US-007, US-010, US-011, US-018, US-021                                                                         | Navigation, Projets, Profil, Blog, Expérience Utilisateur, SEO | 31                    |
| Sprint 4+   | US-012, US-013, US-022, US-023, US-024                                                                                 | Blog, SEO, Analytics                                          | 35                    |
| Total       |                                                                                                                        |                                                               | 127                   |
### Tableau récapitulatif des User Stories

| ID      | Titre                                 | Epic                               | Points | Priorité   |
|---------|---------------------------------------|------------------------------------|--------|------------|
| US-001  | Première Impression                   | Navigation et Découverte           | 5      | Critique   |
| US-002  | Navigation Intuitive                  | Navigation et Découverte           | 3      | Élevée     |
| US-003  | Recherche de Contenu                  | Navigation et Découverte           | 8      | Moyenne    |
| US-004  | Vue d'Ensemble des Projets            | Présentation des Projets           | 5      | Critique   |
| US-005  | Détail d'un Projet                    | Présentation des Projets           | 8      | Élevée     |
| US-006  | Démonstration en Direct               | Présentation des Projets           | 3      | Élevée     |
| US-007  | Code Source Accessible                | Présentation des Projets           | 2      | Moyenne    |
| US-008  | Parcours Professionnel                | Profil Personnel et Compétences    | 5      | Critique   |
| US-009  | Évaluation des Compétences            | Profil Personnel et Compétences    | 6      | Élevée     |
| US-010  | Personnalité et Culture               | Profil Personnel et Compétences    | 4      | Moyenne    |
| US-011  | Articles Techniques                   | Blog et Partage de Connaissances   | 10     | Moyenne    |
| US-012  | Veille Technologique                  | Blog et Partage de Connaissances   | 6      | Faible     |
| US-013  | Tutoriels et Guides                   | Blog et Partage de Connaissances   | 12     | Faible     |
| US-014  | Prise de Contact Simple               | Contact et Networking              | 4      | Critique   |
| US-015  | Réseaux Sociaux Professionnels        | Contact et Networking              | 2      | Élevée     |
| US-016  | Téléchargement de CV                  | Contact et Networking              | 3      | Élevée     |
| US-017  | Expérience Mobile Optimale            | Expérience Utilisateur             | 8      | Critique   |
| US-018  | Thème Sombre/Clair                    | Expérience Utilisateur             | 6      | Moyenne    |
| US-019  | Performance et Vitesse                | Expérience Utilisateur             | 10     | Élevée     |
| US-020  | Accessibilité Universelle             | Expérience Utilisateur             | 8      | Élevée     |
| US-021  | Référencement Naturel                 | SEO et Visibilité                  | 6      | Moyenne    |
| US-022  | Partage sur Réseaux Sociaux           | SEO et Visibilité                  | 4      | Faible     |
| US-023  | Suivi des Performances                | Analytics et Amélioration          | 5      | Faible     |
| US-024  | Tests A/B                             | Analytics et Amélioration          | 8      | Très faible|

### Tableau récapitulatif des Epics

| Epic N° | Titre Epic                        | User Stories associées         |
|---------|-----------------------------------|-------------------------------|
| 1       | Navigation et Découverte          | US-001, US-002, US-003        |
| 2       | Présentation des Projets          | US-004, US-005, US-006, US-007|
| 3       | Profil Personnel et Compétences   | US-008, US-009, US-010        |
| 4       | Blog et Partage de Connaissances  | US-011, US-012, US-013        |
| 5       | Contact et Networking             | US-014, US-015, US-016        |
| 6       | Expérience Utilisateur            | US-017, US-018, US-019, US-020|
| 7       | SEO et Visibilité                 | US-021, US-022                |
| 8       | Analytics et Amélioration         | US-023, US-024                |

## Definition of Done (DoD)

**Critères généraux pour toutes les User Stories:**
- [ ] Fonctionnalité développée et testée
- [ ] Tests unitaires écrits et passants
- [ ] Design responsive validé sur 3 breakpoints
- [ ] Accessibilité validée (contraste, navigation clavier)
- [ ] Performance vérifiée (temps de chargement)
- [ ] Code reviewé et mergé
- [ ] Documentation mise à jour
- [ ] Déployé
