import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import useTheme from './hooks/useTheme'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Leaderboard from './pages/Leaderboard'
import Onboarding from './pages/Onboarding'

// Private Pages
import AuthSwitcher from './pages/AuthSwitcher'
import SchedulePickup from './pages/SchedulePickup'
import PickupConfirmation from './pages/PickupConfirmation'
import Dashboard from './pages/Dashboard'
import PickupTracking from './pages/PickupTracking'
import PickupHistory from './pages/PickupHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

function App() {
  useTheme()
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="App min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        {isAuthenticated ? (
          // Private Routes - with PrivateLayout
          <PrivateLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schedule-pickup" element={<SchedulePickup />} />
              <Route path="/pickup-tracking" element={<PickupTracking />} />
              <Route path="/pickup-tracking/:id" element={<PickupTracking />} />
              <Route path="/pickup-history" element={<PickupHistory />} />
              <Route path="/pickup-confirmation" element={<PickupConfirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/auth" element={<AuthSwitcher />} />
              {/* Redirect other routes to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </PrivateLayout>
        ) : (
          // Public Routes - with PublicLayout
          <PublicLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
              {/* Redirect other routes to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </PublicLayout>
        )}
      </div>
    </Router>
  )
}

export default App
