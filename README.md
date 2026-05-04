# Smart Resource Booking System

## 📁 Struktura
```
project-final/
├── backend/          ← Mikroshërbimet + Docker
│   ├── docker-compose.yml
│   ├── api-gateway/
│   ├── services/
│   │   ├── auth-service/
│   │   ├── resource-service/
│   │   └── booking-analytics-service/
│   └── infrastructure/
└── frontend/         ← React + Vite
```

## 🚀 Si të startosh

### 1. Backend (Docker)
```bash
cd backend
docker compose down
docker compose build --no-cache
docker compose up -d
```

Prit ~30 sekonda, pastaj kontrollo:
```bash
docker compose ps
```
Të gjitha duhet të jenë **Up**.

### 2. Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```

Hap browser: **http://localhost:5173**

### 3. Demo login
- Email: `admin@test.com`
- Password: `123456`

## 🔌 Ports
| Shërbimi | Port |
|----------|------|
| Frontend (Vite) | 5173 |
| API Gateway | 5000 |
| Auth Service | 5001 |
| Resource Service | 5002 |
| Booking Analytics | 5003 |
| MySQL | 3307 |
| MongoDB | 27017 |
| Kafka | 9092 |

## ⚙️ Si funksionon routing
```
Browser → localhost:5173/api/*
       → Vite Proxy → localhost:5000/api/*
       → API Gateway → microservice
```
