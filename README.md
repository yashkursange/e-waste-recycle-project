# 🌍 EcoRecycle - E-Waste Recycling Pickup Application

A modern, responsive web application for e-waste recycling pickup built with the MERN stack.

## ✨ Features

### Home Page Sections
- **Header/Navbar**: Logo, navigation links, and authentication buttons
- **Hero Section**: Compelling headline with CTAs for scheduling pickups
- **Impact Summary**: Real-time statistics showing community impact
- **Quick Actions**: Fast access to key features
- **Pickup Status Tracker**: Visual timeline for active pickups
- **Education Section**: Information about e-waste recycling
- **Footer**: Links, social media, and company information

## 🎨 Design Features

- **Eco-Friendly Theme**: Green, blue, and yellow color scheme
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Modern UI**: Rounded corners, soft shadows, smooth transitions
- **Interactive Elements**: Hover effects and animations
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🛠️ Tech Stack

- **Frontend**: React 18 (Functional Components + Hooks)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks (useState)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
cep/
├── backend/
│ ├── db.js
│ ├── server.js
│ └── routes/auth.js
├── node_modules/
├── src/
│   ├── pages/
│   │   └── Home.jsx          # Main home page component
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles + Tailwind imports
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## 🎯 Component Overview

### Home Component
Main container component that renders all sections of the home page.

### Header Component
- Navigation menu
- Logo and branding
- Login/Signup buttons
- Responsive design

### Hero Section
- Large headline and subtext
- Primary and secondary CTAs
- Visual hero placeholder

### Impact Summary
- Three statistic cards
- Mock data for e-waste recycled, CO₂ saved, and community members
- Animated hover effects

### Quick Actions
- Four action cards
- Icons and descriptions
- Click handlers (ready for API integration)

### Pickup Status Card
- Visual timeline with 5 stages
- Current status highlighting
- Pickup details display
- Progress animation

### Education Section
- Three informational cards
- E-waste education content
- Clean card design

### Footer
- Brand information
- Navigation links
- Legal links
- Social media icons
- Copyright notice

## 🎨 Color Palette

```css
Primary Green: #22c55e (eco-green-600)
Light Green: #dcfce7 (eco-green-100)
Primary Blue: #3b82f6 (eco-blue-500)
Light Blue: #dbeafe (eco-blue-100)
Accent Yellow: #eab308 (eco-yellow-500)
```

## 🔮 Future Enhancements

- Integration with backend API
- User authentication system
- Real-time pickup tracking
- Rewards and points system
- Admin dashboard
- Payment integration
- Mobile app version

## 📝 Notes

- All API calls are currently placeholders (console.log)
- Mock data is used for statistics and pickup status
- Ready for backend integration
- Fully responsive and mobile-friendly

## 🤝 Contributing

This is a project template. Feel free to customize and extend based on your requirements.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---
## 🧩 NEW – Backend Integration (Added)

- This project now includes a Node.js + Express backend and MySQL database for real authentication.

## 🗄 Backend Tech Stack

- Node.js
- Express
- MySQL
- bcrypt
- JWT
- CORS

### Backend Folder Structure
```
 backend/
 ├── db.js
 ├── server.js
 └── routes/
 └── auth.js
```

## 🔐 Authentication Routes
- POST /auth/register – create user
- POST /auth/login – login and receive JWT
- POST /auth/google – native Google OAuth login (no extra dependencies required!)

### Example Request – Register
```
POST http://localhost:5000/auth/register

{
"email": "test@example.com
",
"password": "mypassword"
}
```

### Example Request – Login
```
POST http://localhost:5000/auth/login

{
"email": "test@example.com
",
"password": "mypassword"
}
```
## 💻 Running Backend Locally
```
cd backend
npm install
node server.js
```

- Backend runs on:
```
http://localhost:5000
```
## 🧠 Environment Notes

- Ensure MySQL server is running

- Update db.js credentials
```
(user: "root", password: "YOUR_PASSWORD", database: "e_waste")
```

- Token is stored in browser -> localStorage

## 🧭 Full App Run Guide
### Open two terminals:

- Terminal #1 – Backend:
```
cd backend
node server.js
```
- Terminal #2 – Frontend:
```
npm run dev
```

## 🚀 Recent Feature Updates (Current Iteration)

- **Google OAuth Integration**: Added pure native Google sign-in binding, automatically extracting the user's name and profile image, securely injecting it into a dynamic spherical avatar in the Navbar.
- **Auto-Populating User Details**: Enabled a backend trigger where providing an address on a new E-waste pickup smoothly maps backwards and permanently binds to your core User Profile, saving time on future schedules.
- **Robust Cancellation Logic**: Built the `PUT /pickup/:id/cancel` proxy and added a sophisticated interceptor on the frontend to parse custom ID labels, allowing users to smoothly abort tracking.
- **Reschedule Architecture**: Ripped out clunky redirection loops and built a beautiful, native React calendar modal with a corresponding `PUT /pickup/:id/reschedule` backend endpoint to slide pickup dates without re-entering entire forms.
- **Hot-Reloading Subsystem**: Corrected the backend environment by transitioning exclusively from `node` to `node --watch`, granting continuous robust API updates without external dependencies like nodemon.

Built with ♻️ by EcoRecycle Team
