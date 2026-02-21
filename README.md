# @theoyedolayo Content Calendar Website 2026

A highly sophisticated, interactive content calendar website built for **@theoyedolayo**.

## Tech Stack
- **Framework**: Vite + React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Outfit (Google Fonts)

## Features
- **4-Week Interactive Timeline**
- **Brand Strategy Visualization**
- **Content Mix Analytics**
- **Detailed Post Breakdowns** (Scripts, Captions, Hashtags)
- **Glassmorphism Aesthetic**

## ☁️ Permanent Cloud Storage (Supabase)

To ensure your changes are permanent and sync across devices for free, follow these simple steps:

1. Create a free account at [supabase.com](https://supabase.com).
2. Create a new project.
3. In the **SQL Editor**, run this command to create the data table:
   ```sql
   create table content_calendar (
     id bigint primary key generated always as identity,
     payload jsonb not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   
   -- Insert the initial data row
   insert into content_calendar (id, payload) values (1, '{}');
   ```
4. Copy your **Project URL** and **Anon Key** from Project Settings > API.
5. Create a file named `.env` in the root directory and paste them:
   ```env
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Deployment (Free)
This project is optimized for deployment on **Vercel** or **Netlify**. Simply connect your GitHub repository to either platform for instant hosting.
