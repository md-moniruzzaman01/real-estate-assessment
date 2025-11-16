# 🚀 Full-Stack Prototype --- Backend (NestJS) + Mobile (Expo)

This project is a **small working prototype** designed to demonstrate
clean architecture, mobile--backend communication, database modeling,
and production-ready implementation structure.

The repository contains **two main folders**:

    /backend   → NestJS API server  
    /mobile    → Expo (React Native) mobile application

------------------------------------------------------------------------

## 📌 Features

### ✅ Backend (NestJS)

-   Modular architecture (Controllers, Services, Repositories)
-   REST API with DTO validation (class-validator)
-   Authentication (JWT-based) --- optional if needed
-   Prisma or TypeORM for database modeling
-   Error handling & clean response structure
-   `.env` support for secrets & environment separation

### ✅ Mobile App (Expo React Native)

-   Clean project structure using screens + components
-   API communication using Axios
-   State management (Zustand / Redux --- your choice)
-   Environment-based API URL configuration
-   Basic UI screens to demonstrate prototype workflow

------------------------------------------------------------------------

## 🗂️ Project Structure

    root/
    │
    ├── backend/              # NestJS backend
    │   ├── src/
    │   ├── prisma/ or entities/
    │   ├── .env.example
    │   └── package.json
    │
    └── mobile/               # Expo mobile app
        ├── app/
        ├── components/
        ├── services/api/
        ├── app.json
        └── package.json

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 🔧 1. Clone the Repository

``` sh
git clone https://your-repo-link.git
cd project-root
```

------------------------------------------------------------------------

## 🛠 Backend Setup (NestJS)

### Install dependencies:

``` sh
cd backend
npm install
```

### Setup environment:

``` sh
cp .env.example .env
```

### Run the server:

``` sh
npm run start:dev
```

------------------------------------------------------------------------

## 📱 Mobile App Setup (Expo)

### Install dependencies:

``` sh
cd mobile
npm install
```

### Start the app:

``` sh
expo start
```

Scan the QR code using the Expo Go app.

------------------------------------------------------------------------

## 🔗 API Communication

The mobile app communicates with the backend using Axios:

``` js
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
```

Configure this in `app.config.js` or `.env`.

------------------------------------------------------------------------

## 🧪 Testing

### Backend:

``` sh
npm run test
```

### Mobile:

Use Expo Testing Library or manual device testing.

------------------------------------------------------------------------

## 📦 Technologies Used

### Backend

-   **NestJS**
-   **Node.js**
-   **Prisma / TypeORM**
-   **PostgreSQL / MySQL / SQLite**
-   **JWT Authentication**

### Mobile

-   **React Native (Expo)**
-   **Axios**
-   **Zustand / Redux**
-   **React Navigation**

------------------------------------------------------------------------

## 🧹 Code Quality

-   ESLint & Prettier configuration included
-   Clean folder structure
-   Reusable components and services

------------------------------------------------------------------------

## 📝 License

This project is created for assignment evaluation and is free to modify
or extend.
