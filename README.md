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

Built with ♻️ by EcoRecycle Team
