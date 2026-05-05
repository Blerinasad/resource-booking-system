# Smart Resource Booking System

## 📌 Overview
Smart Resource Booking System është një platformë për menaxhimin e rezervimeve të resurseve si salla, pajisje dhe hapësira pune. Sistemi është ndërtuar me arkitekturë mikroshërbimesh dhe ofron rezervime në kohë reale, autentikim të sigurt dhe menaxhim të përdoruesve.

---

## 🏗️ Architecture
Sistemi përbëhet nga:

- API Gateway
- Auth Service
- Resource Service
- Booking Service
- Frontend (React)

Komunikimi realizohet përmes HTTP API (Gateway).

---

## ⚙️ Technologies

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Docker & Docker Compose

### Frontend
- React (Vite)
- TailwindCSS
- Axios

### DevOps
- Docker
- Jenkins (CI/CD)

---

## 📂 Project Structure

resource-booking-system/ │ ├── backend/ │   ├── api-gateway/ │   ├── services/ │   │   ├── auth-service/ │   │   ├── resource-service/ │   │   └── booking-service/ │   └── README.md │ ├── frontend/ │   └── README.md │ └── README.md

---

## 🚀 Getting Started

### 1. Clone project
bash git clone https://github.com/your-username/resource-booking-system.git cd resource-booking-system 

---

### 2. Run backend (Docker)
bash docker compose up -d --build 

Backend services:
- API Gateway → http://localhost:5000
- Auth Service → 5001
- Resource Service → 5002
- Booking Service → 5003

---

### 3. Run frontend
bash cd frontend npm install npm run dev 

Frontend:
- http://localhost:5173

---

## 🔐 Authentication
- JWT-based authentication
- Roles:
  - Admin
  - User

---

## 📌 Features
- User registration & login
- Resource management (CRUD)
- Booking system
- Role-based access control
- Dashboard UI

---

## 🧪 Testing
Testimi mund të realizohet me:
bash npm test npm run test:coverage 

---

## ⚡ CI/CD
- Jenkins Pipeline
- Docker build & deploy

---

## 📖 Documentation
- Backend → backend/README.md
- Frontend → frontend/README.md

---

## 👨‍💻 Authors
- Getuar Jakupi
- Era Mustafa
- Blerina Sadiku

---

## 📄 License
Projekt akademik – vetëm për përdorim edukat