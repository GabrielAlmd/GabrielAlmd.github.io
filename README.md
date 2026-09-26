# GabrielAlmd.github.io

Personal engineering portfolio for Gabriel Almeida, published at
[gabrielalmd.github.io](https://gabrielalmd.github.io).

The site is a small, static foundation for project case studies, anonymized
professional engineering challenges, and notes about embedded software, systems
programming, and engineering tooling.

## Stack

- Astro and TypeScript
- Markdown and MDX-ready content collections
- Plain CSS with light and dark design tokens
- GitHub Actions and GitHub Pages

## Local development

Node.js 22.12 or newer is required. Node.js 24 is used in CI.

```sh
npm ci
npm run dev
```

The development server will print its local URL. Other useful commands are:

```sh
npm run check    # Run Astro and TypeScript diagnostics
npm run build    # Generate the production site in dist/
npm run preview  # Preview the production build locally
```

## Project structure

```text
├── .github/workflows/    # GitHub Pages deployment
├── public/               # Static assets
├── src/
│   ├── components/       # Shared Astro components
│   ├── content/          # Project and engineering challenge entries
│   ├── layouts/          # Shared document and SEO layout
│   ├── pages/            # File-based routes
│   └── styles/           # Global styles and design tokens
├── astro.config.mjs
└── src/content.config.ts # Validated content collection schemas
```

Add a `.md` or `.mdx` file to `src/content/projects/` to create a project. The
collection schema validates its frontmatter, and `src/pages/projects/[slug].astro`
generates the matching detail route.

Anonymized professional case studies live in `src/content/challenges/` and use the
separate `challenges` collection. Draft entries are excluded from generated list
and detail pages.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`. The workflow installs locked
dependencies, checks and builds the site, uploads `dist/`, and deploys it with the
official GitHub Pages actions. It can also be started manually from the Actions
tab.

In the repository settings, configure **Pages → Build and deployment → Source** to
use **GitHub Actions**. This is a GitHub user site, so Astro uses the root URL and
does not configure a repository subpath.
