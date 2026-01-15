# Brag Doc

A simple, privacy-focused tool for tracking your professional accomplishments. Build your brag document throughout the year so you're always ready for performance reviews, promotions, or job interviews.

## Features

- **Auto-save** - Your document is saved locally in your browser as you type
- **Share** - Generate a shareable link to send your brag doc to others
- **Export** - Download your document as a Markdown file
- **Import** - Load a previously exported brag doc from a JSON file
- **Privacy-first** - All data stays in your browser, nothing is sent to a server

## Sections

The brag doc helps you track:

- **What I Delivered** - Features, projects, and accomplishments
- **How I Helped Others** - Mentoring, collaboration, and team support
- **How I Grew** - New skills and personal development
- **Impact I Made** - Metrics, cost savings, and business value
- **Recognition I Received** - Positive feedback and shoutouts
- **What's Next** - Future goals and aspirations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start writing your brag doc.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## CLI

Track your wins directly from the terminal without leaving your workflow.

### Installation

```bash
npm install -g bragdoc
```

### Commands

```bash
bragdoc add                              # Interactive mode - prompts for section and text
bragdoc add delivered "Shipped new feature"  # Add directly to a section
bragdoc list                             # List all wins
bragdoc list delivered                   # List wins from a specific section
bragdoc export                           # Export as markdown
bragdoc config --name "Jane" --role "Engineer" --period "2026"
```

### Sections

Available sections: `delivered`, `collaboration`, `growth`, `impact`, `feedback`, `goals`

## Tech Stack

**Web App**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript

**CLI**
- Commander.js
- Chalk
- TypeScript

## Author

Made by [Stephane](https://www.linkedin.com/in/stefmoreau), author of [Blog for EMs](https://blog4ems.com)
