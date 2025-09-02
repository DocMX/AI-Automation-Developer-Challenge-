
# To-Do List App – AI Automation Developer Challenge

## Description

This is a **To-Do List** application built with **Next.js**, integrated with **Supabase** for data persistence and **N8N** for AI automations.  
The application allows you to add, edit, and complete tasks, while an automated flow in N8N improves task titles using AI (Cursor).  
The frontend has a **vintage notebook** style with `‘Indie Flower’` typography, simulating handwriting.

---

## Main features

- Add tasks
- Edit tasks
- Mark tasks as completed
- Data persistence in **Supabase**
- Automatic title enrichment with AI through **N8N**
- Vintage notebook visual style with handwritten typography

---

## Technologies used

- **Frontend:** Next.js, Tailwind CSS
- **Database:** Supabase
- **Automation/AI:** N8N, Cursor
- **Deployment:** Vercel
- **Typography:** ‘Indie Flower’, cursive

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd name-of-repo
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. Run the app in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Project structure

```
├─ app/
│  ├─ components/
│  │  ├─ NewTodoForm.tsx
│  │  ├─ TodoTable.tsx
│  │  └─ TodoRow.tsx
│  ├─ actions.ts
│  └─ page.tsx
├─ styles/
├─ .env.local
├─ package.json
└─ README.md
```

---

## Using the application

1. **Add a task:**  
   Enter the title in the input field and click **Add**.  
   The title is sent to Supabase and saved permanently.

2. **Edit a task:**  
   Click on the pencil icon, modify the text, and press **Save**.

3. **Mark as completed:**  
   Use the checkbox to mark tasks as completed.  
   Completed tasks are displayed crossed out.

4. **AI automation:**  
   Each task added is sent to **N8N**, where a flow calls **Cursor AI** to automatically improve the title.

---

## Despliegue

The application is deployed on **Vercel**.  
[See live application](https://ai-automation-developer-challenge.vercel.app/)

---



## Contribuciones

This project is part of the **AI Automation Developer Challenge**.  
For improvements or customization, you can modify the React components or N8N workflows.

---

## Licencia

MIT License
