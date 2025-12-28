import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Component - Main landing page for E-Waste Recycling Pickup Application
 * Features: Hero section, impact statistics, quick actions, pickup tracking, education section
 */
const Home = () => {
  // Mock user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock data for impact statistics
  const impactStats = [
    {
      id: 1,
      title: 'E-Waste Recycled',
      value: '45,280',
      unit: 'kg',
      icon: '♻️',
    },
    {
      id: 2,
      title: 'CO₂ Emissions Saved',
      value: '28,500',
      unit: 'kg',
      icon: '🌱'
    },
    {
      id: 3,
      title: 'Active Members',
      value: '12,450',
      unit: '',
      icon: '👥'
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      id: 1,
      title: 'Add E-Waste Item',
      description: 'List items for pickup',
      icon: '📱',
      action: () => console.log('Add E-Waste Item')
    },
    {
      id: 2,
      title: 'Schedule Pickup',
      description: 'Book a pickup slot',
      icon: '📅',
      action: () => console.log('Schedule Pickup')
    },
    {
      id: 3,
      title: 'Track Status',
      description: 'Monitor your pickup',
      icon: '📍',
      action: () => console.log('Track Status')
    },
    {
      id: 4,
      title: 'View Rewards',
      description: 'Check your points',
      icon: '🎁',
      action: () => console.log('View Rewards')
    }
  ];

  // Mock data for pickup status
  const pickupStatuses = [
    { id: 1, label: 'Requested', completed: true },
    { id: 2, label: 'Assigned', completed: true },
    { id: 3, label: 'On the Way', completed: true },
    { id: 4, label: 'Picked Up', completed: false },
    { id: 5, label: 'Recycled', completed: false }
  ];

  // Mock data for education cards
  const educationCards = [
    {
      id: 1,
      title: 'What is E-Waste?',
      description: 'Electronic waste includes discarded electrical or electronic devices. Computers, phones, TVs, and appliances all become e-waste when disposed of.',
      icon: '🖥️'
    },
    {
      id: 2,
      title: 'Why Recycle Electronics?',
      description: 'E-waste contains toxic materials that harm the environment. Recycling recovers valuable materials and prevents pollution.',
      icon: '♻️'
    },
    {
      id: 3,
      title: 'Environmental Impact',
      description: 'Proper e-waste recycling reduces landfill waste, conserves natural resources, and prevents harmful chemicals from contaminating soil and water.',
      icon: '🌍'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER / NAVBAR */}
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* HERO SECTION */}
      <HeroSection />

      {/* QUICK ACTIONS SECTION */}
      <QuickActions actions={quickActions} />

      {/* COMMUNITY IMPACT SECTION */}
      <ImpactSummary stats={impactStats} />

      {/* ACTIVE PICKUP STATUS CARD */}
      {isLoggedIn && <PickupStatusCard statuses={pickupStatuses} />}

      {/* EDUCATION / AWARENESS SECTION */}
      <EducationSection cards={educationCards} />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

/**
 * Header Component - Navigation bar with logo and menu items
 */
const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-3xl">♻️</span>
            <h1 className="text-2xl font-bold text-eco-green-600">EcoRecycle</h1>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-eco-green-600 font-medium transition">
              Home
            </a>
            <a href="#schedule" className="text-gray-700 hover:text-eco-green-600 font-medium transition">
              Schedule Pickup
            </a>
            <a href="#rewards" className="text-gray-700 hover:text-eco-green-600 font-medium transition">
              Rewards
            </a>
            <a href="#learn" className="text-gray-700 hover:text-eco-green-600 font-medium transition">
              Learn
            </a>
            <a href="#profile" className="text-gray-700 hover:text-eco-green-600 font-medium transition">
              Profile
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login"
                  className="text-eco-green-600 hover:text-eco-green-700 font-medium transition"
                >
                  Login
                </Link>
                <Link 
                  to="/login"
                  className="bg-eco-green-600 text-white px-6 py-2 rounded-full hover:bg-eco-green-700 transition shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

/**
 * Hero Section Component - Main banner with headline and CTA buttons
 */
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-eco-green-50 via-white to-transparent">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            Recycle Your E-Waste.
            <span className="block text-eco-green-600 mt-2">Protect the Planet.</span>
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of eco-conscious individuals in making a difference. 
            Schedule free e-waste pickup and contribute to responsible recycling. 
            Together, we can create a sustainable future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <button className="w-full sm:w-auto bg-eco-green-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-eco-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
              📅 Schedule a Pickup
            </button>
            <button className="w-full sm:w-auto bg-white text-eco-green-700 border-2 border-eco-green-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-eco-green-50 hover:border-eco-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              📚 Learn More
            </button>
          </div>

          {/* Hero Visual */}
          <div className="bg-gradient-to-r from-eco-green-100 via-eco-blue-100 to-eco-green-100 rounded-3xl p-16 shadow-2xl">
            <div className="flex items-center justify-center flex-wrap gap-6 text-7xl md:text-8xl">
              <span className="transform hover:scale-110 transition-transform duration-300">♻️</span>
              <span className="transform hover:scale-110 transition-transform duration-300">🌍</span>
              <span className="transform hover:scale-110 transition-transform duration-300">📱</span>
              <span className="transform hover:scale-110 transition-transform duration-300">💻</span>
              <span className="transform hover:scale-110 transition-transform duration-300">🌱</span>
            </div>
            <p className="mt-8 text-gray-800 font-semibold text-xl">
              Making E-Waste Recycling Simple, Free, and Rewarding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Impact Summary Component - Display key statistics
 */
const ImpactSummary = ({ stats }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
          Our Community Impact
        </h3>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
          Together, we're making a real difference in protecting our environment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gradient-to-br from-eco-green-50 via-white to-eco-blue-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-eco-green-200"
            >
              <div className="text-6xl mb-6 text-center">{stat.icon}</div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-eco-green-600 mb-3">
                  {stat.value}
                  <span className="text-3xl text-gray-700 ml-2">{stat.unit}</span>
                </p>
                <p className="text-gray-800 font-semibold text-xl">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Quick Actions Component - Action cards for common tasks
 */
const QuickActions = ({ actions }) => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-transparent hover:border-eco-green-500 cursor-pointer"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {action.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h4>
              <p className="text-gray-600 text-base">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Pickup Status Card Component - Timeline showing current pickup status
 */
const PickupStatusCard = ({ statuses }) => {
  const currentStatusIndex = statuses.findIndex(status => !status.completed);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-200">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Active Pickup Status
            </h3>
            <span className="bg-eco-yellow-400 text-gray-900 px-5 py-3 rounded-full font-bold text-sm shadow-md">
              In Progress
            </span>
          </div>

          {/* Timeline */}
          <div className="relative mb-10">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-1 bg-eco-green-500 transition-all duration-500"
              style={{ height: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
            ></div>

            {/* Timeline Items */}
            <div className="space-y-10">
              {statuses.map((status, index) => (
                <div key={status.id} className="relative flex items-center">
                  {/* Status Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 font-bold ${
                      status.completed
                        ? 'bg-eco-green-500 text-white shadow-lg'
                        : index === currentStatusIndex
                        ? 'bg-eco-yellow-400 text-gray-900 ring-4 ring-eco-yellow-200 animate-pulse shadow-lg'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {status.completed ? '✓' : index + 1}
                  </div>

                  {/* Status Label */}
                  <div className="ml-8">
                    <h4
                      className={`text-xl font-bold ${
                        status.completed || index === currentStatusIndex
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {status.label}
                    </h4>
                    {index === currentStatusIndex && (
                      <p className="text-sm text-gray-600 mt-2">Currently in progress...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-eco-green-50 rounded-2xl p-8 border border-eco-green-200">
            <div className="flex items-start space-x-4">
              <span className="text-3xl">📦</span>
              <div>
                <h5 className="font-bold text-gray-900 mb-3 text-lg">Pickup Details</h5>
                <p className="text-base text-gray-700 mb-2">
                  <strong>Items:</strong> Laptop, Mobile Phone, Tablet
                </p>
                <p className="text-base text-gray-700 mb-2">
                  <strong>Scheduled:</strong> Dec 28, 2025 • 2:00 PM - 4:00 PM
                </p>
                <p className="text-base text-gray-700">
                  <strong>Agent:</strong> John Doe • ⭐ 4.8 Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Education Section Component - Informational cards about e-waste
 */
const EducationSection = ({ cards }) => {
  return (
    <section className="bg-gradient-to-b from-eco-blue-50 via-eco-green-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why E-Waste Recycling Matters
          </h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Learn about the importance of responsible e-waste disposal and how you can make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100"
            >
              <div className="text-6xl mb-6">{card.icon}</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-5">{card.title}</h4>
              <p className="text-gray-700 leading-relaxed text-base">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="bg-eco-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-eco-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
            Learn More About E-Waste →
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer Component - Bottom section with links and information
 */
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">♻️</span>
              <h2 className="text-3xl font-bold text-eco-green-400">EcoRecycle</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Making the world cleaner, one device at a time. Join us in our mission to 
              responsibly recycle e-waste and protect our planet for future generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-gray-300 hover:text-eco-green-400 transition-colors duration-200 text-base">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-8">
              <a href="#facebook" className="text-gray-300 hover:text-eco-green-400 transition-all duration-200 text-3xl transform hover:scale-110">
                📘
              </a>
              <a href="#twitter" className="text-gray-300 hover:text-eco-green-400 transition-all duration-200 text-3xl transform hover:scale-110">
                🐦
              </a>
              <a href="#instagram" className="text-gray-300 hover:text-eco-green-400 transition-all duration-200 text-3xl transform hover:scale-110">
                📷
              </a>
              <a href="#linkedin" className="text-gray-300 hover:text-eco-green-400 transition-all duration-200 text-3xl transform hover:scale-110">
                💼
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-base">
              © 2025 EcoRecycle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Home;
