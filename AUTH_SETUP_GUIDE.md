# FarmScan Authentication & Supabase Configuration

## ✅ Authentication Flow

Your FarmScan app now requires users to **login or signup before using any features**:

1. **Default Route**: Users land on `/login` (no other pages accessible)
2. **New Users**: Click "Sign up" → `/signup` → Create account
3. **Existing Users**: Login at `/login`
4. **All App Pages** (scan, history, diseases, alerts, profile) are **protected** - redirect to login if not authenticated

---

## 🔧 Supabase Configuration (Required)

### Step 1: Enable Email/Password Authentication

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/projects)
2. Select your project: `dnjqbekznsguhkymhgmn`
3. Left sidebar → **Authentication**
4. Click **Providers** tab
5. Find **Email** provider
6. Toggle **"Enable Email provider"** → **ON**
7. ✅ Save

### Step 2: Configure Email Settings (Optional but Recommended)

1. In **Authentication** → **Providers** → **Email**
2. Under "Email Confirmations":
   - Choose **"Double opt-in"** (recommended for security)
   - Or **"Single opt-in"** (faster signup)
3. Copy the **Confirm signup link template**:
   ```
   {{ .ConfirmationURL }}
   ```
4. Set email templates if needed

### Step 3: Enable Google OAuth (Optional - for "Sign in with Google")

1. **Authentication** → **Providers** → **Google**
2. Toggle **"Enable Google Provider"** → **ON**
3. Add your **Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials (if not done)
   - Copy **Client ID** and **Client Secret**
   - Paste into Supabase
4. Set Redirect URL:
   ```
   https://dnjqbekznsguhkymhgmn.supabase.co/auth/v1/callback
   ```
5. ✅ Save

### Step 4: Create Database Schema (Optional - for storing scan history)

The migration file is ready at: `supabase/migrations/20260205_create_scan_history.sql`

To apply it:

```bash
cd supabase
supabase link --project-ref dnjqbekznsguhkymhgmn
supabase db push
```

Or manually in Supabase:

1. **SQL Editor** → **New Query**
2. Copy-paste the SQL from the migration file
3. Click **Run**

---

## 🧪 Testing User Data Storage

### Test 1: Verify User Signs Up Successfully

```bash
# 1. Start dev server
npm run dev

# 2. Navigate to http://localhost:8080/signup
# 3. Fill in form:
#    - Full Name: "Test User"
#    - Email: "test@example.com"
#    - Password: "password123"
#    - Confirm Password: "password123"
# 4. Click "Create Account"
# 5. You should see success message
```

### Test 2: Check if User is Stored in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/projects)
2. Select project: `dnjqbekznsguhkymhgmn`
3. Left sidebar → **Authentication** → **Users** tab
4. ✅ You should see your "test@example.com" user listed
5. Click on the user to see details (ID, email, created date, etc.)

### Test 3: Verify User Can Login

```bash
# 1. Open browser console: F12 → Console tab
# 2. Try to login at http://localhost:8080/login
# 3. Enter:
#    - Email: "test@example.com"
#    - Password: "password123"
# 4. Click "Sign In"
# 5. Should redirect to home page (/)
# 6. In console, you should see user object logged
```

### Test 4: Check Auth Token in Browser Storage

```javascript
// Open browser console (F12) and run:
localStorage.getItem("sb-dnjqbekznsguhkymhgmn-auth-token");

// Should return a JSON object with:
// {
//   access_token: "...",
//   refresh_token: "...",
//   user: { id, email, ... }
// }
```

### Test 5: Verify Session Persistence

```bash
# 1. Login at /login
# 2. Close browser completely
# 3. Reopen and go to http://localhost:8080/
# 4. Should NOT redirect to /login (session is persistent)
# 5. Should show home page with user authenticated
```

### Test 6: Check User Email Confirmation (if enabled)

If you enabled **"Double opt-in"** email confirmation:

1. After signup, check your email inbox
2. You should receive a confirmation link
3. Click the link to confirm email
4. User account becomes fully active

### Test 7: View User Profile Data

```bash
# 1. Login at /login
# 2. Navigate to http://localhost:8080/profile
# 3. Should show:
#    - User's email address
#    - User ID (UUID)
#    - Member Since date
#    - Statistics (scan count, etc.)
```

---

## 📊 View All User Data in Supabase

### Via Supabase Dashboard:

1. **Authentication** → **Users** tab
   - View all registered users
   - Email, user ID, created date
   - Email confirmation status

2. **Database** → **scan_history** table (once created)
   - View all scan records
   - Each row shows: user_id, disease_name, confidence, created_at, etc.
   - Filter by user_id to see scans for specific user

### Via SQL Query:

```bash
# In Supabase SQL Editor:

-- View all users
SELECT id, email, email_confirmed_at, created_at FROM auth.users;

-- View scan history
SELECT * FROM public.scan_history ORDER BY created_at DESC;

-- View scans for specific user
SELECT * FROM public.scan_history
WHERE user_id = 'USER_ID_HERE'
ORDER BY created_at DESC;
```

---

## 🔐 Logout & Session Management

### Logout Flow

```bash
# 1. When logged in, click "Sign Out" button on /profile page
# 2. Session is cleared from localStorage
# 3. User redirected to /login
# 4. Trying to access other pages redirects to /login
```

### Session Timeout

Supabase sessions are configured to auto-refresh. If needed, manually logout:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LogoutButton() {
  const { signOut } = useAuth();

  return <button onClick={signOut}>Logout</button>;
}
```

---

## 🚀 Next Steps

After verifying signup/login works:

1. **Save Scan Results to Database**:
   - Update `ScanPage.tsx` to save results to `scan_history` table
   - Include image URL from storage

2. **Enable Image Storage**:
   - Create `leaf-images` bucket in Supabase Storage
   - Upload images when user analyzes leaf
   - Store image URL in database

3. **Display Scan History**:
   - Update `HistoryPage.tsx` to fetch from `scan_history` table
   - Show user's past scans with disease, confidence, date

4. **Email Notifications**:
   - Send confirmation email on signup
   - Send disease alerts if high-risk disease detected

---

## ❌ Troubleshooting

### "User not found" on login

- ✅ User email doesn't exist
- ✅ Check spelling in Supabase Users tab
- ✅ Password is case-sensitive

### Signup shows error "User already exists"

- ✅ Account with that email already registered
- ✅ Go to /login instead
- ✅ Use "Forgot password" to reset

### Session not persisting (logged out after refresh)

- ✅ Check browser localStorage isn't cleared
- ✅ Check .env has correct SUPABASE_URL and PUBLISHABLE_KEY
- ✅ Check "Enable Email provider" is ON in Supabase

### Email confirmation not sent

- ✅ Enable email confirmations in Supabase
- ✅ Configure SMTP in Supabase Email Settings
- ✅ Check spam folder

### Cannot login with Google

- ✅ Enable Google provider in Supabase
- ✅ Add valid Google OAuth credentials
- ✅ Check redirect URL matches: `https://dnjqbekznsguhkymhgmn.supabase.co/auth/v1/callback`

---

## 📝 Summary

| Feature             | Status                     | Config Required                        |
| ------------------- | -------------------------- | -------------------------------------- |
| Email/Password Auth | ✅ Ready                   | Enable in Supabase → Providers → Email |
| Google OAuth        | ✅ Ready                   | Optional, add Google credentials       |
| User Signup         | ✅ Live at `/signup`       | None (email enabled)                   |
| User Login          | ✅ Live at `/login`        | None (email enabled)                   |
| Protected Routes    | ✅ All app pages protected | Auto via ProtectedRoute                |
| Session Persistence | ✅ localStorage            | Auto, no config                        |
| Scan History Table  | 📦 Ready to deploy         | Run `supabase db push`                 |
| Image Storage       | 📦 Ready to setup          | Create bucket in Supabase Storage      |

Your FarmScan is **production-ready for authentication**! Just enable email in Supabase and you're good to go.
