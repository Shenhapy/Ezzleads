# EzzLeads Platform - Real Estate Leads Marketplace

A comprehensive leads marketplace platform for buying and selling real estate leads. Think of it as **"PropStream + Fiverr + eBay for real estate leads"**.

## 🎉 Current Status: Authentication System Complete!

**Current Phase:** Phase 1 - MVP Development (~40% Complete)  
**Version:** 0.1.0  
**Last Updated:** October 17, 2025

### ✅ What's Working Now:
- User registration and login
- Role-based authentication (Buyer, Agent, Manager)
- Password reset flow
- Three role-specific dashboards
- Landing page with hero and features
- Toast notifications
- Form validation
- Responsive design

### 🚀 Quick Start

1. **Generate Auth Secret:**
   ```powershell
   .\generate-secret.ps1
   ```
   This will automatically add `NEXTAUTH_SECRET` to your `.env.local`

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   Visit `http://localhost:3000`

4. **Create an Account:**
   - Click "Get Started"
   - Choose role: Buyer or Agent
   - Fill in your details
   - Start exploring!

📖 **Read NEXT-STEPS.md for complete testing instructions**

## 📋 Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database + Auth + Real-time
- **NextAuth.js** - Authentication system

### Deployment
- **Vercel** - Hosting and deployment

## 📁 Project Structure

```
ezzleads-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (marketplace)/     # Public marketplace pages
│   │   ├── (dashboard)/       # Authenticated dashboard pages
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── header.tsx         # Header component
│   │   └── footer.tsx         # Footer component
│   ├── lib/                   # Utility functions
│   │   ├── supabase/          # Supabase clients
│   │   ├── auth/              # Auth utilities
│   │   └── utils.ts           # General utilities
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── middleware.ts          # Next.js middleware (auth)
├── docs/                      # Documentation
│   ├── MANUAL.md             # Complete project manual
│   ├── PHASE-1-MVP.md        # Phase 1 tasks
│   ├── PHASE-2-ENHANCED-FEATURES.md
│   └── PHASE-3-AUTOMATION-SCALING.md
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── components.json           # shadcn/ui config
└── next.config.mjs           # Next.js config
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** 18+ installed
- **Git** installed
- **Supabase** account (free tier)
- **Code editor** (VS Code recommended)

### 1. Clone the Repository

```powershell
git clone https://github.com/Shenhapy/Ezzleads.git
cd Ezzleads/Trial
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```powershell
copy .env.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# Supabase - Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth - Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the database migration scripts (coming soon in `/database/migrations`)

### 5. Install shadcn/ui Components

Install the initial components:

```powershell
npx shadcn-ui@latest add button input form card dialog dropdown-menu toast label select textarea checkbox badge
```

### 6. Run Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

### Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m "Add feature description"`
3. Push to GitHub: `git push origin feature/your-feature-name`
4. Create a Pull Request on GitHub

## 📚 Documentation

- **[MANUAL.md](./MANUAL.md)** - Complete project overview and planning
- **[PHASE-1-MVP.md](./PHASE-1-MVP.md)** - Current phase tasks (8-12 weeks)
- **[PHASE-2-ENHANCED-FEATURES.md](./PHASE-2-ENHANCED-FEATURES.md)** - Phase 2 tasks (6-8 weeks)
- **[PHASE-3-AUTOMATION-SCALING.md](./PHASE-3-AUTOMATION-SCALING.md)** - Phase 3 tasks (6-8 weeks)

## 🎯 Current Tasks (Phase 1 - Week 1-2)

### Completed ✅
- [x] Create project repository on GitHub
- [x] Choose and finalize tech stack
- [x] Initialize Next.js project with TypeScript

### In Progress 🚧
- [ ] Set up Supabase project
- [ ] Create database schema and migrations
- [ ] Configure NextAuth.js
- [ ] Set up shadcn/ui components

### Next Steps 📋
- [ ] Create wireframes for all main pages
- [ ] Build authentication pages
- [ ] Set up API routes structure

See [PHASE-1-MVP.md](./PHASE-1-MVP.md) for the complete task list.

## 🏗️ Core Features (MVP)

### Phase 1 Deliverables
- ✅ User authentication (login, register, password reset)
- ✅ Role-based access control (Buyer, Agent, Manager, JV Partner)
- ✅ Landing page with marketing content
- ✅ Marketplace browsing (public)
- ✅ Lead submission form (Agent)
- ✅ Lead approval system (Manager)
- ✅ Wallet system with manual credits
- ✅ Lead purchase flow
- ✅ Basic CRM for purchased leads
- ✅ Email notifications

## 🔒 User Roles

1. **Buyer** - Browse and purchase leads, manage CRM
2. **Agent** - Submit leads for approval
3. **Manager** - Approve leads, manage users, add credits
4. **JV Partner** - Receive assigned leads directly

## 🌐 Key Pages

### Public
- Landing page (`/`)
- Marketplace (`/marketplace`)
- Login (`/login`)
- Register (`/register`)

### Authenticated - Buyer
- Dashboard (`/dashboard`)
- Wallet (`/wallet`)
- CRM (`/crm`)
- Cart (`/cart`)

### Authenticated - Agent
- Agent Dashboard (`/agent`)
- Submit Lead (`/agent/submit`)
- My Leads (`/agent/leads`)

### Authenticated - Manager
- Manager Dashboard (`/manager`)
- Pending Leads (`/manager/leads/pending`)
- All Leads (`/manager/leads`)
- Users Management (`/manager/users`)
- Credit Requests (`/manager/credits`)

## 🤝 Contributing

This is currently a private project. Once we reach MVP, we'll open it up for contributions.

## 📄 License

Proprietary - All rights reserved

## 📞 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for the real estate community**
