# Shramik Profile Web App

Modern React + Vite single-page product website for the Shramik platform.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Configure frontend API URL:

```bash
copy .env.example .env
```

3. Start frontend development server:

```bash
npm run dev
```

4. Start backend API (separate terminal):

```bash
npm run dev:api
```

5. Open:

```text
http://localhost:5173
```

Backend health endpoint:

```text
http://localhost:8080/api/health
```

## Production Build

```bash
npm run build
```

Generated output will be in `dist/`.

Preview production build locally:

```bash
npm run preview
```

## Deployment

### Option 1: Render (frontend + backend)

This repository includes `render.yaml` for Blueprint deployment.

1. Push this folder to GitHub.
2. In Render, create a Blueprint from repo.
3. Render creates:
	- `shramik-api` (Node web service, start command: `npm run start:api`)
	- `shramik-web` (static site, build command: `npm run build`, publish: `dist`)
4. Confirm environment variables:
	- API service: `FRONTEND_ORIGIN=https://shramik-web.onrender.com`
	- Web service: `VITE_API_BASE_URL=https://shramik-api.onrender.com`
5. Redeploy both services after env updates.

### Option 2: Vercel (frontend only)

1. Push this folder to GitHub.
2. Import repository in Vercel.
3. Build settings:
	- Build command: `npm run build`
	- Output directory: `dist`
4. Deploy.

Backend can be hosted separately on Render/Railway using `npm run start:api`.

### Option 3: Netlify (frontend only)

1. Push this folder to GitHub.
2. Import repository in Netlify.
3. Build settings:
	- Build command: `npm run build`
	- Publish directory: `dist`
4. Deploy.

Backend can be hosted separately on Render/Railway using `npm run start:api`.

### Option 4: Docker Compose (local full stack)

```bash
docker compose up --build
```

Services:
- frontend: `http://localhost:5173`
- backend: `http://localhost:8080`

## Project Notes

- `src/App.jsx` contains the full UI and routing logic.
- `src/index.css` contains only base reset styles for clean layout behavior.
- `backend/server.js` contains API routes for health, workers, and contact submissions.
- `backend/.env.example` lists backend environment variables.
