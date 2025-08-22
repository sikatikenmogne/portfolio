# Dossier d'Architecture Logicielle
## Portfolio Développeur Full Stack

---

## Table des Matières
1. [Vue d'ensemble du Système](#1-vue-densemble-du-système)
2. [Analyse des Exigences](#2-analyse-des-exigences)
3. [Décisions Architecturales](#3-décisions-architecturales)
4. [Architecture Logique](#4-architecture-logique)
5. [Architecture Physique](#5-architecture-physique)
6. [Plan de Développement](#6-plan-de-développement)

---

## 1. Vue d'ensemble du Système

### 1.1 Objectif du Système
Créer un portfolio web personnel pour présenter les compétences, projets et services d'un développeur full stack, optimisé pour l'acquisition de clients locaux et internationaux.

### 1.2 Parties Prenantes
- **Propriétaire** : Développeur full stack 
- **Utilisateurs Primaires** : Recruteurs, clients potentiels, leads techniques
- **Utilisateurs Secondaires** : Pairs développeurs, entrepreneurs

### 1.3 Contraintes Principales
- Budget minimal (solutions gratuites privilégiées)
- Développeur débutant (simplicité architecturale)
- Performance et SEO critiques
- Maintenance long terme

---

## 2. Analyse des Exigences

### 2.1 Exigences Fonctionnelles (RF)

| ID | Exigence | Priorité | Source User Story |
|----|----------|----------|-------------------|
| RF-001 | Présentation du profil professionnel | Critique | US-001, US-008 |
| RF-002 | Catalogue de projets avec détails | Critique | US-004, US-005 |
| RF-003 | Formulaire de contact fonctionnel | Critique | US-014 |
| RF-004 | Navigation responsive multi-device | Critique | US-002, US-017 |
| RF-005 | Téléchargement CV PDF | Élevée | US-016 |
| RF-006 | Intégration réseaux sociaux | Élevée | US-015 |
| RF-007 | Blog technique (phase 2) | Moyenne | US-011 |

### 2.2 Exigences Non-Fonctionnelles (RNF)

| ID | Exigence | Critère d'Acceptation |
|----|----------|----------------------|
| RNF-001 | Performance | Temps de chargement < 2s, Score Lighthouse > 90 |
| RNF-002 | SEO | Meta tags optimisés, sitemap, URLs sémantiques |
| RNF-003 | Disponibilité | Uptime > 99%, hébergement fiable |
| RNF-004 | Extensibilité | Architecture modulaire, ajout facile de fonctionnalités |
| RNF-005 | Maintenabilité | Code documenté, structure claire, technologies stables |
| RNF-006 | Accessibilité | WCAG 2.1 niveau AA, navigation clavier |
| RNF-007 | Sécurité | HTTPS obligatoire, validation inputs, protection SPAM |
