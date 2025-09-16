<div align="center">

# Portfolio

![Build](https://img.shields.io/github/actions/workflow/status/sikatikenmogne/portfolio/ci-cd.yml?branch=main&style=for-the-badge&logo=github) ![Vercel](https://img.shields.io/badge/Vercel-Production-brightgreen?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-15.0-000?style=for-the-badge&logo=next.js&logoColor=white)  ![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg?style=for-the-badge) ![Development Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge) ![Maintenance](https://img.shields.io/badge/Maintained-Yes-green.svg?style=for-the-badge)

A modern professional developer portfolio Built with **Next.js** following a **JAMstack architecture**, leveraging **static site generation** for optimal performance and deployed automatically on **Vercel**.

</div>

## ✨ Features

- Professional first impression with clear value proposition
- Comprehensive project showcase with detailed case studies
- Professional background and skills evaluation system
- Responsive mobile-optimized experience across all devices
- Simple contact system with professional networking links

## 🛠️ Tech Stack

This portfolio follows JAMstack architecture principles with modern tooling for optimal performance, maintainability, and developer experience:

| **Category** | **Technology** | **Version** | **Role** | **Why This Choice** |
|--------------|----------------|-------------|----------|-------------------|
| **🖥️ Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000.svg?logo=next.js&logoColor=white&style=for-the-badge) | 15.0 | React framework with App Router | SSG capabilities, performance, modern routing |
| | ![React](https://img.shields.io/badge/React-20232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge) | 18+ | UI library | Mature ecosystem, reusable components |
| | ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | 4 | Utility-first CSS framework | Rapid development, consistent design system |
| | ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white) | Latest | Icon system | Lightweight, optimized SVGs, tree-shaking |
| **⚙️ Business Logic** | ![React Hooks](https://img.shields.io/badge/React_Hooks-20232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge) | - | State management | Simple, performant state handling |
| | ![Custom Hooks](https://img.shields.io/badge/Custom_Hooks-61DAFB?style=for-the-badge&logo=react&logoColor=black) | - | Reusable logic | Clean separation of concerns |
| | ![ES Modules](https://img.shields.io/badge/ES_Modules-F7DF1E.svg?logo=javascript&logoColor=black&style=for-the-badge) | - | Modern JavaScript modules | Native standards, optimization |
| **🔧 Development Tools** | ![Node.js](https://img.shields.io/badge/Node.js-339933.svg?logo=nodedotjs&logoColor=white&style=for-the-badge) | 18+ | JavaScript runtime | npm ecosystem, modern tooling |
| | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white) | 8+ | Package manager | Performance, disk space efficiency |
| | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | Latest | Code quality | Consistent coding standards |
| **🚀 Services & APIs** | ![Formspree](https://img.shields.io/badge/Formspree-E5122D?style=for-the-badge&logo=formspree&logoColor=white) | - | Form handling | No backend required, spam protection |
| | ![GitHub API](https://img.shields.io/badge/GitHub_API-181717.svg?logo=github&logoColor=white&style=for-the-badge) | v4 | Repository data | Dynamic project information |
| | ![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-000000.svg?logo=vercel&logoColor=white&style=for-the-badge) | - | Performance monitoring | Privacy-friendly, built-in |
| **📦 CI/CD & Deployment** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF.svg?logo=github-actions&logoColor=white&style=for-the-badge) | - | CI/CD pipeline | Native integration, automated workflows |
| | ![Vercel](https://img.shields.io/badge/Vercel-000000.svg?logo=vercel&logoColor=white&style=for-the-badge) | - | Hosting and deployment | Edge network, preview deployments |
| | ![Git](https://img.shields.io/badge/Git-F05033.svg?logo=git&logoColor=white&style=for-the-badge) | - | Version control | Collaboration, history tracking |
| **📄 Content Management** | ![Markdown](https://img.shields.io/badge/Markdown-000000.svg?logo=markdown&logoColor=white&style=for-the-badge) ![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white) | - | Content format | Rich content, component embedding |
| | ![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white) | - | Configuration | Type-safe, easy maintenance |
| | ![Git CMS](https://img.shields.io/badge/Git_CMS-F05033.svg?logo=git&logoColor=white&style=for-the-badge) | - | Content management | Version control, developer-friendly |


## 📋 Prerequisites

- **Node.js** 18+ (LTS recommended)
- **pnpm** 8+ (package manager)
- **Git** (version control)
- **GitHub Account** (for GitHub Actions)
- **Vercel Account** (for deployment)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/sikatikenmogne/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm run dev
# → Open http://localhost:3000

# Build for production
pnpm run build

# Start production server
pnpm run start
```

## 📖 Preview

<details>
<summary><strong>Portfolio Screenshots</strong></summary>

### Desktop View
![Desktop Homepage](public/images/preview/desktop-home.png)
![Desktop Projects](public/images/preview/desktop-projects.png)

### Mobile View
![Mobile Homepage](public/images/preview/mobile-home.png)
![Mobile Navigation](public/images/preview/mobile-nav.png)

### Dark Mode
![Dark Mode](public/images/preview/dark-mode.png)

</details>

## 🏗️ Project Structure

```
portfolio/
├── .github/workflows/     # GitHub Actions CI/CD
├── src/
│   ├── app/              # Next.js App Router (pages & layouts)
│   ├── components/       # Reusable React components
│   │   ├── navigation/   # Header, footer, navigation
│   │   ├── projects/     # Project cards, filters, details
│   │   ├── profile/      # About, skills, experience
│   │   ├── contact/      # Contact form, social links
│   │   └── shared/       # Layout, SEO, error boundaries
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and services
│   └── data/             # Configuration and static data
├── content/              # Git-based CMS (Markdown files)
│   ├── projects/         # Project case studies
│   ├── blog/             # Technical articles
│   └── profile/          # About, experience, education
├── public/               # Static assets (images, icons, docs)
├── scripts/              # Build and utility scripts
├── .env.example          # Environment variables template
└── next.config.mjs       # Next.js configuration
```

## 🚧 Project Status

This portfolio is currently under active development. Some features may be incomplete or under implementation.

### Development Progress

- [x] User Interface
- [x] Navigation System
- [x] Contact Form
- [x] Dark/Light Theme
- [x] Projects Showcase
- [x] Technical Blog
- [x] Automated Testing
- [x] Internationalization

**Last Update:** September 2025

## 🤝 Contributing

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.
By participating, you are expected to uphold this code.

### 🔄 How to Contribute

1. Fork the project
2. Create a branch (`git checkout -b feature/improvement`)
3. Commit using conventional commits (`git commit -m 'feat: add improvement'`)
4. Push (`git push origin feature/improvement`)
5. Open a Pull Request

### 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

**Format:** `<type>[optional scope]: <description>`

**Common types:**

- `feat:` new feature for the user
- `fix:` bug fix for the user
- `docs:` changes to documentation
- `style:` formatting, missing semi colons, etc
- `refactor:` refactoring production code
- `test:` adding missing tests, refactoring tests
- `chore:` updating grunt tasks etc

### 🌿 Branch Strategy

- **`main`**: Production-ready code, auto-deployed to live site
- **`develop`**: Integration branch, auto-deployed to preview environment
- **`feature/*`**: Feature branches, merged to develop via PR
- **`hotfix/*`**: Critical production fixes, merged directly to main and back to develop

### ⚡ Development Workflow

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#ffffff',
    'primaryTextColor': '#333333',
    'primaryBorderColor': '#E60012',
    'lineColor': '#333333',
    'git0': '#E60012',
    'git1': '#E3F2FD',
    'git2': '#E8F5E8',
    'git3': '#FFF3E0',
    'git4': '#F3E5F5',
    'gitBranchLabel0': '#ffffff',
    'gitBranchLabel1': '#333333',
    'gitBranchLabel2': '#333333',
    'gitBranchLabel3': '#333333',
    'gitBranchLabel4': '#333333',
    'commitLabelFontSize': '10px'
  }
}}%%
gitGraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Setup"
    commit id: "Feature A"
    
    branch feature/auth
    checkout feature/auth
    commit id: "Auth System"
    checkout develop
    merge feature/auth
    
    commit id: "Feature B"
    checkout main
    merge develop
    commit id: "Release v1.0"
    
    branch hotfix/critical-bug
    checkout hotfix/critical-bug
    commit id: "Fix Bug"
    checkout main
    merge hotfix/critical-bug
    commit id: "Hotfix v1.0.1"
    checkout develop
    merge main
    
    checkout develop
    commit id: "Feature C"
    
    branch feature/new-component
    checkout feature/new-component
    commit id: "New Component"
    checkout develop
    merge feature/new-component
    
    checkout main
    merge develop
    commit id: "Release v1.1"
```

## 📄 License

This portfolio is licensed under [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/). See the [LICENSE](LICENSE) file for full details.

## 📞 Contact

For any questions or support, please email us via:

- [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sikatikenmogne@gmail.com)
- [![Linkedin Badge](https://img.shields.io/badge/-linkedin-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/samuel-sikati-kenmogne-57953a1b7/)](https://www.linkedin.com/in/samuel-sikati-kenmogne-57953a1b7/)

---

**Built with ❤️ by [Samuel SIKATI](https://github.com/sikatikenmogne)**
