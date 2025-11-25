# Healthy Habit Tracker

Live demo: https://healthytrackerr.netlify.app/

---

## Project Overview

**Healthy Habit Tracker** is a lightweight, responsive single-page application built with **HTML**, **Tailwind CSS**, and **Vanilla JavaScript**. It uses **Firebase** for authentication and real-time data storage so users can create, track, and manage daily habits, view streaks, track moods, and see a simple wellness score.

This project is ideal as a portfolio piece demonstrating front-end UI skills, Tailwind-based styling, client-side state management, and Firebase integration (Authentication + Firestore/Realtime DB).

---

## Key Features

- User authentication (Sign up / Sign in) via Firebase Auth.
- Create, edit, and delete habits (Meditation, Fitness, Sleep, Hydration, Nutrition, etc.).
- Mark habits as completed for the day.
- Track habit streaks and history.
- Save and display mood entries per habit.
- A simple “wellness score” computed from habit completions and mood.
- Responsive layout with a clean UI built using Tailwind CSS.
- Edit / delete habit entries and manage profile information.

---

## Tech Stack

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Firebase (Authentication, Firestore or Realtime Database)
- Netlify (for hosting) — Live on the provided link

---

## Live Demo

Open the app: https://healthytrackerr.netlify.app/

---

## Folder Structure 

```
/ (project root)
├─ index.html
├─ styles.css        # Tailwind output or custom CSS
├─ app.js            # Main JavaScript logic
└─ README.md
```

---

## Setup & Run Locally

> **Prerequisites**: Node & npm (optional, only needed if you use Tailwind CLI), and a Firebase project.

1. Clone the repository:

```bash
git clone <your-repo-url>
cd healthy-habit-tracker
```

2. Install Tailwind (only if you're rebuilding CSS):

```bash
npm init -y
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Configure `tailwind.config.js` and your input CSS (see Tailwind docs).

3. Open `index.html` in a browser for a static preview.

4. To use Firebase features locally, create a Firebase project and add the web app config.

---

## Firebase Integration (quick guide)

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** (Email/Password or Google provider as desired).
3. Create a **Firestore** database (or Realtime Database) and configure the rules for your app.
4. In the Firebase project settings, register a new Web app and copy the config object.
5. Paste the Firebase config into your project (e.g., in `app.js` or a dedicated `firebase-config.js`), and initialize Firebase:

```js
// Example (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
```

6. Use `firebase.auth()` for sign-in / sign-up flows and Firestore (`firebase.firestore()`) for storing habits, completions, moods, and user metadata.

**Security tip:** Never commit your actual API keys or service account files to a public repo. Use environment variables or a separate config file not checked into source control.

---

## How the App Works (summary)

- After sign-in, the app fetches the logged-in user’s habit list from Firebase and renders the dashboard.
- Users can add a habit (title, category, optional goal or frequency) and it is saved to Firestore.
- Each day users mark habits complete; completion entries update streak logic and wellness score.
- Mood entries are optional and attached to specific habit completion records.
- The dashboard summarizes streaks, today's completions, and an aggregated wellness score.

---

## Customization Ideas / To-do

- Add calendar-based visualization for habit completions.
- Add analytics charts (weekly / monthly trends).

---

## Author / Contact

Manisha Pal.
Email:mellobar098@gmail.com

---


