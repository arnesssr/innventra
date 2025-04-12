# Setup Guide

## Prerequisites
- Node.js 18+
- pnpm
- Git

## Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd product-management
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Environment Setup**
- Copy `.env.example` to `.env`
- Update required environment variables

4. **Development Server**
```bash
pnpm dev
```

5. **Build for Production**
```bash
pnpm build
pnpm start
```

## Configuration
- Port: 5173 (default)
- Database: Local Storage
- Image Storage: Local File System
