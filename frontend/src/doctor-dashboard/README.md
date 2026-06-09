# Doctor Admin Dashboard - Frontend Documentation

## 📋 Overview

A complete **Doctor Admin Panel** built with React and Tailwind CSS, allowing doctors to manage appointments, track earnings, and view appointment history. The dashboard features a dark theme with blue accents matching the existing appointment booking interface.

## ✨ Features

### 1. **Doctor Login**

- Email and password authentication
- Credentials stored in localStorage for backend integration
- Demo credentials provided for testing
- Secure password visibility toggle
- Responsive design for mobile/tablet/desktop

### 2. **Main Dashboard**

- **Statistics Cards**: Total appointments, Pending, Completed, Cancelled
- **Search & Filter**: Filter by patient name, phone, status, and category
- **Appointment Management**: View and manage daily appointments
- **Quick Actions**: Update appointment status and mark fees as paid

### 3. **Appointment History**

- YouTube-style history view with card-based layout
- Search and filter functionality
- Sort by date or patient name
- View all appointment details including symptoms/notes
- Payment status tracking

### 4. **Earnings Tracking**

- Daily earnings summary
- Total, paid, and unpaid amounts
- Revenue distribution visualization
- Recent transactions list
- Payment status breakdown

### 5. **Responsive Design**

- Mobile-first approach
- Works seamlessly on phones, tablets, and desktops
- Hamburger menu for mobile navigation
- Touch-friendly buttons and interactions

## 📁 Folder Structure

```
src/doctor-dashboard/
├── pages/
│   ├── DoctorLogin.jsx          # Login page
│   ├── DoctorDashboard.jsx      # Main dashboard with stats
│   ├── AppointmentsHistory.jsx  # History view (YouTube-style)
│   ├── EarningsPage.jsx         # Earnings and revenue tracking
│   └── DoctorPanel.jsx          # Main layout wrapper
│
├── components/
│   ├── DoctorSidebar.jsx        # Navigation sidebar
│   ├── StatCard.jsx             # Statistics card component
│   ├── AppointmentCard.jsx      # Individual appointment card
│   ├── FilterBar.jsx            # Search and filter bar
│   └── StatusBadge.jsx          # Status display component
│
├── context/
│   └── DoctorContext.jsx        # Global state management
│
└── utils/
    ├── dummyData.js             # Mock data (4 appointments)
    └── localStorage.js          # LocalStorage operations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5175/`

### Demo Credentials

**Email:** `doctor@carefirst.com`
**Password:** `doctor123`

## 🎯 Key Components

### DoctorContext

Global state management for:

- Doctor authentication
- Appointment data
- Status and fee updates

```javascript
import { useDoctorContext } from "../context/DoctorContext";

const { doctorAuth, appointments, login, logout, updateStatus, updateFeePaid } =
    useDoctorContext();
```

### LocalStorage Management

- `doctor_auth`: Stores logged-in doctor credentials
- `doctor_appointments`: Stores all appointment data

### Available Actions

- **Update Status**: Change appointment status (Pending → Completed/Cancelled)
- **Mark Fee as Paid**: Toggle fee payment status
- **Search Appointments**: Filter by patient name or phone
- **Filter by Status/Category**: View specific appointment types

## 📊 Data Structure

### Appointment Object

```javascript
{
  id: number,
  name: string,
  phoneNumber: string,
  appointmentDate: string (YYYY-MM-DD),
  appointmentTime: string,
  category: "Regular" | "Emergency",
  paymentMethod: string,
  fee: number,
  symptoms: string,
  status: "Pending" | "Completed" | "Cancelled",
  feePaid: boolean,
  bookedDate: string (YYYY-MM-DD)
}
```

## 🎨 Color Theme

- **Background**: Dark slate (#0F172A, #1E293B)
- **Primary Blue**: #3B82F6
- **Success Green**: #10B981
- **Warning Orange**: #F59E0B
- **Danger Red**: #DC2626
- **Text**: Light grays and white

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column, hamburger menu
- **Tablet**: 768px - 1024px - Two columns
- **Desktop**: > 1024px - Multi-column layout

## 🔄 Navigation Flow

1. **Patient View**: Appointment booking form
2. **Doctor Login**: Email/password authentication
3. **Doctor Dashboard**:
    - Main stats and today's appointments
    - Can switch to History or Earnings page
    - Can logout to return to patient view

## 🛠️ Development Notes

### Adding New Features

1. Create components in `components/` folder
2. Add state management in `DoctorContext.jsx`
3. Add localStorage functions in `localStorage.js`
4. Import and use in respective pages

### Styling

- Uses Tailwind CSS v4.1.17
- Leverages dark mode utilities
- Gradient effects and glass morphism

### Performance Optimizations

- useMemo for filtered appointments
- useCallback for event handlers
- Lazy component loading

## 🔐 Authentication Notes

Currently, authentication is **frontend-only** for demonstration:

- Credentials stored in localStorage
- No backend validation
- For production: Replace with backend API calls

**To integrate with backend:**

1. Modify `login()` function in `DoctorContext.jsx`
2. Call your authentication endpoint
3. Store JWT token instead of plain credentials
4. Add request interceptors for protected routes

## 📦 Dependencies

```json
{
    "react": "19.2.6",
    "react-dom": "19.2.6",
    "lucide-react": "^1.17.0",
    "tailwindcss": "4.1.17",
    "vite": "7.3.2"
}
```

## 🐛 Troubleshooting

**Dev server not starting:**

```bash
npm install
npm run dev
```

**Styles not applying:**

- Ensure Tailwind CSS is installed
- Check `index.css` imports
- Clear browser cache (Ctrl+Shift+Del)

**localStorage issues:**

- Clear browser storage: Settings → Storage → Clear All
- Check browser console for errors

## 🚀 Building for Production

```bash
npm run build
```

Output will be in `dist/` folder as a single HTML file.

## 📄 License

© 2024 CareFirst Clinic. All rights reserved.

## 👨‍💻 Support

For questions or issues, refer to the main project documentation or contact the development team.
