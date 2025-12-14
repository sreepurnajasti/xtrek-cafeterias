# xtrek cafeterias

Microsite for xtrek cafeterias built with React, TypeScript, Tailwind CSS and a Node.js backend.

- Public, bilingual site (English and French)
- Accessible UI with keyboard and screen reader support
- Daily menu with ingredients hidden by default
- Integration with the provided pricing Lambda endpoint
- Simple admin view for the head chef to update the menu

---

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Vitest  
- Backend: Node.js, Express, Jest, Supertest, node-cron

---

## Prerequisites

- Node.js 18 or later  
- npm

---

## Setup

Clone the repository:


git clone https://github.com/sreepurnajasti/xtrek-cafeterias.git

cd xtrek-cafeterias

---

## Backend

cd server

npm install

npm start


The API runs at:
http://localhost:4000

API Endpoints

GET /api/menu — fetch current menu

PUT /api/menu — update menu

GET /api/prices/daily — get daily prices (weekly cache)

POST /api/prices/catering — get catering prices by cafeteria

---

## Frontend (React + Vite)

In a second terminal, run:

cd xtrek-cafeterias   # if not already there

npm install

npm run dev


Vite will start on something like:
http://localhost:5173

Dev Proxy

The Vite config forwards /api/* requests to the backend at http://localhost:4000.

🔗 URLs

Public microsite: http://localhost:5173/

Admin view for chef: http://localhost:5173/admin

---

## Frontend Test

npm test

---

## Backend Test
cd server

npm test
