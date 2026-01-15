import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import AuthSwitcher from './pages/AuthSwitcher'
import SchedulePickup from './pages/SchedulePickup'
import Rewards from './pages/Rewards'
import PickupConfirmation from './pages/PickupConfirmation'

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
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/pickup-confirmation" element={<PickupConfirmation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
