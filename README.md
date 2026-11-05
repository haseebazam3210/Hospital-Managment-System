# MediCare — Hospital Management System

A full-stack, responsive hospital management dashboard built with React, Vite, Express, and MongoDB Atlas. Includes JWT authentication, dashboard analytics, patient/doctor/appointment management, and billing UI.

## Requirements
- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and a long `JWT_SECRET`.
3. `npm run dev` starts the Vite frontend and Express API together.
4. Open http://localhost:5173 and register an account.

For production, build the frontend with `npm run build`, then run `npm start`. The API serves `client/dist` when it exists.

## Project structure
- `client/` — React application
- `server/` — Express API, Mongoose models, auth and resource routes

Never commit real credentials. Atlas connection strings and JWT secrets belong in `.env` only.
