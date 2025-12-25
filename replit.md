# PEB 3D Building Configurator

## Overview

This is a Pre-Engineered Building (PEB) Configurator - a professional-grade web application that allows users to design and configure steel building structures in 3D. Users select from building templates (Single Slope, Rigid Frame, or Lean-To buildings), then customize dimensions, colors, openings, and accessories through an interactive interface with real-time 3D visualization.

The application follows a desktop-first, three-column layout: left navigation for configuration panels, center 3D viewport, and right sidebar for display options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand store (`client/src/lib/store.ts`) for managing building configuration, visualization settings, view modes, and undo/redo history
- **3D Rendering**: React Three Fiber with Three.js for WebGL-based 3D building visualization
- **UI Components**: shadcn/ui component library with Radix UI primitives, styled with Tailwind CSS
- **Data Fetching**: TanStack React Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains both database schemas and TypeScript type definitions
- **Migrations**: Managed via Drizzle Kit (`drizzle-kit push`)
- **In-Memory Fallback**: `MemStorage` class provides a Map-based storage implementation for development

### Key Design Patterns
- **Shared Types**: The `shared/` directory contains schemas and types used by both frontend and backend
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared directory
- **Component Structure**: UI components in `components/ui/`, feature components in `components/configurator/`
- **Desktop-First Layout**: Fixed-width sidebars (280px left, 320px right) with flexible center viewport

### Building Configuration Model
The core data model includes:
- Building dimensions (width, length, eave height)
- Roof configuration (type, slope, orientation)
- RAL color selections for panels and structure
- Openings (doors, windows, louvers)
- Accessories and structural options
- Crane specifications

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### 3D Graphics
- **Three.js**: Core 3D rendering engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for common 3D patterns (OrbitControls, Environment, etc.)

### UI Framework
- **Radix UI**: Comprehensive set of accessible UI primitives (dialogs, dropdowns, accordions, etc.)
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Development server with HMR
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment

### Session Management
- **express-session**: Server-side session handling
- **connect-pg-simple**: PostgreSQL session store