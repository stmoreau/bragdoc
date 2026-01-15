# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

BragDoc is a tool for tracking professional accomplishments. It consists of two parts:
1. **Web App** - A Next.js application for writing and managing brag docs in the browser
2. **CLI** - A command-line tool for quick wins tracking from the terminal

## Commands

### Web App

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

### CLI (in `cli/` directory)

```bash
cd cli
npm run build    # Compile TypeScript
npm run dev      # Watch mode for development
```

CLI usage (after global install with `npm install -g bragdoc`):
```bash
bragdoc add                              # Interactive mode
bragdoc add delivered "Shipped feature"  # Add to specific section
bragdoc list                             # List all wins
bragdoc list delivered                   # List wins from section
bragdoc export                           # Export as markdown
bragdoc config --name "Jane" --role "Engineer" --period "2026"
```

## Architecture

### Web App

Next.js 16 application using the App Router pattern with React 19.

**Key technologies:**
- Next.js 16 with App Router (`app/` directory)
- React 19
- Tailwind CSS v4 (uses `@import "tailwindcss"` syntax in CSS)
- TypeScript with strict mode

**Project structure:**
- `app/page.tsx` - Landing page
- `app/write/page.tsx` - Main brag doc editor (client component)
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/globals.css` - Global styles with Tailwind and CSS custom properties
- `app/components/` - Reusable components (e.g., ShareButton)
- `app/opengraph-image.tsx` - Dynamic OG image generation
- `app/twitter-image.tsx` - Dynamic Twitter card image
- `public/` - Static assets

**Path aliases:** Use `@/*` to import from the project root (configured in `tsconfig.json`).

### CLI

Standalone TypeScript CLI in the `cli/` directory.

**Key technologies:**
- Commander.js for CLI parsing
- Chalk for terminal colors
- TypeScript (ES modules)

**CLI structure:**
- `cli/src/index.ts` - Entry point, command definitions
- `cli/src/commands/` - Command implementations (add, list, export, config)
- `cli/src/storage.ts` - File I/O for `~/.bragdoc.json`
- `cli/src/sections.ts` - Section definitions and utilities
- `cli/dist/` - Compiled JavaScript output

## Data Model

Both web app and CLI use the same `BragDoc` interface:

```typescript
interface BragDoc {
  name: string;
  role: string;
  period: string;
  delivered: string[];
  collaboration: string[];
  growth: string[];
  impact: string[];
  feedback: string[];
  goals: string[];
  updatedAt: string;
}
```

**Storage:**
- Web App: `localStorage` (key: `bragdoc_data`)
- CLI: `~/.bragdoc.json`

## Sections

Six predefined sections for organizing accomplishments:

| Key | Icon | Title | Aliases |
|-----|------|-------|---------|
| `delivered` | 🚀 | What I Delivered | deliver, shipped, ship, done, d |
| `collaboration` | 🤝 | How I Helped Others | collab, helped, help, c |
| `growth` | 🌱 | How I Grew | grew, learned, learn, g |
| `impact` | 📈 | Impact I Made | i |
| `feedback` | 💬 | Recognition I Received | recognition, kudos, f |
| `goals` | 🎯 | What's Next | next, goal |

## Key Features

### Web App
- Auto-save to localStorage with debouncing
- Share via URL hash (base64 encoded)
- Export to Markdown
- Import from JSON file
- Drag-and-drop reordering
- Keyboard navigation (Enter to add, Backspace to remove, Arrow keys)
- Inspiration prompts per section

### CLI
- Interactive mode with section selection
- Direct add with section aliases
- Markdown export to stdout
- Persistent config (name, role, period)
