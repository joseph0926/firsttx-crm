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

### Backend
- **NestJS** - Node.js framework
- **GraphQL** - API layer with Apollo Server
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication

### Client Data Layer
- **urql** - GraphQL client
- **GraphQL Code Generator** - Type-safe operations
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
- Node.js 22+
- pnpm 10+
- PostgreSQL 16+ (or Docker)

### Installation

1. Clone the repository and install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
# Server
cp apps/server/.env.example apps/server/.env
# Edit apps/server/.env and set JWT_SECRET

# Client
cp apps/client/.env.example apps/client/.env
```

3. Start PostgreSQL database:
```bash
# Using Docker
docker-compose up -d

# Or use your local PostgreSQL instance
```

4. Run database migrations:
```bash
cd apps/server
pnpm db:mig
```

5. Seed the database (optional):
```bash
pnpm db:seed
```

6. Start development servers:
```bash
# From root directory
pnpm dev

# Or start individually
cd apps/server && pnpm dev  # Server on port 4000
cd apps/client && pnpm dev  # Client on port 3000
```

### Development Commands

```bash
# GraphQL
cd apps/client
pnpm codegen        # Generate GraphQL types
pnpm codegen:watch  # Watch mode

# Database
cd apps/server
pnpm db:gen         # Generate Prisma client
pnpm db:mig         # Run migrations
pnpm db:stu         # Open Prisma Studio
pnpm db:seed        # Seed database

# Build & Lint
pnpm build          # Build all packages
pnpm lint           # Lint all packages
pnpm typecheck      # Type check all packages
```

### Environment Variables

#### Server (`apps/server/.env`)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens (generate with `openssl rand -base64 32`)
- `JWT_EXPIRES_IN` - Token expiration time (e.g., `7d`)
- `PORT` - Server port (default: 4000)
- `FRONTEND_URL` - Client URL for CORS (default: `http://localhost:3000`)

#### Client (`apps/client/.env`)
- `VITE_API_URL` - GraphQL API endpoint (default: `http://localhost:4000`)

## Architecture Highlights

### Monorepo Structure
- Turborepo for task orchestration
- pnpm workspaces for dependency management
- Shared tooling configuration (ESLint, TypeScript, Prettier)

### Frontend Optimization
- Route-based code splitting with React Router 7 lazy loading
- Vendor chunking for improved caching
- Manual chunk splitting for libraries (React, UI components, GraphQL)
- Initial bundle reduced by 51% (315KB → 161KB gzipped)

### Authentication
- Magic link authentication (passwordless)
- JWT-based session management
- Route guards with loader functions
- Dev mode bypass for local development

### Database Schema
- User management with magic link authentication
- Contact management with status and priority tracking
- Task management with due dates and priorities
- Interaction tracking (calls, emails, meetings, notes)

### Component Organization
- Shared UI components library (Radix UI primitives)
- Feature-based organization (contacts, dashboard, tasks)
- Type-safe GraphQL operations with code generation
- Barrel exports for clean imports

### Styling Approach
- Utility-first with Tailwind CSS 4
- CSS custom properties for theming
- Glassmorphism effects with backdrop-blur
- Responsive breakpoints (sm, md, lg)

## Docker Support

The project includes Docker Compose configuration for PostgreSQL database.

### Start Database
```bash
docker-compose up -d
```

### Stop Database
```bash
docker-compose down
```

### Reset Database
```bash
docker-compose down -v  # Remove volumes
docker-compose up -d
cd apps/server && pnpm db:mig
```

### Configuration
The `docker-compose.yml` file includes:
- PostgreSQL 16 image
- Port mapping: `5432:5432`
- Persistent data volume
- Health checks
- Default credentials: `postgres:postgres`

For production deployment, update credentials in `docker-compose.yml` and corresponding `DATABASE_URL` in `.env`.

## License

MIT
