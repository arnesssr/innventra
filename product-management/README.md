# Product Management System

A web-based product management system built with React, TypeScript, and Vite for managing inventory and products.

## Features

- **Product Management**
  - Add, edit, and delete products
  - Support for multiple product categories
  - Image upload for products
  - Draft and published states
  - Category-specific fields

- **Category Management**
  - Create custom categories
  - Define category-specific fields
  - Edit and delete categories
  - Default categories (Books, Bibles, Gifts, etc.)

- **Dashboard**
  - Real-time stock tracking
  - Total products overview
  - Product value calculation
  - Drafts monitoring

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Install and initialize shadcn/ui:
```bash
pnpm dlx shadcn-ui@latest init
```

3. Install Clerk:
```bash
pnpm add @clerk/clerk-react
```

4. Start development server:
```bash
pnpm dev
```

5. Build for production:
```bash
pnpm build
```

## Tech Stack

- React + TypeScript
- Vite
- Zustand (State Management)
- shadcn/ui (UI Components)
- Clerk (Authentication)
- Tailwind CSS
- React Router
- Lucide Icons

## Authentication

The system uses Clerk for:
- User authentication
- Role-based access control
- Secure session management
- User profile management

## Environment Setup

1. Create a `.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
VITE_CLERK_SECRET_KEY=your_secret_key
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific components
├── pages/         # Page components
├── store/         # Zustand store
├── types/         # TypeScript types
└── lib/           # Utilities and helpers
```
