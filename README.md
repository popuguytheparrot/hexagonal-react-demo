# Hexagonal React Demo

A React application demonstrating **DDD (Domain-Driven Design)** with **Hexagonal Architecture** (Ports & Adapters pattern).

## Features

- **Catalog Page** - Main page with products, filters, and URL-based pagination
- **Product Page** - Detailed product view by ID
- **Header Widgets** - Profile, Notifications, and Cart widgets (mock data)

## Architecture

This project follows hexagonal architecture principles, ensuring:

- **Dependency Inversion** - Redux and React Router can be easily replaced
- **Clean Separation** - Domain logic is isolated from infrastructure concerns
- **Composition over Inheritance** - Components use slots for flexible composition
- **No Prop Drilling** - Context and DI patterns for clean data flow

### Project Structure

```
src/
├── domain/                    # Business entities and repository interfaces
│   ├── product/              # Product entity, filters, pagination
│   ├── cart/                 # Cart entity
│   ├── notification/         # Notification entity
│   └── user/                 # User entity
├── application/              # Use cases and port interfaces
│   ├── ports/
│   │   ├── in/              # Input ports (use case interfaces)
│   │   └── out/             # Output ports (repository, state interfaces)
│   └── use-cases/           # Business logic implementation
├── infrastructure/           # External adapters
│   ├── adapters/
│   │   ├── api/             # API adapters (mock data)
│   │   ├── state/           # Redux store and adapters
│   │   └── navigation/      # React Router adapters
│   └── di/                  # Dependency injection container
└── presentation/            # React components
    ├── layouts/             # Layout components with slots
    ├── pages/               # Page components
    ├── widgets/             # Header widgets
    └── shared/              # Shared components and hooks
```

### Key Principles

1. **Domain Layer** - Pure TypeScript interfaces and types, no framework dependencies
2. **Application Layer** - Use cases implement input ports, depend on output ports
3. **Infrastructure Layer** - Adapters implement output ports (Redux, API, Router)
4. **Presentation Layer** - React components, use DI to access use cases

### Replacing Redux or Router

To replace Redux with another state management solution:
1. Create new adapters implementing `ProductStatePort`, `CartStatePort`, etc.
2. Update `container.ts` to use the new adapters
3. No changes needed in domain, application, or presentation layers

To replace React Router:
1. Create new navigation adapter implementing `NavigationPort`
2. Update `container.ts` to use the new adapter

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management (replaceable)
- **React Router** - Navigation (replaceable)

## Screenshots

### Catalog Page
![Catalog Page](https://github.com/user-attachments/assets/f42d765c-63bf-4255-91ad-f74760a84246)

### Product Page
![Product Page](https://github.com/user-attachments/assets/de2a10fa-4927-44ad-89e4-258e9ee254fd)
