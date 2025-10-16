# Troubleshooting Guide

Common issues and their solutions during development.

---

## ❌ Error: Cannot find module 'autoprefixer'

**Symptoms:**
```
Error: Cannot find module 'autoprefixer'
Require stack:
- ...webpack/config/blocks/css/plugins.js
```

**Cause:** Missing PostCSS/Tailwind CSS dependencies

**Solution:**
```powershell
npm install
```

If that doesn't work, install specifically:
```powershell
npm install -D autoprefixer tailwindcss-animate
```

**Why it happened:** The `package.json` was initially missing `autoprefixer` and `tailwindcss-animate` in devDependencies.

---

## ❌ Error: Cannot find module 'next'

**Symptoms:**
```
Cannot find module 'next' or its corresponding type declarations
```

**Solution:**
```powershell
# Delete node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
```

---

## ❌ Error: Supabase URL is required

**Symptoms:**
- App crashes on load
- Error about missing Supabase credentials

**Solution:**
1. Check if `.env.local` exists
2. Ensure it has these variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Restart the dev server after adding env variables

---

## ❌ TypeScript Errors in VSCode

**Symptoms:**
- Red squiggly lines everywhere
- "Cannot find module" errors in editor

**Solution:**
1. Install dependencies: `npm install`
2. Restart TypeScript server in VSCode:
   - Press `Ctrl+Shift+P`
   - Type "TypeScript: Restart TS Server"
   - Press Enter

---

## ❌ Tailwind CSS Not Working

**Symptoms:**
- Tailwind classes not applying
- No styling on components

**Solution:**
1. Check `tailwind.config.ts` has correct content paths:
```typescript
content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
],
```

2. Ensure `globals.css` imports Tailwind:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart dev server

---

## ❌ Port 3000 Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

**Option 1: Kill the process**
```powershell
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Option 2: Use a different port**
```powershell
npm run dev -- -p 3001
```

---

## ❌ Git Push Rejected

**Symptoms:**
```
! [rejected]        master -> master (fetch first)
```

**Solution:**
```powershell
# Pull latest changes first
git pull origin master

# If there are conflicts, resolve them, then:
git add .
git commit -m "Resolve conflicts"
git push origin master
```

---

## ❌ shadcn/ui Component Not Working

**Symptoms:**
- Component not rendering
- Import errors

**Solution:**
1. Make sure component is installed:
```powershell
npx shadcn-ui@latest add [component-name]
```

2. Check import path uses alias:
```typescript
import { Button } from "@/components/ui/button"
```

3. Verify `tsconfig.json` has path aliases:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

---

## ❌ Database Connection Error

**Symptoms:**
- Supabase queries failing
- Auth not working

**Solution:**
1. Check Supabase project is running (not paused)
2. Verify API keys in `.env.local` are correct
3. Check network connection
4. Verify RLS policies are set up correctly

---

## ❌ Build Errors in Production

**Symptoms:**
- `npm run build` fails
- Deployment fails on Vercel

**Solution:**
1. Fix TypeScript errors:
```powershell
npm run type-check
```

2. Fix ESLint errors:
```powershell
npm run lint
```

3. Test build locally:
```powershell
npm run build
npm run start
```

---

## 🔧 Useful Commands

### Clear Cache and Reinstall
```powershell
# Delete everything and start fresh
rm -r node_modules, .next, package-lock.json
npm install
```

### Check for Outdated Packages
```powershell
npm outdated
```

### Update Dependencies
```powershell
npm update
```

### Fix Security Vulnerabilities
```powershell
npm audit fix
```

---

## 📞 Still Stuck?

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Check the [Supabase Documentation](https://supabase.com/docs)
3. Search [Stack Overflow](https://stackoverflow.com/)
4. Review project documentation in `/docs`

---

**Remember:** Most errors are solved by:
1. `npm install`
2. Restart dev server
3. Check environment variables
4. Clear cache (`.next` folder)
