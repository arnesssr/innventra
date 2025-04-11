# Product Management System

A comprehensive React-based inventory and product management system for retail businesses. Manage products, track inventory, and handle stock movements efficiently.

## Features

- Product Management (categories, drafts, published)
- Inventory Tracking
- Stock Movement History
- Low Stock Alerts
- Dashboard Analytics
- Multi-category Support
- Image Management
- Stock Level Controls

## Todo List
- [ ] E-commerce Integration
  - [ ] Create e-commerce website frontend
  - [ ] Product catalog display
  - [ ] Shopping cart functionality
  - [ ] Payment gateway integration (M-Pesa, Cards)
  - [ ] Order management system
  - [ ] Customer accounts

- [ ] Inventory Management
  - [ ] Stock movement tracking
  - [ ] Low stock alerts
  - [ ] Stock history view
  - [ ] Inventory reports
  - [ ] Stock adjustments feature

- [ ] Product Features
  - [ ] Bulk product import/export
  - [ ] Product variants
  - [ ] Product categories reordering
  - [ ] Product images optimization

- [ ] Dashboard
  - [ ] Sales analytics
  - [ ] Stock level indicators
  - [ ] Low stock warnings
  - [ ] Popular products tracking

- [ ] User Management
  - [ ] Role-based access control
  - [ ] Activity logging
  - [ ] User permissions

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
