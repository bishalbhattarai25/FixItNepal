# FixITNepal

FixITNepal is a smart moto rescue and service booking platform built to connect customers with nearby mechanics
and service providers in Nepal. The system supports emergency rescue requests, appointment scheduling, live service tracking,
and secure communication between customers and service providers.

---

# Features

## Customer Features

* Create emergency service requests
* Schedule appointments for future servicing
* Track live service status
* View nearby service providers
* Service request history
* OTP-based authentication
* Real-time updates

## Service Provider Features

* Manage availability and opening hours
* Accept or reject service requests
* View scheduled appointments
* Update service progress
* Manage working locations

## Admin Features

* Manage users and providers
* Monitor requests and appointments
* System configuration and monitoring

---

# Tech Stack

## Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core
* PostgreSQL
* SignalR
* JWT Authentication
* Hangfire
* MailKit

## Frontend

* React
* Javascript
* Tailwind CSS
* Axios
* Leaflet

## Deployment

* Render - Backend and Database
* Vercel - Frontend


---

# Architecture

The project follows a modular and layered architecture:

* Application Layer
* Domain Layer
* Infrastructure Layer
* Entity Framework Core Layer
* API Layer

The system also uses:

* Repository Pattern
* Unit of Work Pattern

---

# Main Modules

## Authentication Module

Handles:

* OTP verification
* User login
* Role management
* JWT token generation

## Service Request Module

Handles:

* Emergency requests
* Scheduled appointments
* Request tracking
* Nearby provider discovery
* Live Tracking

## Appointment Module

Handles:

* Available slot generation
* Booking appointments
* Provider availability
* Opening hour management

## Notification Module

Handles:
* Real-time updates
* Status notifications

---

# Database

The project uses PostgreSQL as the primary database.

## Main Entities

* Users
* ServiceProviders
* ServiceRequests
* Appointments
* OpeningHours
* Locations
* Notifications

---

# Getting Started

## Prerequisites

Make sure you have installed:

* .NET SDK 9
* MySQL
* Node.js
* Git
* Docker

---

# Backend Setup

## Clone Repository

```bash
git clone <repository-url>
cd FixITNepal
```
run docker compose up --build

## Configure App Settings

Update:

```json
appsettings.json
```

Add:

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=FixITNepal;Username=postgres;Password=yourpassword"
  }
}
```

---

## Run Database Migration

```bash
dotnet ef database update
```

---

## Run Backend

```bash
dotnet run
```

Backend will start on:

```bash
https://localhost:71**
```

---

# Frontend Setup

```bash
cd FixItNepalFrontend
npm install
npm run dev
```

---

# Environment Variables

## Twilio

```env
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

## JWT

```env
JWT_SECRET=
JWT_ISSUER=
JWT_AUDIENCE=
```

---

# API Features

* RESTful APIs
* JWT secured endpoints
* Role-based authorization
* Real-time tracking
* Pagination support
* Validation handling

---

# Future Improvements

* AI-based service recommendation
* Payment gateway integration
* In-app chat system
* Push notifications
* Analytics dashboard
* Multi-language support

---

# Project Status

The project is currently under active development.

---

# Contributors

## Bishal Bhattarai
* Frontend Development
* Backend Development
* System Design
* API Development
* Database Design

## Ayush Khatri
* Frontend Development
* System Design
* Database Design

---

# License

This project is developed for educational and practical purposes.
