# Smart Resource Booking System — Frontend

Frontend-i është ndërfaqja web e sistemit **Smart Resource Booking System**. Aplikacioni është ndërtuar me **React**, **Vite**, **Tailwind CSS** dhe komunikon me backend-in përmes **API Gateway**.

## Përmbajtja

- [Qëllimi](#qëllimi)
- [Teknologjitë](#teknologjitë)
- [Struktura e projektit](#struktura-e-projektit)
- [Konfigurimi](#konfigurimi)
- [Ekzekutimi lokal](#ekzekutimi-lokal)
- [Build për production](#build-për-production)
- [Lidhja me backend](#lidhja-me-backend)
- [Faqet kryesore](#faqet-kryesore)
- [Rolet dhe qasja](#rolet-dhe-qasja)
- [Shërbimet API në frontend](#shërbimet-api-në-frontend)
- [Komponentët kryesorë](#komponentët-kryesorë)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

---

## Qëllimi

Frontend-i mundëson:

- Regjistrim dhe login.
- Dashboard për përdorues dhe admin.
- Shfaqje të resurseve.
- CRUD për resurse nga admini.
- Krijim dhe menaxhim të rezervimeve.
- Aprovim/refuzim rezervimesh nga admini.
- Analytics dashboard me charts.
- Menaxhim të përdoruesve nga admini.
- UI responsive për desktop dhe mobile.

---

## Teknologjitë

- **React**
- **Vite**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **Lucide React Icons**
- **Recharts** për grafika/analytics
- **Nginx** për serving në Docker/production

---

## Struktura e projektit

```txt
frontend/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   │
│   ├── components/
│   │   ├── analytics/
│   │   ├── bookings/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── resources/
│   │
│   ├── config/
│   │   ├── api.js
│   │   └── constants.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── dashboard/
│   │   ├── errors/
│   │   ├── resources/
│   │   └── users/
│   │
│   ├── services/
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── bookingService.js
│   │   ├── resourceService.js
│   │   ├── analyticsService.js
│   │   └── userService.js
│   │
│   ├── utils/
│   └── styles/
│
├── Dockerfile
├── nginx.conf
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Konfigurimi

Frontend përdor `.env` për URL të backend-it.

File:

```txt
frontend/.env
```

Vlera:

```env
VITE_API_URL=http://localhost:5000
```

Kjo do të thotë që frontend dërgon request-a te API Gateway në portin `5000`.

Nëse API Gateway është në server tjetër, ndryshoje kështu:

```env
VITE_API_URL=http://server-ip:5000
```

Pas ndryshimit të `.env`, duhet restart i frontend development server.

---

## Ekzekutimi lokal

Nga folderi `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Aplikacioni hapet zakonisht në:

```txt
http://localhost:5173
```

Backend duhet të jetë running para se të përdoren login, bookings, resources dhe analytics.

---

## Build për production

```bash
npm run build
```

Output krijohet në:

```txt
dist/
```

Preview lokal:

```bash
npm run preview
```

---

## Lidhja me backend

Frontend nuk lidhet direkt me microservices. Ai lidhet vetëm me API Gateway:

```txt
Frontend -> http://localhost:5000/api -> API Gateway -> Services
```

Base URL konfigurohet në:

```txt
src/config/api.js
```

dhe përdoret nga:

```txt
src/services/apiClient.js
```

Request-at e mbrojtur dërgojnë token-in JWT në header:

```txt
Authorization: Bearer <token>
```

---

## Faqet kryesore

### Auth pages

```txt
/login
/register
```

Përdoren për hyrje dhe regjistrim.

### Dashboard

```txt
/dashboard
```

Faqja kryesore pas login. Shfaq përmbledhje të sistemit.

### Bookings

```txt
/dashboard/bookings
/dashboard/bookings/create
/dashboard/bookings/:id
```

Përdoruesi mund të:

- shohë rezervimet;
- krijojë rezervim;
- shohë detaje;
- anulojë rezervim.

Admini mund të:

- aprovojë rezervime;
- refuzojë rezervime;
- shohë më shumë të dhëna.

### Resources

```txt
/dashboard/resources
/dashboard/resources/create
/dashboard/resources/:id
/dashboard/resources/:id/edit
```

Admini mund të krijojë, ndryshojë dhe fshijë resurse. Përdoruesit e zakonshëm mund t’i shohin resources për rezervim.

### Analytics

```txt
/dashboard/analytics
```

Faqe për admin. Shfaq:

- summary cards;
- most used resources;
- top users;
- bookings by day;
- peak hours.

### Users

```txt
/dashboard/users
```

Faqe vetëm për admin. Shfaq listën e përdoruesve.

---

## Rolet dhe qasja

Sistemi ka dy role kryesore:

```txt
admin
user
```

### Admin

Ka qasje në:

- Dashboard
- Bookings
- Resources CRUD
- Analytics
- Users
- Approve/reject bookings

### User

Ka qasje në:

- Dashboard
- Bookings
- Create booking
- Resources list
- Cancel own booking

Route-t admin ruhen në frontend dhe në backend. Frontend e fsheh UI-në, ndërsa backend e bllokon realisht me middleware.

---

## Shërbimet API në frontend

API thirrjet janë të ndara në service files.

### `apiClient.js`

Qendra kryesore për Axios:

- vendos base URL;
- shton Authorization header;
- trajton gabime bazike;
- përdoret nga të gjitha service files.

### `authService.js`

Përdoret për:

- login;
- register;
- logout;
- get current user.

### `resourceService.js`

Përdoret për:

- get resources;
- get resource by id;
- create resource;
- update resource;
- delete resource.

### `bookingService.js`

Përdoret për:

- get bookings;
- get booking details;
- create booking;
- cancel booking;
- approve booking;
- reject booking.

### `analyticsService.js`

Përdoret për:

- summary;
- most used resources;
- top users;
- bookings by day;
- peak hours.

### `userService.js`

Përdoret për:

- list users;
- current user data.

---

## Komponentët kryesorë

### Common components

```txt
Button
Card
Input
Textarea
Select
Modal
Loader
Badge
EmptyState
PageHeader
```

Këta komponentë ripërdoren në gjithë UI-në.

### Navigation

```txt
Sidebar
MobileSidebar
Navbar
```

Sidebar përdoret për navigim në dashboard. Për layout stabil duhet të mbahet sticky/fixed-height, në mënyrë që butoni Sign out të mos largohet poshtë kur faqja ka shumë content.

### Bookings components

```txt
BookingForm
BookingTable
BookingCard
BookingStatusBadge
```

Përdoren për formën, listën dhe statuset e rezervimeve.

### Resources components

```txt
ResourceForm
ResourceTable
ResourceCard
ResourceFilters
```

Përdoren për listim, krijim dhe editim të resurseve.

### Analytics components

```txt
StatCard
ChartCard
BookingsByDayChart
MostUsedResourcesChart
PeakHoursChart
TopUsersChart
```

Përdoren për dashboard-in analitik.

---

## Docker

Frontend ka `Dockerfile` dhe `nginx.conf`.

Build image:

```bash
docker build -t smart-resource-booking-frontend .
```

Run container:

```bash
docker run -p 3000:80 smart-resource-booking-frontend
```

Pastaj hap:

```txt
http://localhost:3000
```

Në production, Nginx shërben build-in nga `dist/`.

---

## Rrjedha normale e përdorimit

1. Start backend:

```bash
cd backend
docker compose up -d --build
```

2. Run seed data:

```bash
node seed.js
```

3. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Hyr me admin demo:

```txt
email: admin@test.js
password: 123456
```

5. Testo:

- login;
- dashboard;
- resources;
- create booking;
- approve/reject booking;
- analytics.

---

## Troubleshooting

### 1. Login nuk punon

Kontrollo:

```env
VITE_API_URL=http://localhost:5000
```

Pastaj kontrollo backend:

```bash
curl http://localhost:5000/health
```

### 2. Merr 429 Too Many Requests

Ky nuk është problem frontend. Rate limit është në backend:

```txt
backend/api-gateway/.env
```

Ndrysho:

```env
RATE_LIMIT_MAX=1000
```

Restart backend:

```bash
docker compose down
docker compose up -d --build
```

### 3. Booking form nuk krijon rezervim

Kontrollo:

- a je logged in;
- a ekziston resource;
- a është zgjedhur startTime/endTime;
- a po dërgohet fusha `purpose`;
- a ka konflikt orari;
- a është backend running.

### 4. Dropdown i resources është bosh

Kontrollo:

- a janë bërë seed data;
- a punon endpoint `/api/resources`;
- a ke token valid;
- a është Resource Service healthy.

### 5. Analytics nuk shfaqet

Analytics është vetëm për admin. Kontrollo që je logged in si admin.

### 6. Ndryshova `.env`, por nuk ndryshoi asgjë

Vite lexon `.env` në start. Duhet ta ndalësh dhe ta ndezësh sërish:

```bash
npm run dev
```

---

## Komanda të shpejta

```bash
# Install
npm install

# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

---

## Përfundim

Frontend-i ofron ndërfaqe të plotë për përdorues dhe admin, duke u lidhur me backend-in përmes API Gateway. Aplikacioni është i ndarë në komponentë, service files dhe faqe të strukturuara, gjë që e bën më të lehtë mirëmbajtjen, zgjerimin dhe dokumentimin akademik të projektit.
