# AI-Based Smart Complaint Management System

MERN Stack project for online complaint registration, complaint tracking, AI-based categorization, secure authentication, and Render deployment readiness.

## Features

- Complaint registration with name, email, title, description, category, location, and status
- Complaint list page with category filtering, text search, and location search
- Complaint status update page for users and admins
- AI complaint analysis for priority detection, department recommendation, summary, and auto-response
- JWT authentication with bcrypt password hashing
- MongoDB integration with validation and protected APIs
- Render deployment config for frontend and backend

## Tech Stack

- Frontend: React, Vite, Axios, React Router
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB Atlas
- AI: OpenRouter API with heuristic fallback
- Deployment: Render

## Project Structure

```text
AIFSD ESE/
  client/
  server/
  render.yaml
  REPORT.md
  README.md
```

## Local Setup

1. Install dependencies from the project root:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

2. Configure environment files:

- `server/.env` from `server/.env.example`
- `client/.env` from `client/.env.example`

3. Run the app:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173` and backend runs at `http://localhost:5000`.

## Important API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/complaints`
- `GET /api/complaints`
- `PUT /api/complaints/:id`
- `DELETE /api/complaints/:id`
- `GET /api/complaints/search?location=Ghaziabad`
- `POST /api/ai/analyze`

## Render Deployment

- Backend service root: `server`
- Frontend service root: `client`
- Render blueprint: `render.yaml`

## Exam Submission Notes

- `REPORT.md` contains the written project report structure.
- Add screenshots for UI output, API testing, MongoDB data, and Render deployment before PDF export.
