# **NPMx Pre-test Examination **
**Please Read before cloning this repository**
# Campground Booking System 

A full-stack campground booking application with Next.js frontend and Express backend.

## Prerequisites

Things you should have installed before starting this pre-test.

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## Quick Setup

### 1. Backend Setup

```bash
cd backend
npm install
```
### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` from the example file:
```bash
cp .env.local.example .env.local
```

### 3. Database Setup

*In normal case, the examiner should already prepare database migrations and data for you. If you prefer to create your own database (supabase). You can do so by changing the environment variables in backend config and use data migrations and seeds provided.*

Run migrations in your Supabase SQL editor:
```bash
backend/migrations/17.2.2026.sql
```

Optionally seed the database:
```bash
backend/seeds/seed.sql
```


## Running the Application

### Development Mode

**Backend** (runs on port 5000 by default):
```bash
cd backend
npm run dev
```

**Frontend** (runs on port 3000 by default):
```bash
cd frontend
npm run dev
```

Visit http://localhost:3000 to access the application.


## Testing

**Frontend**:
```bash
cd frontend
npm test
```

## Tech Stack

- **Frontend**: Next.js, TypeScript, Material-UI, NextAuth
- **Backend**: Express.js, Supabase, JWT
- **Database**: PostgreSQL (via Supabase)


## Your Role in this Pre-test

This web application is **broken** in several places. Your job is to find and fix every issue so that the app works as intended.

### What you need to do

1. **Fix broken features** — The app has bugs scattered across both frontend and backend. Some are subtle configuration issues, others are logic errors. Trace the full request flow (frontend → API → backend → database) to find them.

2. **Implement the Favorites feature** — The favorites CRUD is mostly stubbed out. The route wiring and some components are in place, but the backend handlers and frontend library functions need to be implemented. Use the existing Bookings feature as a reference for the patterns and conventions used in this project.

3. **Verify role-based access** — This app has two roles: `user` and `admin`. Make sure each role can only do what it's supposed to:
   - Regular users can view campgrounds, manage their own bookings (max 3), and manage their favorites.
   - Admins can do everything users can, plus create/update/delete campgrounds and manage all bookings.

### You are **Not allowed** to use generative AI in this pretest. 
If you are stuck or need help, plase contact your examiner for assistant.

Good luck!
