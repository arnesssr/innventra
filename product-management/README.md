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
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Tech Stack

- React + TypeScript
- Vite
- Zustand (State Management)
- Tailwind CSS
- Radix UI
- React Router
- Lucide Icons

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
