# Database Setup Guide

This guide will help you set up the Supabase database for the EzzLeads platform.

## 📋 Prerequisites

- Supabase account (sign up at [supabase.com](https://supabase.com))
- Project repository cloned and environment variables configured

## 🚀 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and log in
2. Click "New Project"
3. Fill in:
   - **Name:** EzzLeads Platform
   - **Database Password:** (choose a strong password and save it)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is fine for development
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## 🔑 Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values to your `.env.local` file:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 🗄️ Step 3: Database Schema

Go to **SQL Editor** in your Supabase dashboard and run these migrations in order:

### Migration 1: Enable Extensions

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'NH1eNgalELMcR69zFfqj1CxfNDW+nthP4lqesUghcyo=';
```

### Migration 2: Create Profiles Table

```sql
-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'agent', 'manager', 'jv_partner')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles are viewable by everyone, but only updatable by user themselves
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Migration 3: Create Wallets Table

```sql
-- Create wallets table
CREATE TABLE public.wallets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.00 NOT NULL CHECK (balance >= 0),
  currency TEXT DEFAULT 'USD' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Users can view their own wallet
CREATE POLICY "Users can view own wallet"
  ON public.wallets FOR SELECT
  USING (auth.uid() = user_id);

-- Only managers can update wallets
CREATE POLICY "Managers can update wallets"
  ON public.wallets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- Function to create wallet for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create wallet when profile is created
CREATE TRIGGER on_profile_created_create_wallet
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_wallet();
```

### Migration 4: Create Wallet Transactions Table

```sql
-- Create wallet_transactions table
CREATE TABLE public.wallet_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'refund')),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  reference_id UUID,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON public.wallet_transactions FOR SELECT
  USING (
    wallet_id IN (
      SELECT id FROM public.wallets WHERE user_id = auth.uid()
    )
  );

-- Create index for faster queries
CREATE INDEX wallet_transactions_wallet_id_idx ON public.wallet_transactions(wallet_id);
CREATE INDEX wallet_transactions_created_at_idx ON public.wallet_transactions(created_at DESC);
```

### Migration 5: Create Credit Requests Table

```sql
-- Create credit_requests table
CREATE TABLE public.credit_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount_requested DECIMAL(10, 2) NOT NULL CHECK (amount_requested > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.credit_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own requests
CREATE POLICY "Users can view own credit requests"
  ON public.credit_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create credit requests
CREATE POLICY "Users can create credit requests"
  ON public.credit_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Managers can view all requests
CREATE POLICY "Managers can view all credit requests"
  ON public.credit_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- Managers can update credit requests
CREATE POLICY "Managers can update credit requests"
  ON public.credit_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );
```

### Migration 6: Create Leads Table

```sql
-- Create leads table
CREATE TABLE public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sold', 'expired', 'deleted')),
  mode TEXT CHECK (mode IN ('fixed_price', 'marketplace')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Property info
  property_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  property_type TEXT NOT NULL CHECK (property_type IN ('single_family', 'multi_family', 'land', 'commercial', 'other')),
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  square_feet INTEGER,
  
  -- Lead info
  lead_type TEXT NOT NULL CHECK (lead_type IN ('motivated_seller', 'fsbo', 'pre_foreclosure', 'probate', 'inherited', 'other')),
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  owner_email TEXT,
  motivation_level INTEGER CHECK (motivation_level BETWEEN 1 AND 10),
  notes TEXT,
  asking_price DECIMAL(12, 2),
  suggested_price DECIMAL(12, 2) NOT NULL,
  
  -- Marketplace info
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  countdown_expires_at TIMESTAMP WITH TIME ZONE,
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  sold_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public can view approved leads in marketplace mode
CREATE POLICY "Anyone can view marketplace leads"
  ON public.leads FOR SELECT
  USING (status = 'approved' AND mode = 'marketplace');

-- Agents can view their own leads
CREATE POLICY "Agents can view own leads"
  ON public.leads FOR SELECT
  USING (auth.uid() = submitted_by);

-- Agents can create leads
CREATE POLICY "Agents can create leads"
  ON public.leads FOR INSERT
  WITH CHECK (
    auth.uid() = submitted_by AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('agent', 'manager')
    )
  );

-- Managers can view all leads
CREATE POLICY "Managers can view all leads"
  ON public.leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- Managers can update leads
CREATE POLICY "Managers can update leads"
  ON public.leads FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- Create indexes
CREATE INDEX leads_status_idx ON public.leads(status);
CREATE INDEX leads_mode_idx ON public.leads(mode);
CREATE INDEX leads_submitted_by_idx ON public.leads(submitted_by);
CREATE INDEX leads_city_state_idx ON public.leads(city, state);
CREATE INDEX leads_created_at_idx ON public.leads(created_at DESC);
```

### Migration 7: Create Contact Submissions Table

```sql
-- Create contact_submissions table (for landing page)
CREATE TABLE public.contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  followed_up_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can create contact submissions
CREATE POLICY "Anyone can create contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Only managers can view contact submissions
CREATE POLICY "Managers can view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );
```

## ✅ Step 4: Verify Setup

Run this query to verify all tables were created:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see:
- profiles
- wallets
- wallet_transactions
- credit_requests
- leads
- contact_submissions

## 🧪 Step 5: Create Test Data (Optional)

```sql
-- This will be populated when the first user registers
-- You can manually create test users in Supabase Auth dashboard
```

## 📝 Notes

- **Row Level Security (RLS)** is enabled on all tables for security
- **Triggers** automatically create profiles and wallets for new users
- **Policies** control who can view/edit data based on user roles
- All timestamps are in UTC

## 🔄 Next Steps

1. Update your `.env.local` with the Supabase credentials
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Test registration - it should automatically create profile and wallet

## 🆘 Troubleshooting

### Issue: "relation does not exist"
- Make sure all migrations ran successfully in order
- Check the SQL Editor for any error messages

### Issue: RLS policies blocking access
- Verify user is authenticated
- Check user role in profiles table
- Review policy conditions in each migration

### Issue: Trigger not firing
- Ensure triggers were created successfully
- Check Supabase logs for errors

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)
