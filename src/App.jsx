import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import AuthSwitcher from './pages/AuthSwitcher'
import SchedulePickup from './pages/SchedulePickup'
import PickupConfirmation from './pages/PickupConfirmation'
import Dashboard from './pages/Dashboard'
import PickupTracking from './pages/PickupTracking'
import PickupHistory from './pages/PickupHistory'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import useTheme from './hooks/useTheme'

function App() {
  useTheme()

  return (
    <Router>
      <div className="App min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<AuthSwitcher />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/pickup-tracking" element={<PickupTracking />} />
          <Route path="/pickup-history" element={<PickupHistory />} />
          <Route path="/pickup-confirmation" element={<PickupConfirmation />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
