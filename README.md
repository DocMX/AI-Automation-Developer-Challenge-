AI Automation Developer Challenge

This project was developed as part of the AI Automation Developer Challenge. It demonstrates a full-stack solution for building an interactive application using Next.js, Supabase, and TypeScript without relying on local storage for data persistence.

🚀 Features

✅ Next.js 13 (App Router) for server-side rendering and routing.

✅ Supabase as a backend-as-a-service for authentication and database.

✅ Persistent Data Storage via Supabase (no local storage).

✅ Fully typed with TypeScript for better maintainability.

🛠️ Tech Stack

Next.js

Supabase

TypeScript

📂 Project Structure
src/
 ├── app/                # Next.js App Router pages and layouts
 │   ├── lib/            # Supabase client configuration
 │   └── components/     # UI components
 ├── styles/             # Global styles
 └── ...

🔧 Installation

Clone the repository

git clone https://github.com/DocMX/AI-Automation-Developer-Challenge-.git
cd AI-Automation-Developer-Challenge-


Install dependencies

npm install


Set environment variables
Create a .env.local file in the root directory and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Run the development server

npm run dev

▶️ Usage

Navigate to http://localhost:3000

Create and manage items using the Supabase-powered backend.

✅ Deployment

You can deploy this project on Vercel:

vercel

📜 License

This project is licensed under the MIT License.