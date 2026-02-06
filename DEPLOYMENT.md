# Deployment Guide

This app consists of two parts that need to be deployed separately:
1. **Frontend**: React App (Deploy to **Vercel**)
2. **Backend**: Python AI API (Deploy to **Render**)

> **Why not just Vercel?**
> Vercel is optimized for frontend and light serverless functions. Our AI backend uses TensorFlow, which is too large (~500MB) for Vercel's serverless limit (50MB). Render is excellent for hosting Python services and has a generous free tier.

---

## Part 1: Deploy Backend (Render)

1. **Push your code to GitHub** (You have already done this).
2. Go to [https://dashboard.render.com/](https://dashboard.render.com/) and create an account.
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository (`cropguardscan`).
5. Configure the service:
   - **Name**: `cropguard-api` (or similar)
   - **Region**: Choose one close to you.
   - **Root Directory**: `ai` (Important! This tells Render the app is in the ai folder)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -k uvicorn.workers.UvicornWorker app:app`
   - **Instance Type**: Free
6. Click **Create Web Service**.
7. Wait ~5 minutes for it to build and deploy.
8. Once live, copy the URL (e.g., `https://cropguard-api.onrender.com`).

---

## Part 2: Deploy Frontend (Vercel)

1. Go to [https://vercel.com/](https://vercel.com/) and log in.
2. Click **Add New...** -> **Project**.
3. Import your `cropguardscan` repository.
4. Configure the project:
   - **Framework Preset**: Vite (should be auto-detected)
   - **Root Directory**: Leave as `./` (default)
   - **Environment Variables**:
     - Key: `VITE_API_URL`
     - Value: Paste your Render URL from Part 1 (e.g., `https://cropguard-api.onrender.com`)
       *(Make sure to remove any trailing slash `/`)*
5. Click **Deploy**.

---

## Part 3: Connect Supabase (Authentication)

Your App uses Supabase for authentication. You need to tell Supabase about your new live URL.

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project -> **Authentication** -> **URL Configuration**.
3. Add your **Vercel Frontend URL** to the **Site URL** and **Redirect URLs**.
   - Example: `https://cropguardscan.vercel.app`
   - Example Redirect: `https://cropguardscan.vercel.app/**`
4. Click **Save**.

## Verification

1. Open your Vercel URL.
2. Sign up/Login.
3. Go to Scan page.
4. Upload a leaf image.
5. If it works, you will see a result and it will be saved to your History.

🎉 **You are live!**
