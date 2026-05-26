# TheMealDB Explorer

Production-ready full-stack recipe discovery app built for technical assessment scenarios. It combines a typed Express API, in-memory caching, and a polished React + Vite frontend with favorites, theme switching, debounced search, and infinite scroll.

![Architecture](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Architecture](https://img.shields.io/badge/Backend-Express%20%2B%20TypeScript-3178C6)
![Architecture](https://img.shields.io/badge/Cache-In--Memory%20TTL-FF6F00)

## Features

- Debounced recipe search with loading skeletons and empty states
- Category browser with dedicated category meal pages
- Random meal generator modal ("I'm Feeling Hungry")
- Rich recipe details page (ingredients, instructions, tags, YouTube embed, source link)
- Favorites persisted in `localStorage`
- Recent searches persisted in `localStorage`
- Dark/light theme toggle
- Infinite scroll pagination for search/category results
- Dynamic SEO page titles via a reusable document title hook
- Error boundaries, retry states, and toast notifications
- Backend cache with TTL + max size eviction
- API rate limiting, validation, logging, and centralized error handling

## Tech Stack

### Frontend
- React 19 + Vite + TypeScript
- Tailwind CSS
- React Router
- Axios
- Zustand (persisted preferences)
- Lucide React
- Vitest + React Testing Library

### Backend
- Node.js + Express 5 + TypeScript
- Axios upstream client
- In-memory cache abstraction
- Jest + Supertest

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── cache/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   └── public/
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 20+
- npm 10+

## Installation

```bash
npm install
```

Copy environment templates:

```bash
cp .env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Running Locally

Start backend and frontend together:

```bash
npm run dev
```

Or run individually:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:4000](http://localhost:4000)

The Vite dev server proxies `/api` requests to the backend, so the frontend never calls TheMealDB directly.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | API port | `4000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `THEMEALDB_API_KEY` | TheMealDB test key | `1` |
| `THEMEALDB_BASE_URL` | Upstream API base URL | `https://www.themealdb.com/api/json/v1` |
| `THEMEALDB_TIMEOUT_MS` | Upstream timeout | `8000` |
| `CACHE_DEFAULT_TTL_SECONDS` | Default cache TTL | `300` |
| `CACHE_MAX_ITEMS` | Max cache entries | `250` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `60000` |
| `RATE_LIMIT_MAX` | Max requests per window | `120` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base path | `/api` |

## API Endpoints

All responses use `{ data, meta? }` and errors use `{ error: { message, status } }`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health + cache stats |
| `GET` | `/api/meals/search?q=chicken` | Search meals by name |
| `GET` | `/api/meals/random` | Get random meal details |
| `GET` | `/api/meals/:id` | Get meal details by id |
| `GET` | `/api/categories` | List categories |
| `GET` | `/api/categories/:name/meals` | Meals in category |

### Example

```bash
curl "http://localhost:4000/api/meals/search?q=Arrabiata"
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run backend + frontend concurrently |
| `npm run build` | Build both workspaces |
| `npm test` | Run backend + frontend tests |
| `npm run lint` | Lint both workspaces |

## Docker

```bash
docker compose up --build
```

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:4000](http://localhost:4000)

Nginx serves the frontend and proxies `/api` to the backend container.

## Testing

```bash
npm test
```

- Backend: cache behavior, transformers, route integration (mocked upstream API)
- Frontend: component rendering tests



## Architecture Notes

- **Service layer**: controllers stay thin; `MealService` owns business logic and cache keys.
- **Cache abstraction**: `MemoryCache` enforces TTL expiry, LRU-style eviction, and periodic cleanup.
- **Security/ops**: helmet, CORS allowlist, request logging, and rate limiting.
- **Frontend state**: Zustand persist store for theme, favorites, and recent searches.
- **Performance**: route-level lazy loading, debounced search, memoized pagination slices, image lazy loading.






