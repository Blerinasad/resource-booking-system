# Resource Service

Resource microservice for Smart Resource Booking & Usage Analytics System.

## Features

- Resource CRUD
- Admin-only create/update/delete
- User/admin list and detail access
- JWT authentication
- Role-based access control
- MySQL + Sequelize
- Filtering, searching, pagination
- Health check
- Kafka placeholder events

## Setup

```bash
npm install
```

Create `.env` based on `.env.example`.

```sql
CREATE DATABASE smart_booking_resources;
```

Start:

```bash
npm start
```

Test:

```powershell
.\resource-tests.ps1
```

Important: `JWT_SECRET` must be exactly the same as `auth-service` JWT_SECRET.
