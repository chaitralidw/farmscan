# FarmScan Supabase Integration Guide

## Overview

FarmScan is now fully integrated with Supabase for:

- **Authentication**: User signup/login with email & password or Google OAuth
- **Database**: Store scan history with RLS (Row Level Security) policies
- **Storage**: Upload and store leaf images

## Setup Instructions

### 1. Configure Supabase Project

Your `.env` file already contains Supabase credentials:

```env
VITE_SUPABASE_PROJECT_ID="undszjqqgclpdrploxkr"
VITE_SUPABASE_PUBLISHABLE_KEY="..."
VITE_SUPABASE_URL="https://undszjqqgclpdrploxkr.supabase.co"
```

### 2. Enable Authentication Methods

Go to your Supabase dashboard:

1. **Email/Password Auth** (already enabled by default):
   - Navigate to: **Authentication** → **Providers** → **Email**
   - Ensure "Enable Email provider" is checked

2. **Google OAuth** (recommended):
   - Go to: **Authentication** → **Providers** → **Google**
   - Add your Google OAuth credentials from Google Cloud Console
   - Set redirect URL: `https://undszjqqgclpdrploxkr.supabase.co/auth/v1/callback`

### 3. Apply Database Schema

Run the migration to create the `scan_history` table:

```bash
cd supabase
supabase link --project-ref undszjqqgclpdrploxkr
supabase db push
```

Or manually in Supabase dashboard:

1. Go to **SQL Editor**
2. Click **New Query**
3. Copy-paste the SQL from `supabase/migrations/20260205_create_scan_history.sql`
4. Click **Run**

### 4. Create Storage Bucket for Images

In Supabase dashboard:

1. Go to **Storage**
2. Click **New bucket**
3. Name it: `leaf-images`
4. Make it **Private** (for security)
5. Click **Create bucket**

Then set RLS policies:

```sql
-- Allow users to upload images
create policy "Users can upload their own images"
on storage.objects for insert
with check (bucket_id = 'leaf-images' and auth.uid() = owner);

-- Allow users to view their own images
create policy "Users can view their own images"
on storage.objects for select
using (bucket_id = 'leaf-images' and auth.uid() = owner);

-- Allow users to delete their own images
create policy "Users can delete their own images"
on storage.objects for delete
using (bucket_id = 'leaf-images' and auth.uid() = owner);
```

## New Routes

The app now includes authentication pages:

- `/login` - User login page
- `/signup` - User registration page
- `/profile` - User profile & account settings

## Usage in Components

### Using the Auth Context

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, session, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Saving Scan Results to Database

```tsx
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

function SaveScan({ diseaseName, confidence, imageUrl }) {
  const { user } = useAuth();

  const saveScan = async () => {
    const { error } = await supabase.from("scan_history").insert({
      user_id: user.id,
      disease_name: diseaseName,
      confidence: confidence,
      is_healthy: !diseaseName,
      image_url: imageUrl,
    });

    if (error) console.error("Error saving scan:", error);
  };

  return <button onClick={saveScan}>Save Scan</button>;
}
```

### Uploading Images to Storage

```tsx
const uploadImage = async (file: File) => {
  const fileName = `${user.id}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("leaf-images")
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("leaf-images").getPublicUrl(fileName);

  return publicUrl;
};
```

### Fetching User's Scan History

```tsx
const fetchScanHistory = async () => {
  const { data, error } = await supabase
    .from("scan_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching scans:", error);
  return data;
};
```

## Protected Routes (Optional)

To protect routes so only logged-in users can access them:

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return element;
}

// Usage in Routes
<Route path="/scan" element={<ProtectedRoute element={<ScanPage />} />} />;
```

## Environment Variables

Your `.env` already has all required variables. If needed, regenerate Supabase keys:

1. Go to **Project Settings** → **API**
2. Copy `Project URL` → `VITE_SUPABASE_URL`
3. Copy `anon public` key → `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Project ID is visible in the URL or settings

## Testing Authentication

1. Start the dev server: `npm run dev`
2. Navigate to `/signup` and create a test account
3. Verify email confirmation link (if enabled)
4. Log in at `/login`
5. View profile at `/profile`
6. Perform a scan and it will be saved to the database

## Security Notes

- **RLS Policies**: All scan data is protected by Row Level Security - users can only see their own data
- **Storage**: Images are stored privately and only accessible to the uploading user
- **Secrets**: Never commit `.env` file to git. Use `.env.local` for local development
- **Google OAuth**: Requires valid OAuth credentials from Google Cloud Console

## Next Steps

1. Update the `ScanPage` to save results to the database
2. Update the `HistoryPage` to display user's scan history from the database
3. Integrate image upload to storage bucket
4. Add email notifications for scan results (optional)
5. Implement scan analytics and statistics

## Support

For more info on Supabase features:

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
