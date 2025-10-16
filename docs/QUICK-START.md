# Quick Start Guide

This guide will get you up and running in 5 minutes!

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies

```powershell
npm install
```

### 2. Configure Environment

```powershell
# Copy the example environment file
copy .env.example .env.local

# Edit .env.local and add your Supabase credentials
```

### 3. Set Up Supabase

Follow the [DATABASE-SETUP.md](./DATABASE-SETUP.md) guide to:
1. Create a Supabase project
2. Get your API keys
3. Run the database migrations

### 4. Start Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🎯 Your First Tasks

Now that the project is set up, here are your next tasks from Phase 1:

### Today
- [ ] Create wireframes for main pages (Figma/Excalidraw)
- [ ] Run database migrations in Supabase
- [ ] Install shadcn/ui components: `npx shadcn-ui@latest add button input form card`

### This Week
- [ ] Build authentication pages (login, register)
- [ ] Create landing page components
- [ ] Set up NextAuth.js configuration

### Track Your Progress

All tasks are tracked in [PHASE-1-MVP.md](../PHASE-1-MVP.md). Check off tasks as you complete them!

## 📚 Key Documentation

- **[README.md](../README.md)** - Project overview
- **[MANUAL.md](../MANUAL.md)** - Complete project manual
- **[DATABASE-SETUP.md](./DATABASE-SETUP.md)** - Supabase setup guide
- **[PHASE-1-MVP.md](../PHASE-1-MVP.md)** - Task list with checkboxes

## 🆘 Need Help?

### Common Issues

**"Cannot find module 'next'"**
- Run `npm install` again

**"Supabase URL is required"**
- Make sure you've created `.env.local` and added your Supabase credentials

**TypeScript errors**
- Run `npm run type-check` to see all errors
- Make sure all dependencies are installed

### Getting Support

Check the documentation first, then reach out to the team if you're stuck.

## 🎨 Design System

We're using **shadcn/ui** + **Tailwind CSS**. Here's how to add components:

```powershell
# Add a new component
npx shadcn-ui@latest add [component-name]

# Example: add a button
npx shadcn-ui@latest add button
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com)

## 🚀 Deployment

When you're ready to deploy (after completing MVP):

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy! 🎉

---

**Happy coding! 💻**
