# 🚀 Smart Resource Booking & Analytics System (Backend)

A scalable microservices-based backend system for managing resources, bookings, and analytics using modern backend technologies.

---

## 📌 Overview

This system allows users to:
- Register & authenticate securely (JWT + RBAC)
- Manage resources (rooms, labs, equipment)
- Create and manage bookings
- Detect booking conflicts
- Analyze usage data in real-time

---

## 🏗️ Architecture

Microservices-based architecture:

- API Gateway (Entry point)
- Auth Service (Authentication & Authorization)
- Resource Service (Resource management)
- Booking & Analytics Service (Bookings + analytics)
- Kafka (Event-driven communication)
- MySQL (Relational data)
- MongoDB (Analytics & logs)

---

## ⚙️ Tech Stack

- Node.js + Express
- MySQL (Sequelize ORM)
- MongoDB (Mongoose)
- Apache Kafka (KafkaJS)
- Docker & Docker Compose
- JWT Authentication (Access + Refresh tokens)
- RBAC (admin / user)

---

## 🧩 Services

### 🔐 Auth Service
- Register / Login
- JWT authentication
- Role-based access control

### 📦 Resource Service
- CRUD for resources
- Resource availability management

### 📊 Booking & Analytics Service
- Create bookings
- Conflict detection
- Booking lifecycle (approve/reject/cancel)
- Analytics:
  - Most used resources
  - Peak hours
  - Top users
  - Bookings per day

---

## 🔄 Event-Driven Design

Kafka is used as an event bus:
- user.logged_in
- booking.created
- booking.updated

Services are **loosely coupled** and scalable.

---

## 🐳 Running the Project

### 1. Clone repo

```bash
git clone https://github.com/your-repo.git
cd project