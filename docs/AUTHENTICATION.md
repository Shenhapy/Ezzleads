# Authentication System Documentation

## Overview

The EzzLeads platform uses NextAuth.js (Auth.js) for authentication, integrated with Supabase for user management and database storage.

## Features

- ✅ Email/Password authentication
- ✅ Session management with JWT
- ✅ Role-based access control (Buyer, Agent, Manager)
- ✅ User status tracking (Active, Suspended, Pending)
- ✅ Protected routes and pages
- ✅ Password reset flow
- ✅ Form validation with Zod
- ✅ Toast notifications

## Setup

### 1. Environment Variables

Add to your `.env.local`:

```bash
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

Or on Windows PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 2. Supabase Setup

The authentication system uses the following Supabase tables:
- `auth.users` - Built-in Supabase auth table
- `profiles` - User profiles with role and status

Make sure you've run all database migrations from `docs/DATABASE-SETUP.md`.

## Pages

### Public Pages

- `/` - Landing page
- `/login` - Sign in page
- `/register` - Create new account
- `/forgot-password` - Request password reset

### Protected Pages

- `/dashboard` - Redirects to role-specific dashboard
- `/dashboard/buyer` - Buyer dashboard
- `/dashboard/agent` - Agent dashboard
- `/dashboard/manager` - Manager dashboard

## User Roles

### Buyer
- Can browse marketplace
- Purchase leads
- Manage wallet/credits
- View purchase history

### Agent
- Can submit leads for approval
- Track lead status
- View earnings
- Manage payout settings

### Manager
- Approve/reject submitted leads
- Manage users
- View platform analytics
- Configure platform settings

## API Routes

### NextAuth Endpoints

- `GET/POST /api/auth/signin` - Sign in
- `GET/POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/providers` - List auth providers
- `POST /api/auth/callback/credentials` - Credentials callback

## Helper Functions

### Server Components

```typescript
import { requireAuth, requireRole, checkActiveStatus } from "@/lib/auth-helpers";

// Require any authenticated user
const session = await requireAuth();

// Require specific role
const session = await requireRole(["buyer", "agent"]);

// Check if user is active
const session = await checkActiveStatus();
```

### Client Components

```typescript
import { useRequireAuth, useRequireRole } from "@/hooks/use-auth";

// Require authentication
const { session, status } = useRequireAuth();

// Require specific role
const { session, status } = useRequireRole(["manager"]);
```

## Registration Flow

1. User fills out registration form with:
   - Full name
   - Email address
   - Password (min 8 chars, must include uppercase, lowercase, number)
   - Role selection (Buyer or Agent)

2. Form validation with Zod schema

3. Create user in Supabase Auth:
   ```typescript
   supabase.auth.signUp({
     email,
     password,
     options: { data: { display_name, role } }
   })
   ```

4. Profile created automatically via database trigger

5. Email verification sent (Supabase handles this)

6. User redirected to login page

## Login Flow

1. User enters email and password

2. Form validation

3. NextAuth credentials provider authenticates:
   - Verifies credentials with Supabase
   - Fetches user profile
   - Creates session with JWT

4. Session includes:
   - User ID
   - Email
   - Name
   - Role
   - Status

5. Redirect to role-specific dashboard

## Password Reset Flow

1. User clicks "Forgot Password" on login page

2. Enters email address

3. Supabase sends password reset email

4. User clicks link in email

5. Redirected to reset password page

6. Sets new password

7. Redirected to login

## Session Management

Sessions use JWT (JSON Web Tokens) stored in HTTP-only cookies.

**Session Duration:** 30 days

**Token Refresh:** Automatic on each request

**Session Data:**
```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
    role: "buyer" | "agent" | "manager";
    status: "active" | "suspended" | "pending";
  }
}
```

## Security Features

- Passwords hashed by Supabase Auth (bcrypt)
- JWT tokens signed with NEXTAUTH_SECRET
- HTTP-only cookies prevent XSS attacks
- CSRF protection enabled
- Row Level Security (RLS) on database
- Email verification required
- Password strength requirements
- Session expiration

## Testing Authentication

### Create Test Users

Run in Supabase SQL Editor:

```sql
-- Create test buyer
INSERT INTO auth.users (email, encrypted_password)
VALUES ('buyer@test.com', crypt('password123', gen_salt('bf')));

-- Profile will be created by trigger
```

Or use the registration page to create users.

### Test Login

1. Go to `http://localhost:3000/login`
2. Enter test credentials
3. Should redirect to dashboard

## Troubleshooting

### "NEXTAUTH_SECRET is not defined"

Add to `.env.local`:
```bash
NEXTAUTH_SECRET=your_secret_here
```

### "Profile not found"

Run the profiles migration:
```sql
-- See docs/DATABASE-SETUP.md
```

### Session not persisting

Check:
- NEXTAUTH_URL matches your domain
- Cookies enabled in browser
- No CORS issues

### Role-based redirect not working

Verify:
- User has valid role in profiles table
- Role is one of: buyer, agent, manager
- Session callback includes role

## Next Steps

- [ ] Add OAuth providers (Google, LinkedIn)
- [ ] Implement 2FA
- [ ] Add email templates
- [ ] Session activity logging
- [ ] IP-based security
- [ ] Rate limiting on auth endpoints
