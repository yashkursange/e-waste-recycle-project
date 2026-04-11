import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Recycle,
  Leaf,
  Users,
  Smartphone,
  Calendar,
  MapPin,
  Monitor,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Package,
  Star,
} from "lucide-react";

const renderIcon = (iconName, className) => {
  const icons = {
    Recycle: <Recycle className={className} />,
    Leaf: <Leaf className={className} />,
    Users: <Users className={className} />,
    Smartphone: <Smartphone className={className} />,
    Calendar: <Calendar className={className} />,
    MapPin: <MapPin className={className} />,
    Monitor: <Monitor className={className} />,
    Globe: <Globe className={className} />,
    Facebook: <Facebook className={className} />,
    Twitter: <Twitter className={className} />,
    Instagram: <Instagram className={className} />,
    Linkedin: <Linkedin className={className} />,
    Package: <Package className={className} />,
    Star: <Star className={className} />,
  };

  return icons[iconName] || null;
};

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white shadow-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
            <Recycle className="h-8 w-8 text-eco-green-600" />
            <h1 className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">EcoRecycle</h1>
          </button>

          <div className="hidden items-center space-x-8 md:flex">
            <Link to="/" className="font-medium text-gray-700 transition hover:text-eco-green-600 dark:text-slate-300 dark:hover:text-eco-green-400">
              Home
            </Link>
            <Link to="/schedule-pickup" className="font-medium text-gray-700 transition hover:text-eco-green-600 dark:text-slate-300 dark:hover:text-eco-green-400">
              Schedule Pickup
            </Link>
            <Link to="/leaderboard" className="font-medium text-gray-700 transition hover:text-eco-green-600 dark:text-slate-300 dark:hover:text-eco-green-400">
              Leaderboard
            </Link>
            <a href="#learn" className="font-medium text-gray-700 transition hover:text-eco-green-600 dark:text-slate-300 dark:hover:text-eco-green-400">
              Learn
            </a>
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="font-medium text-eco-green-600 transition hover:text-eco-green-700 dark:text-eco-green-400 dark:hover:text-eco-green-300">
                  Login
                </Link>
                <Link to="/signup" className="rounded-full bg-eco-green-600 px-6 py-2 text-white shadow-md transition hover:bg-eco-green-700">
                  Sign Up
                </Link>
              </>
            ) : (
              <button type="button" onClick={() => setIsLoggedIn(false)} className="rounded-full bg-gray-600 px-6 py-2 text-white shadow-md transition hover:bg-gray-700">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-eco-green-50 via-white to-transparent transition-colors duration-300 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-7xl">
            Recycle Your E-Waste.
            <span className="mt-2 block text-eco-green-600">Protect the Planet.</span>
          </h2>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-slate-300 md:text-2xl">
            Join thousands of eco-conscious individuals in making a difference.
            Schedule free e-waste pickup and contribute to responsible recycling.
            Together, we can create a sustainable future.
          </p>

          <div className="mb-20 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/schedule-pickup"
              className="flex w-full items-center gap-3 rounded-full bg-eco-green-600 px-10 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-eco-green-700 hover:shadow-2xl sm:w-auto"
            >
              <Calendar className="h-5 w-5" />
              Schedule a Pickup
            </Link>
            <a
              href="#learn"
              className="flex w-full items-center gap-3 rounded-full border-2 border-eco-green-600 bg-white px-10 py-5 text-lg font-bold text-eco-green-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-eco-green-700 hover:bg-eco-green-50 hover:shadow-xl dark:border-eco-green-500 dark:bg-slate-800 dark:text-eco-green-300 dark:hover:border-eco-green-400 dark:hover:bg-slate-700 sm:w-auto"
            >
              <Monitor className="h-5 w-5" />
              Learn More
            </a>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-eco-green-100 via-eco-blue-100 to-eco-green-100 p-16 shadow-2xl dark:from-slate-800 dark:via-slate-800 dark:to-slate-700">
            <div className="flex flex-wrap items-center justify-center gap-6 text-7xl md:text-8xl">
              <Recycle className="h-20 w-20 transform text-eco-green-600 transition-transform duration-300 hover:scale-110" />
              <Globe className="h-20 w-20 transform text-blue-600 transition-transform duration-300 hover:scale-110" />
              <Smartphone className="h-20 w-20 transform text-violet-600 transition-transform duration-300 hover:scale-110" />
              <Monitor className="h-20 w-20 transform text-slate-600 transition-transform duration-300 hover:scale-110 dark:text-slate-300" />
              <Leaf className="h-20 w-20 transform text-green-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <p className="mt-8 text-xl font-semibold text-gray-800 dark:text-slate-200">
              Making E-Waste Recycling Simple, Free, and Rewarding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImpactSummary = ({ stats }) => {
  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h3 className="mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Our Community Impact</h3>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600 dark:text-slate-300">
          Together, we're making a real difference in protecting our environment
        </p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-3xl border border-eco-green-200 bg-gradient-to-br from-eco-green-50 via-white to-eco-blue-50 p-10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700"
            >
              <div className="mb-6 flex justify-center text-6xl">{renderIcon(stat.icon, "h-16 w-16 text-eco-green-600")}</div>
              <div className="text-center">
                <p className="mb-3 text-5xl font-extrabold text-eco-green-600">
                  {stat.value}
                  <span className="ml-2 text-3xl text-gray-700 dark:text-slate-300">{stat.unit}</span>
                </p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuickActions = ({ actions }) => {
  return (
    <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <h3 className="mb-16 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Quick Actions</h3>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.action}
              className="group cursor-pointer rounded-2xl border-2 border-transparent bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-eco-green-500 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-6 flex justify-center text-6xl transition-transform duration-300 group-hover:scale-110">{renderIcon(action.icon, "h-14 w-14 text-eco-green-600")}</div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{action.title}</h4>
              <p className="text-base text-gray-600 dark:text-slate-300">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const PickupStatusCard = ({ statuses }) => {
  const currentStatusIndex = statuses.findIndex((status) => !status.completed);
  const progressPercent = currentStatusIndex <= 0 ? 0 : (currentStatusIndex / (statuses.length - 1)) * 100;

  return (
    <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:p-14">
          <div className="mb-10 flex items-center justify-between gap-4">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Active Pickup Status</h3>
            <span className="rounded-full bg-eco-yellow-400 px-5 py-3 text-sm font-bold text-gray-900 shadow-md">In Progress</span>
          </div>

          <div className="relative mb-10">
            <div className="absolute bottom-0 top-0 left-6 w-1 bg-gray-200 dark:bg-slate-700" />
            <div className="absolute left-6 top-0 w-1 bg-eco-green-500 transition-all duration-500" style={{ height: `${progressPercent}%` }} />

            <div className="space-y-10">
              {statuses.map((status, index) => (
                <div key={status.id} className="relative flex items-center">
                  <div
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                      status.completed
                        ? "bg-eco-green-500 text-white shadow-lg"
                        : index === currentStatusIndex
                          ? "animate-pulse bg-eco-yellow-400 text-gray-900 ring-4 ring-eco-yellow-200 shadow-lg"
                          : "bg-gray-200 text-gray-400 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {status.completed ? "✓" : index + 1}
                  </div>

                  <div className="ml-8">
                    <h4
                      className={`text-xl font-bold ${
                        status.completed || index === currentStatusIndex ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-slate-400"
                      }`}
                    >
                      {status.label}
                    </h4>
                    {index === currentStatusIndex ? <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Currently in progress...</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-eco-green-200 bg-eco-green-50 p-8 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-4">
              <Package className="h-8 w-8 text-eco-green-600" />
              <div>
                <h5 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Pickup Details</h5>
                <p className="mb-2 text-base text-gray-700 dark:text-slate-300">
                  <strong>Items:</strong> Laptop, Mobile Phone, Tablet
                </p>
                <p className="mb-2 text-base text-gray-700 dark:text-slate-300">
                  <strong>Scheduled:</strong> Dec 28, 2025 • 2:00 PM - 4:00 PM
                </p>
                <p className="flex items-center gap-1 text-base text-gray-700 dark:text-slate-300">
                  <strong>Agent:</strong> John Doe • <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.8 Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationSection = ({ cards }) => {
  return (
    <section id="learn" className="bg-gradient-to-b from-eco-blue-50 via-eco-green-50 to-white py-20 transition-colors duration-300 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h3 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Why E-Waste Recycling Matters</h3>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-slate-300">
            Learn about the importance of responsible e-waste disposal and how you can make a difference
          </p>
        </div>

        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-6 flex justify-center text-6xl">{renderIcon(card.icon, "h-14 w-14 text-eco-green-600")}</div>
              <h4 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">{card.title}</h4>
              <p className="text-base leading-relaxed text-gray-700 dark:text-slate-300">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button type="button" className="rounded-full bg-eco-blue-600 px-10 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-eco-blue-700 hover:shadow-2xl">
            Learn More About E-Waste →
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 text-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center space-x-3">
              <Recycle className="h-10 w-10 text-eco-green-400" />
              <h2 className="text-3xl font-bold text-eco-green-400">EcoRecycle</h2>
            </div>
            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              Making the world cleaner, one device at a time. Join us in our mission to responsibly recycle e-waste and protect our planet for future generations.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">About Us</a></li>
              <li><a href="#how-it-works" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">How It Works</a></li>
              <li><a href="#faq" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">FAQ</a></li>
              <li><a href="#contact" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold text-white">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#privacy" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">Privacy Policy</a></li>
              <li><a href="#terms" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">Terms of Service</a></li>
              <li><a href="#cookies" className="text-base text-gray-300 transition-colors duration-200 hover:text-eco-green-400">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center space-x-8">
              <a href="#facebook" className="transform text-gray-300 transition-all duration-200 hover:scale-110 hover:text-eco-green-400"><Facebook className="h-7 w-7" /></a>
              <a href="#twitter" className="transform text-gray-300 transition-all duration-200 hover:scale-110 hover:text-eco-green-400"><Twitter className="h-7 w-7" /></a>
              <a href="#instagram" className="transform text-gray-300 transition-all duration-200 hover:scale-110 hover:text-eco-green-400"><Instagram className="h-7 w-7" /></a>
              <a href="#linkedin" className="transform text-gray-300 transition-all duration-200 hover:scale-110 hover:text-eco-green-400"><Linkedin className="h-7 w-7" /></a>
            </div>

            <p className="text-base text-gray-400">© 2025 EcoRecycle. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const impactStats = [
    { id: 1, title: "E-Waste Recycled", value: "45,280", unit: "kg", icon: "Recycle" },
    { id: 2, title: "CO₂ Emissions Saved", value: "28,500", unit: "kg", icon: "Leaf" },
    { id: 3, title: "Active Members", value: "12,450", unit: "", icon: "Users" },
  ];

  const quickActions = [
    { id: 1, title: "Add E-Waste Item", description: "List items for pickup", icon: "Smartphone", action: () => console.log("Add E-Waste Item") },
    { id: 2, title: "Schedule Pickup", description: "Book a pickup slot", icon: "Calendar", action: () => console.log("Schedule Pickup") },
    { id: 3, title: "Track Status", description: "Monitor your pickup", icon: "MapPin", action: () => console.log("Track Status") },
    { id: 4, title: "Leaderboard", description: "View top recyclers", icon: "Globe", action: () => (window.location.href = "/leaderboard") },
  ];

  const pickupStatuses = [
    { id: 1, label: "Requested", completed: true },
    { id: 2, label: "Assigned", completed: true },
    { id: 3, label: "On the Way", completed: true },
    { id: 4, label: "Picked Up", completed: false },
    { id: 5, label: "Recycled", completed: false },
  ];

  const educationCards = [
    {
      id: 1,
      title: "What is E-Waste?",
      description:
        "Electronic waste includes discarded electrical or electronic devices. Computers, phones, TVs, and appliances all become e-waste when disposed of.",
      icon: "Monitor",
    },
    {
      id: 2,
      title: "Why Recycle Electronics?",
      description: "E-waste contains toxic materials that harm the environment. Recycling recovers valuable materials and prevents pollution.",
      icon: "Recycle",
    },
    {
      id: 3,
      title: "Environmental Impact",
      description:
        "Proper e-waste recycling reduces landfill waste, conserves natural resources, and prevents harmful chemicals from contaminating soil and water.",
      icon: "Globe",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <HeroSection />
      <QuickActions actions={quickActions} />
      <ImpactSummary stats={impactStats} />
      {isLoggedIn ? <PickupStatusCard statuses={pickupStatuses} /> : null}
      <EducationSection cards={educationCards} />
      <Footer />
    </div>
  );
};

export default Home;
