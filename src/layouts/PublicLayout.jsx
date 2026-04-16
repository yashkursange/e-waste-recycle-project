import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Menu, X } from 'lucide-react';

const PublicLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-stone-50 dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-stone-200 dark:border-slate-700 transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
              onClick={() => navigate('/')}
            >
              <Recycle className="w-7 h-7 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">EcoRecycle</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition"
              >
                Home
              </Link>
              <a
                href="#learn"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition"
              >
                Learn
              </a>
              <Link
                to="/leaderboard"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition"
              >
                Leaderboard
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-stone-200 dark:border-slate-700 pt-4">
              <Link
                to="/"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#learn"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
              >
                Learn
              </a>
              <Link
                to="/leaderboard"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <div className="pt-4 border-t border-stone-200 dark:border-slate-700 space-y-2">
                <Link
                  to="/login"
                  className="block text-emerald-700 dark:text-emerald-400 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-emerald-600 text-white px-4 py-2 rounded-full text-center font-medium hover:bg-emerald-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-stone-100 dark:bg-slate-800 border-t border-stone-200 dark:border-slate-700 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2026 EcoRecycle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
