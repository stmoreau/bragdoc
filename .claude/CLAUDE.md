# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 application using the App Router pattern with React 19.

**Key technologies:**
- Next.js 16 with App Router (`app/` directory)
- React 19
- Tailwind CSS v4 (uses `@import "tailwindcss"` syntax in CSS)
- TypeScript with strict mode

**Project structure:**
- `app/` - Next.js App Router pages and layouts
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/globals.css` - Global styles with Tailwind and CSS custom properties for theming
- `public/` - Static assets (SVGs)

**Path aliases:** Use `@/*` to import from the project root (configured in `tsconfig.json`).
