import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Recycle,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Package,
  Trophy,
  AlertCircle,
  Clock,
  CheckCircle2,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/notifications', {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((n) => {
            let icon = AlertCircle;
            if (n.type === 'pickup') icon = Package;
            if (n.type === 'reward') icon = Trophy;
            if (n.type === 'system') icon = Bell;
            return { ...n, icon };
          });
          setNotifications(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const latestNotifications = notifications.slice(0, 4);

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:5000/notifications/read/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ isRead: true }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:5000/notifications/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-stone-50 dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-stone-200 dark:border-slate-700 transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
              onClick={() => navigate('/dashboard')}
            >
              <Recycle className="w-7 h-7 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">EcoRecycle</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="/schedule-pickup"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition"
              >
                Schedule
              </Link>
              <Link
                to="/leaderboard"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition"
              >
                Rewards
              </Link>
              <Link
                to="/notifications"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition flex items-center gap-1"
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                  className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-900/10">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {unreadCount} unread
                        </p>
                      )}
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto">
                      {latestNotifications.length > 0 ? (
                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                          {latestNotifications.map((notification) => {
                            const IconComponent = notification.icon;
                            return (
                              <div
                                key={notification.id}
                                className={`p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                                  !notification.isRead
                                    ? 'bg-emerald-50 dark:bg-emerald-900/10'
                                    : ''
                                }`}
                              >
                                <div className="flex gap-3">
                                  <div
                                    className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                                      notification.type === 'pickup'
                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                        : notification.type === 'reward'
                                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                    }`}
                                  >
                                    <IconComponent className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                          {notification.title}
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                                          {notification.message}
                                        </p>
                                      </div>
                                      {!notification.isRead && (
                                        <div className="flex-shrink-0 h-2 w-2 rounded-full bg-emerald-600 mt-1"></div>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {notification.timestamp}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3 ml-13">
                                  {!notification.isRead && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkAsRead(notification.id);
                                      }}
                                      className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 transition flex items-center gap-1"
                                    >
                                      <CheckCircle2 className="h-3 w-3" />
                                      Mark read
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(notification.id);
                                    }}
                                    className="text-xs px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition flex items-center gap-1"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <Bell className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                          <p className="text-sm text-slate-500 dark:text-slate-400">No notifications</p>
                        </div>
                      )}
                    </div>

                    {/* View All */}
                    {notifications.length > 0 && (
                      <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <button
                          onClick={() => {
                            navigate('/notifications');
                            setShowNotificationDropdown(false);
                          }}
                          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition"
                        >
                          View all
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-500 overflow-hidden shadow-sm hover:ring-2 hover:ring-emerald-400 transition-all"
                >
                  {user?.picture ? (
                    <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                      {getInitials()}
                    </span>
                  )}
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
                        }}
                        className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-stone-200 dark:border-slate-700 pt-4">
              <Link
                to="/dashboard"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/schedule-pickup"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                to="/leaderboard"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </Link>
              <Link
                to="/notifications"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="block text-slate-600 dark:text-slate-300 hover:text-emerald-700 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-red-600 dark:text-red-400 font-medium py-2"
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Close dropdowns when clicking outside */}
      {(showNotificationDropdown || showProfileDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotificationDropdown(false);
            setShowProfileDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default PrivateLayout;
