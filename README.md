# FirstTX CRM

A modern CRM application built with React, demonstrating production-ready patterns for client-side rendering with server-like user experience.

![FirstTX CRM Landing Page](https://res.cloudinary.com/dx25hswix/image/upload/v1762052222/firsttx-crm-land_sm50ip.png)

## Overview

FirstTX CRM provides essential customer relationship management features with a focus on clean architecture and modern web technologies. The application showcases contact management, activity tracking, and task management in an intuitive interface.

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Motion (Framer Motion 12)** - Animation library
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript 5.9** - Type safety

### Backend & Data
- **GraphQL** - API layer with urql client
- **GraphQL Code Generator** - Type-safe GraphQL operations
- **Local-First Architecture** - Built with `@firsttx/local-first`

### Development
- **Vite 7** - Build tool
- **pnpm** - Package manager (workspace support)
- **ESLint** - Code linting
- **Babel React Compiler** - Automatic optimization

## Project Structure

```
firsttx-crm/
├── apps/
│   ├── client/           # React frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── landing/  # Landing page components
│   │   │   ├── routes/       # Page components
│   │   │   ├── gql/          # Generated GraphQL types
│   │   │   └── lib/          # Utilities
│   │   └── package.json
│   └── server/           # Backend (if applicable)
└── package.json          # Workspace root
```

## Features

### Contact Management
- Store and organize customer information
- Visual contact cards with status indicators
- Quick search and filtering
- Tag-based organization (Client, Partner, Lead)

### Smart Tracking
- Activity timeline with live updates
- Email, meeting, and note tracking
- Upcoming event reminders
- Timeline visualization

### Task Management
- Create and track tasks from interactions
- Priority levels (High, Medium, Low)
- Due date tracking
- Interactive checkboxes with completion states

## Design System

### Theme
The application uses CSS custom properties for theming, supporting both light and dark modes:

- `--primary`, `--primary-foreground`
- `--card`, `--border`
- `--muted`, `--muted-foreground`
- `--destructive`
- `--chart-1` through `--chart-5`

### Components
Built with a modular component architecture:

- **Type-safe**: Full TypeScript coverage
- **Reusable**: Shared components via barrel exports
- **Accessible**: Semantic HTML and ARIA attributes
- **Performant**: Optimized animations and rendering

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
cd apps/client
pnpm dev
```

### Development

```bash
# Run GraphQL codegen in watch mode
pnpm codegen:watch

# Build for production
pnpm build

# Lint code
pnpm lint
```

## Architecture Highlights

### Component Organization
Landing page components are separated into focused modules:

- `types.ts` - TypeScript interfaces
- `data.ts` - Mock data (easily replaceable)
- Individual visual components
- Barrel exports for clean imports

### Animation Strategy
- Scroll-triggered animations with `whileInView`
- Optimized viewport margins for performance
- Spring physics for natural motion
- Minimal delays for responsive feel

### Styling Approach
- Utility-first with Tailwind CSS
- CSS custom properties for theming
- Glassmorphism effects with backdrop-blur
- Responsive breakpoints (sm, md, lg)

## License

MIT
