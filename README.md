# Full Stack Developer Portfolio

Modern personal portfolio built with Next.js, automatically deployed to Vercel via GitHub Actions.

## Tech Stack

- **Framework**: Next.js 14+ (JavaScript + ES Modules)
- **Styling**: Tailwind CSS
- **Content**: Markdown + Git-based CMS
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm

## Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git
- GitHub Account
- Vercel Account

### Installing Prerequisites (Windows)

```powershell
# Via Chocolatey (recommended)
choco install nodejs pnpm git

# Or manual installation from official websites
```

## Local Installation

### 1. Clone the Project

```powershell
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
pnpm install
```

### 2. Environment Configuration

```powershell
# Copy the example file
Copy-Item .env.example .env.local

# Edit .env.local with your values
```

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Name - Portfolio"
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
```

### 3. Start Development

```powershell
# Start the development server
pnpm run dev

# Open http://localhost:3000
```

## GitHub + Vercel Deployment Tutorial

### Step 1: Project Preparation

```powershell
# Verify everything works locally
pnpm run check  # Lint + Build
pnpm run build  # Build test

# Install Git hooks
pnpm run prepare
```

### Step 2: GitHub Repository Creation

#### Option A: Via GitHub Interface

1. Go to https://github.com/new
2. Repository name: `portfolio`
3. Description: `Personal Portfolio - Full Stack Developer`
4. Visibility: `Public` or `Private`
5. **DO NOT** initialize with README (you already have one)
6. Click `Create repository`

#### Option B: Via GitHub CLI

```powershell
# Install GitHub CLI
winget install GitHub.cli

# Create the repository
gh repo create portfolio --public --description "Personal Portfolio - Full Stack Developer"
```

### Step 3: Branch Configuration

```powershell
# You're on master, create develop branch
git checkout -b develop

# Add all files
git add .
git commit -m "feat: initial portfolio setup"

# Configure origin
git remote add origin https://github.com/your-username/portfolio.git

# Push both branches
git push -u origin master
git push -u origin develop

# Set develop as default working branch
git checkout develop
```

### Step 4: GitHub Repository Configuration

#### Master Branch Protection

1. Repository → `Settings` → `Branches`
2. Add rule for `master`:
   - Branch name pattern: `master`
   - ✓ Require pull request reviews before merging
   - ✓ Require status checks to pass before merging
   - ✓ Include administrators
3. Save changes

#### Repository Settings

1. Repository → `Settings` → `General`
   - Default branch: `develop`
   - ✓ Allow squash merging
   - ✗ Allow merge commits
   - ✓ Allow rebase merging

### Step 5: Vercel Configuration

#### Installation and Connection

```powershell
# Install Vercel CLI
pnpm add -g vercel

# Connect to Vercel
vercel login
# Choose GitHub and authorize access
```

#### Project Linking

```powershell
# Link the Vercel project
vercel link

# Answer the questions:
# ? Set up and deploy "~/portfolio"? Y
# ? Which scope do you want to deploy to? [your-team]
# ? Link to existing project? N
# ? What's your project's name? portfolio
# ? In which directory is your code located? ./
```

#### Environment Variables Configuration

```powershell
# Add environment variables
vercel env add NEXT_PUBLIC_SITE_URL
# Value: https://portfolio-your-username.vercel.app

vercel env add NEXT_PUBLIC_FORMSPREE_ID
# Value: your_formspree_id

vercel env add NEXT_PUBLIC_SITE_NAME
# Value: Your Name - Portfolio

# Download variables locally
vercel env pull .env.local
```

### Step 6: Retrieve Vercel Identifiers

```powershell
# Display project information
cat .vercel/project.json
```

The file contains your identifiers:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

#### Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Create Token → Name: `GitHub Actions Portfolio`
3. Copy the generated token

### Step 7: GitHub Secrets Configuration

#### Via GitHub Interface

1. Repository → `Settings` → `Secrets and variables` → `Actions`
2. New repository secret → Add these 3 secrets:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=orgId_value_from_project_json_file
VERCEL_PROJECT_ID=projectId_value_from_project_json_file
```

#### Via GitHub CLI (Alternative)

```powershell
# Configure secrets
gh secret set VERCEL_TOKEN
# Paste your Vercel token

gh secret set VERCEL_ORG_ID
# Paste the orgId value

gh secret set VERCEL_PROJECT_ID  
# Paste the projectId value
```

### Step 8: Pipeline Testing

```powershell
# Make a test change
echo "# Portfolio Test" > test-deploy.md
git add test-deploy.md
git commit -m "test: pipeline deployment"
git push origin develop

# Check the deployment
# 1. GitHub → Actions (see the workflow)
# 2. Vercel Dashboard (see the preview)
```

### Step 9: First Production Deployment

```powershell
# After preview validation, deploy to production
git checkout master
git merge develop
git push origin master

# Check production deployment
# 1. GitHub Actions → production workflow
# 2. Vercel → deployment to main domain
```

## Useful Commands

### Development

```powershell
pnpm run dev          # Development server
pnpm run build        # Production build
pnpm run check        # Lint + Build
pnpm run fix          # Auto-fix code
pnpm run verify       # Configuration check
```

### Git Workflow

```powershell
# New feature
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Development...
git add .
git commit -m "feat: feature description"
git push -u origin feature/new-feature

# Create Pull Request: feature → develop (auto preview)
# After validation: develop → master (auto production)
```

### Vercel

```powershell
vercel                # Manual preview deployment
vercel --prod         # Manual production deployment
vercel logs           # View logs
vercel env pull       # Sync variables
vercel domains        # Manage custom domains
```

### Debugging

```powershell
# Check configuration
node scripts/verify-setup.mjs

# Clean project
pnpm run clean

# Complete reinstall
pnpm run clean
Remove-Item node_modules -Recurse -Force
Remove-Item pnpm-lock.yaml
pnpm install
```

## Project Structure

```
portfolio/
├── .github/workflows/     # GitHub Actions CI/CD
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   └── data/             # Configuration
├── content/              # Markdown content
│   ├── projects/         # Projects
│   ├── blog/             # Articles
│   └── profile/          # Profile
├── public/               # Static assets
├── scripts/              # Utility scripts
├── .env.local           # Local variables
├── .env.example         # Variables template
├── next.config.mjs      # Next.js configuration
├── vercel.json          # Vercel configuration
└── README.md            # This file
```

## Development Workflow

### Branches

- **`master`**: Production (automatic deployment)
- **`develop`**: Integration (automatic preview)  
- **`feature/*`**: New features

### Process

1. **Development**: `feature/my-feature` from `develop`
2. **Preview**: Pull Request to `develop` → auto preview deployment
3. **Production**: Merge `develop` → `master` → auto production deployment

## Project URLs

- **Production**: https://portfolio-your-username.vercel.app
- **Preview**: https://portfolio-git-develop-your-username.vercel.app
- **Repository**: https://github.com/your-username/portfolio

## Content Management

### Add a Project

```markdown
<!-- content/projects/new-project.md -->
---
title: "Project Name"
description: "Short description"
technologies: ["React", "Node.js", "Tailwind CSS"]
status: "completed"
featured: true
date: "2024-01-15"
demo: "https://demo.example.com"
github: "https://github.com/username/project"
image: "/images/projects/project.jpg"
---

# Project Name

Detailed description...
```

### Add an Article

```markdown
<!-- content/blog/new-article.md -->
---
title: "Article Title"
description: "Article description"
date: "2024-01-15"
tags: ["React", "JavaScript"]
featured: false
---

# Article Title

Article content...
```

## Customization

### Modify Colors

```javascript
// tailwind.config.js - customize theme
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',  // Your main color
        600: '#2563eb',
        900: '#1e3a8a',
      }
    }
  }
}
```

### Site Configuration

```json
// src/data/config/site.json
{
  "name": "Your Name",
  "title": "Full Stack Developer",
  "description": "Professional portfolio...",
  "email": "your.email@domain.com",
  "social": {
    "github": "https://github.com/your-username",
    "linkedin": "https://linkedin.com/in/your-profile"
  }
}
```

## Troubleshooting

### Common Errors

**Windows Build Error:**
```powershell
# Clean and rebuild
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
pnpm run build
```

**Git Permissions Error:**
```powershell
# Reset permissions
git config --global user.name "Your Name"
git config --global user.email "your.email@domain.com"
```

**Vercel Deploy Error:**
```powershell
# Check configuration
vercel whoami
vercel env ls
cat .vercel/project.json
```

### Support

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Tailwind Documentation**: https://tailwindcss.com/docs

## Contributing

1. Fork the project
2. Create a branch (`git checkout -b feature/improvement`)
3. Commit (`git commit -m 'feat: add improvement'`)
4. Push (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Built with ❤️ by [Samuel SIKATI](https://github.com/sikatikenmogne)**
