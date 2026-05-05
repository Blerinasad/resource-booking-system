# Smart Resource Booking System — Backend

Backend-i i projektit është ndërtuar me arkitekturë **microservices**, ku secili shërbim ka përgjegjësi të ndarë dhe komunikon përmes **API Gateway**, **REST API** dhe **Kafka events**. Sistemi mbulon autentikim, menaxhim të resurseve, rezervime dhe analytics.

## Përmbajtja

- [Arkitektura](#arkitektura)
- [Teknologjitë](#teknologjitë)
- [Struktura e folderëve](#struktura-e-folderëve)
- [Shërbimet](#shërbimet)
- [Portet](#portet)
- [Databazat](#databazat)
- [Konfigurimi me .env](#konfigurimi-me-env)
- [Ekzekutimi me Docker](#ekzekutimi-me-docker)
- [Seed data](#seed-data)
- [API endpoints](#api-endpoints)
- [Autentikimi dhe autorizimi](#autentikimi-dhe-autorizimi)
- [Kafka events](#kafka-events)
- [CI/CD me Jenkins](#cicd-me-jenkins)
- [Health checks](#health-checks)
- [Troubleshooting](#troubleshooting)

---

## Arkitektura

Sistemi përdor arkitekturë të ndarë në microservices:

```txt
Frontend
   |
   v
API Gateway :5000
   |
   |-- Auth Service :5001
   |-- Resource Service :5002
   |-- Booking & Analytics Service :5003

Infrastructure:
   |-- MySQL :3307
   |-- MongoDB :27017
   |-- Kafka :9092 / 29092
   |-- Zookeeper :2181
```

API Gateway është pika hyrëse për frontend-in. Ai bën proxy request-at drejt shërbimeve përkatëse dhe aplikon middleware për autentikim, autorizim dhe rate limiting.

---

## Teknologjitë

- **Node.js 20**
- **Express.js**
- **MySQL 8**
- **Sequelize ORM**
- **MongoDB 7**
- **Mongoose**
- **Apache Kafka** me **KafkaJS**
- **Docker & Docker Compose**
- **JWT Authentication**
- **RBAC**: `admin`, `user`
- **Jenkins Pipeline** për CI/CD
- **Nodemon** për development runtime

---

## Struktura e folderëve

```txt
backend/
├── api-gateway/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── services/
│   ├── auth-service/
│   ├── resource-service/
│   └── booking-analytics-service/
│
├── infrastructure/
│   └── mysql/
│       └── init.sql
│
├── docker-compose.yml
├── Jenkinsfile
├── seed.js
└── README.md
```

---

## Shërbimet

### 1. API Gateway

**Port:** `5000`

Përgjegjësitë:

- Pika qendrore hyrëse për frontend.
- Proxy për `/api/auth`, `/api/users`, `/api/resources`, `/api/bookings`, `/api/analytics`.
- Validon JWT për route të mbrojtura.
- Kontrollon role për route të adminit.
- Aplikon rate limiting.
- Ofron health endpoint.

### 2. Auth Service

**Port:** `5001`

Përgjegjësitë:

- Regjistrim përdoruesi.
- Login.
- Refresh token.
- Logout.
- Marrja e profilit aktual.
- Lista e përdoruesve për admin.
- Ruajtja e përdoruesve në MySQL.

### 3. Resource Service

**Port:** `5002`

Përgjegjësitë:

- CRUD për resurse.
- Filtrim/listim i resurseve.
- Kontroll i qasjes me role.
- Vetëm admin mund të krijojë, ndryshojë dhe fshijë resurse.
- Ruajtja e resurseve në MySQL.
- Publikim eventesh në Kafka kur nevojitet.

### 4. Booking & Analytics Service

**Port:** `5003`

Përgjegjësitë:

- Krijim rezervimi.
- Kontroll konfliktesh në orare.
- Listim rezervimesh.
- Cancel booking nga përdoruesi.
- Approve/reject booking nga admini.
- Analytics dashboard.
- Ruajtja e rezervimeve në MySQL.
- Ruajtja/agregimi i analytics në MongoDB.
- Consumer Kafka për evente.
- Cron job për përditësim statusesh.

---

## Portet

| Komponenti | Port lokal | Përshkrimi |
|---|---:|---|
| API Gateway | `5000` | Entry point për frontend |
| Auth Service | `5001` | Autentikim dhe users |
| Resource Service | `5002` | Resources CRUD |
| Booking Analytics Service | `5003` | Bookings dhe analytics |
| MySQL | `3307` | MySQL ekspozohet jashtë container-it |
| MongoDB | `27017` | MongoDB për analytics |
| Kafka | `9092`, `29092` | Event broker |
| Zookeeper | `2181` | Kafka dependency |

---

## Databazat

Projekti përdor model hibrid të ruajtjes së të dhënave:

### MySQL

Përdoret për të dhëna transaksionale:

- Users
- Refresh tokens
- Resources
- Bookings

Databazat kryesore:

```txt
smart_booking_auth
smart_booking_resources
smart_booking_bookings
```

### MongoDB

Përdoret për analytics/logs/agregime:

```txt
smart_booking
```

---

## Konfigurimi me .env

Secili shërbim ka `.env` të vetin.

### API Gateway

```env
PORT=5000
NODE_ENV=development

AUTH_SERVICE_URL=http://auth-service:5001
RESOURCE_SERVICE_URL=http://resource-service:5002
BOOKING_SERVICE_URL=http://booking-analytics-service:5003

JWT_SECRET=your_jwt_secret

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

`RATE_LIMIT_WINDOW_MS=900000` do të thotë 15 minuta.  
`RATE_LIMIT_MAX=100` do të thotë 100 request brenda asaj dritareje kohore.

Për development mund ta rrisësh, p.sh.:

```env
RATE_LIMIT_MAX=1000
```

Pas ndryshimit duhet restart:

```bash
docker compose down
docker compose up -d --build
```

### Auth Service

```env
PORT=5001
NODE_ENV=development

DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=smart_booking_auth

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
REFRESH_COOKIE_NAME=refreshToken

KAFKA_BROKER=kafka:9092
KAFKA_CLIENT_ID=auth-service
```

### Resource Service

```env
PORT=5002
NODE_ENV=development

DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=smart_booking_resources

JWT_SECRET=your_jwt_secret
KAFKA_BROKER=kafka:9092
KAFKA_CLIENT_ID=resource-service
```

### Booking Analytics Service

```env
PORT=5003
NODE_ENV=development

DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=smart_booking_bookings

MONGO_URI=mongodb://mongodb:27017/smart_booking
MONGO_DB_NAME=smart_booking

JWT_SECRET=your_jwt_secret
KAFKA_BROKER=kafka:9092
KAFKA_CLIENT_ID=booking-analytics-service
```

**Kujdes:** në production nuk duhet të ruhen sekrete reale në repository.

---

## Ekzekutimi me Docker

Nga folderi `backend`:

```bash
cd backend
docker compose up -d --build
```

Kontrollo container-at:

```bash
docker compose ps
```

Shiko log-at:

```bash
docker compose logs -f api-gateway
docker compose logs -f auth-service
docker compose logs -f resource-service
docker compose logs -f booking-analytics-service
```

Ndalo sistemin:

```bash
docker compose down
```

Ndalo dhe fshi volumes/databazat:

```bash
docker compose down -v
```

---

## Seed data

Projekti ka script për mbushje automatike me të dhëna demo.

Nga folderi `backend`:

```bash
npm install
node seed.js
```

Seed script shton:

- Admin user.
- Përdorues demo.
- Resources demo.
- Bookings demo.
- Të dhëna për analytics.

Kredencialet demo nga seed:

```txt
Admin:
email: admin@test.js
password: 123456

User:
email: blerima.sadiku@test.js
password: 123456
```

Para seed duhet që Docker services të jenë running:

```bash
docker compose up -d
```

---

## API endpoints

Të gjitha endpoint-et përdoren nga frontend përmes API Gateway:

```txt
Base URL: http://localhost:5000/api
```

### Auth

| Method | Endpoint | Access | Përshkrimi |
|---|---|---|---|
| POST | `/auth/register` | Public | Regjistron përdorues |
| POST | `/auth/login` | Public | Login dhe kthim token |
| POST | `/auth/refresh-token` | Public | Refresh access token |
| POST | `/auth/logout` | Public | Logout |

Shembull login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.js","password":"123456"}'
```

### Users

| Method | Endpoint | Access | Përshkrimi |
|---|---|---|---|
| GET | `/users/me` | Authenticated | Kthen përdoruesin aktual |
| GET | `/users` | Admin | Kthen listën e përdoruesve |

### Resources

| Method | Endpoint | Access | Përshkrimi |
|---|---|---|---|
| GET | `/resources` | Authenticated | Lista e resurseve |
| GET | `/resources/:id` | Authenticated | Detajet e një resource |
| POST | `/resources` | Admin | Krijon resource |
| PUT | `/resources/:id` | Admin | Përditëson resource |
| DELETE | `/resources/:id` | Admin | Fshin resource |

Shembull create resource:

```bash
curl -X POST http://localhost:5000/api/resources \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{
    "name":"Salla A101",
    "type":"room",
    "capacity":35,
    "location":"Ndertesa A",
    "status":"available",
    "description":"Salle me projektor"
  }'
```

### Bookings

| Method | Endpoint | Access | Përshkrimi |
|---|---|---|---|
| GET | `/bookings` | Authenticated | Lista e rezervimeve |
| GET | `/bookings/:id` | Authenticated | Detajet e rezervimit |
| POST | `/bookings` | Authenticated | Krijon rezervim |
| PATCH | `/bookings/:id/cancel` | Authenticated | Anulon rezervim |

Shembull create booking:

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{
    "resourceId": 1,
    "startTime": "2026-05-10T09:00:00.000Z",
    "endTime": "2026-05-10T10:00:00.000Z",
    "purpose": "Ligjerate"
  }'
```

### Admin Bookings

| Method | Endpoint | Access | Përshkrimi |
|---|---|---|---|
| PATCH | `/bookings/admin/:id/approve` | Admin | Aprovon rezervim |
| PATCH | `/bookings/admin/:id/reject` | Admin | Refuzon rezervim |
| POST | `/bookings/admin/run-status-job` | Admin | Ekzekuton status job manualisht |

### Analytics

| Method | Endpoint | Access | Përshkrimi |
|---|---|---|---|
| GET | `/analytics/summary` | Admin | Përmbledhje statistikore |
| GET | `/analytics/most-used-resources` | Admin | Resources më të përdorura |
| GET | `/analytics/top-users` | Admin | Përdoruesit më aktivë |
| GET | `/analytics/bookings-by-day` | Admin | Rezervime sipas ditës |
| GET | `/analytics/peak-hours` | Admin | Orët më të ngarkuara |

---

## Autentikimi dhe autorizimi

Sistemi përdor JWT.

Flow:

1. Përdoruesi bën login.
2. Backend kthen access token.
3. Frontend e ruan token-in.
4. Çdo request i mbrojtur dërgohet me header:

```txt
Authorization: Bearer TOKEN_HERE
```

Role:

```txt
admin - qasje e plotë në users, resources, approval/rejection, analytics
user  - krijon dhe menaxhon rezervimet e veta
```

---

## Kafka events

Kafka përdoret për komunikim event-driven midis shërbimeve.

Roli në sistem:

- Zvogëlon varësinë direkte midis shërbimeve.
- Mundëson zgjerim më të lehtë të analytics.
- Lejon consumer për evente booking/resource/user.

Konfigurimi bazë:

```env
KAFKA_BROKER=kafka:9092
```

---

## CI/CD me Jenkins

Jenkinsfile ndodhet këtu:

```txt
backend/Jenkinsfile
```

Në Jenkins konfigurimi duhet të jetë:

```txt
Definition: Pipeline script from SCM
SCM: Git
Repository URL: <repo-url>
Branch: */main
Script Path: backend/Jenkinsfile
```

Pipeline kryen:

1. Checkout nga Git.
2. Install dependencies për gateway dhe services.
3. Docker build.
4. Docker compose up.
5. Health checks për portet `5000`, `5001`, `5002`, `5003`.
6. Shfaq statusin e containers.

Në Windows Jenkins përdoren komanda `bat`. Nëse Jenkins ekzekutohet në Linux, komandat duhet të ndryshohen nga `bat` në `sh`.

---

## Health checks

Kontrollo shërbimet:

```bash
curl http://localhost:5000/health
curl http://localhost:5001/health
curl http://localhost:5002/health
curl http://localhost:5003/health
```

Response pritet të jetë i ngjashëm:

```json
{
  "success": true,
  "service": "api-gateway",
  "status": "healthy"
}
```

---

## Troubleshooting

### 1. UI merr 429 Too Many Requests

Rrite rate limit në `backend/api-gateway/.env`:

```env
RATE_LIMIT_MAX=1000
```

Pastaj restart:

```bash
docker compose down
docker compose up -d --build
```

### 2. Frontend nuk lidhet me backend

Kontrollo që frontend `.env` ka:

```env
VITE_API_URL=http://localhost:5000
```

Dhe backend duhet të jetë running:

```bash
docker compose ps
```

### 3. Login/Register nuk punon

Kontrollo logs:

```bash
docker compose logs -f api-gateway
docker compose logs -f auth-service
```

Kontrollo që `JWT_SECRET` është i njëjtë në gateway dhe services.

### 4. Bookings nuk krijohen

Kontrollo:

- A je logged in?
- A po dërgohet token?
- A ekziston resourceId?
- A ka konflikt orari?
- A po dërgohet fusha `purpose`?

Logs:

```bash
docker compose logs -f booking-analytics-service
```

### 5. Kafka nuk starton menjëherë

Kafka mund të marrë më shumë kohë për start. Prit 30-60 sekonda dhe kontrollo:

```bash
docker compose logs -f kafka
```

---

## Komanda të shpejta

```bash
# Start backend
cd backend
docker compose up -d --build

# Status containers
docker compose ps

# Logs gateway
docker compose logs -f api-gateway

# Run seed
node seed.js

# Stop
docker compose down
```

---

## Përfundim

Backend-i ofron bazë të plotë për një sistem modern të rezervimit të resurseve: microservices, API Gateway, JWT, RBAC, MySQL, MongoDB, Kafka, Docker dhe CI/CD me Jenkins. Arkitektura është e ndarë, e zgjerueshme dhe e përshtatshme për dokumentim akademik dhe demonstrim praktik.
