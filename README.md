# 🧠 Chat-Translator App

## 🔥 Live Demo

![App Demo](./images/landingPage/demo.gif)

A full-stack AI-powered language translation app built with **Next.js 13 App Router**, **Firebase
Auth**, **Firestore**, **Stripe (PRO feature access)**, and **OpenAI**.  
Designed with **ShadCN UI components** and **Tailwind CSS**.

---

## ✨ Features

- 🔐 Google Sign-In via NextAuth.js
- 🌐 Language translation (English, German for free — others as PRO)
- 💬 Real-time chat system
- 🔒 Protected routes with Firebase Auth
- 📦 Firestore for chat and message persistence
- 💳 Stripe integration for unlocking PRO features (e.g. French, Spanish)
- 🎨 Responsive dark-mode UI (Tailwind + ShadCN)
- 📁 Modular app structure using Next.js 13 `app/` router

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Abdulsametdursun/Chat-Translator.App.git
cd Chat-Translator.App

2. Install dependencies

npm install

3. Configure environment variables

Create a .env.local file and add the following values:

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_admin_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=app_id

STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID=your_stripe_price_id

4. Start the development server

npm run dev

Open http://localhost:3000 in your browser.
🧪 Tech Stack

    Next.js 13+ (App Router)

    Firebase Auth & Firestore

    NextAuth.js

    Stripe API

    Tailwind CSS & ShadCN UI

    OpenAI API for language translation

📸 Screenshots

    Add screenshots like dropdown menus, chat UI, or translations here.

📄 License

MIT License
```
