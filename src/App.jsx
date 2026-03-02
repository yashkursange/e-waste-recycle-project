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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<AuthSwitcher />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/pickup-tracking" element={<PickupTracking />} />
          <Route path="/pickup-confirmation" element={<PickupConfirmation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
