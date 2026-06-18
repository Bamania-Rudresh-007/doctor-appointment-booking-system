# Doctor Appointment Booking System

A full-stack web application that streamlines doctor appointment scheduling, management, and earnings tracking. Built with the MERN stack, it provides a secure doctor dashboard for managing appointments with real-time status updates.

---

## Features

- **Doctor Authentication** — Secure login and registration with JWT-based session management
- **Appointment Management** — View, filter, and update appointment statuses in real time
- **Appointments History** — Complete log of past and upcoming appointments
- **Earnings Overview** — Track doctor earnings from completed appointments
- **Protected Routes** — Dashboard pages accessible only to authenticated doctors
- **Responsive UI** — Clean, component-driven interface built with React

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React (Vite) | UI framework |
| React Context API | Global state management |
| Axios | HTTP client |
| React Router DOM | Client-side routing |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcrypt | Password hashing |

---

## Folder Structure

```
doctor-appointment-booking-system/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       │   ├── axiosClient.js        # Axios instance with interceptors
│       │   └── userService.js        # All API call functions
│       ├── components/               # Shared UI components
│       │   ├── FormCard.jsx
│       │   ├── GlassCard.jsx
│       │   ├── Header.jsx
│       │   ├── InputField.jsx
│       │   ├── Loader.jsx
│       │   ├── ReceiptCard.jsx
│       │   ├── ReceiptRow.jsx
│       │   ├── SectionTitle.jsx
│       │   └── Sidebar.jsx
│       ├── context/
│       │   └── AppointmentContext.jsx
│       ├── doctor-dashboard/
│       │   ├── components/           # Dashboard-specific components
│       │   │   ├── AppointmentCard.jsx
│       │   │   ├── DoctorSidebar.jsx
│       │   │   ├── FilterBar.jsx
│       │   │   ├── StatCard.jsx
│       │   │   └── StatusBadge.jsx
│       │   ├── context/
│       │   │   └── DoctorContext.jsx
│       │   ├── pages/
│       │   │   ├── AppointmentsHistory.jsx
│       │   │   ├── DoctorDashboard.jsx
│       │   │   ├── DoctorLogin.jsx
│       │   │   ├── DoctorPanel.jsx
│       │   │   └── EarningsPage.jsx
│       │   └── utils/
│       │       ├── dummyData.js
│       │       └── localStorage.js
│       ├── utils/
│       │   ├── cn.ts
│       │   └── helpers.js
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    └── src/
        ├── config/
        │   ├── corsConfig.js
        │   └── db.js
        ├── controllers/
        │   ├── auth.controller.js
        │   └── appointment.controller.js
        ├── middlewares/
        │   └── protect.middleware.js
        ├── models/
        │   ├── admin.model.js
        │   ├── appointment.model.js
        │   └── user.model.js
        ├── routes/
        │   ├── auth.route.js
        │   └── appointment.route.js
        └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/doctor-appointment-booking-system.git
cd doctor-appointment-booking-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new admin/doctor | No |
| POST | `/login` | Login and receive JWT | No |
| POST | `/logout` | Logout and invalidate session | Yes |
| POST | `/refresh` | Refresh access token | Yes |
| GET | `/admins` | Get list of all admins | Yes |

### Appointment Routes — `/api/appointments`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Book a new appointment | No |
| PUT | `/update` | Update appointment status | Yes |
| GET | `/all` | Get all appointments | Yes |
| GET | `/latest` | Get latest appointment time | Yes |

> All protected routes require an `Authorization: Bearer <token>` header.

---

## Deployment

- **Frontend** — Deployed on [Vercel](https://vercel.com). Set the root directory to `frontend` in Vercel project settings.
- **Backend** — Deployed on [Render](https://render.com) or [Railway](https://railway.app). Set the root directory to `backend` and configure environment variables in the dashboard.

---

## Environment Variables Summary

| Variable | Location | Description |
|---|---|---|
| `PORT` | backend | Server port |
| `MONGO_URI` | backend | MongoDB connection string |
| `JWT_SECRET` | backend | Secret for access tokens |
| `JWT_REFRESH_SECRET` | backend | Secret for refresh tokens |
| `CLIENT_URL` | backend | Allowed CORS origin |
| `VITE_API_BASE_URL` | frontend | Backend API base URL |
