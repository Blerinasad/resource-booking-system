# Smart Booking — Frontend v2

Modern React frontend for the Resource Booking System.

## Tech Stack

- **React 18** + Vite
- **Tailwind CSS** (custom design system)
- **React Router v6**
- **Recharts** (charts — Phase 3)
- **Axios** (API client)
- **Lucide React** (icons)
- **Syne + JetBrains Mono** (typography)

## Phases

| Phase | Content | Status |
|-------|---------|--------|
| **1** | Foundation: Auth (Login/Register), Layout, Sidebar, Dashboard overview | ✅ Done |
| **2** | Bookings CRUD, Resources CRUD, Users management | 🔜 |
| **3** | Full Analytics with charts (Peak hours, Usage, Trends) | 🔜 |

## Getting Started

```bash
# Install dependencies
npm install

# Copy env
cp .env.example .env

# Start dev server
npm run dev
```

## Docker

```bash
docker build -t smart-booking-frontend .
docker run -p 80:80 smart-booking-frontend
```

## API

All requests proxy to the API Gateway at `VITE_API_URL` (default: `http://localhost:5000`).
