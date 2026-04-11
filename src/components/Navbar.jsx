import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle, Bell, Clock, Trash2, CheckCircle2, Package, Trophy, AlertCircle, ChevronRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Mock notifications - in a real app, this would come from global state or context
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "pickup",
      title: "Pickup Scheduled",
      message: "Your e-waste pickup has been scheduled for Dec 28, 2025 at 2:00 PM",
      timestamp: "2 hours ago",
      isRead: false,
      icon: Package,
    },
    {
      id: 2,
      type: "reward",
      title: "Reward Unlocked",
      message: "You've earned 250 EcoPoints! Collect more to unlock premium rewards.",
      timestamp: "5 hours ago",
      isRead: false,
      icon: Trophy,
    },
    {
      id: 3,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance on Dec 25, 2025. Service may be unavailable for 2 hours.",
      timestamp: "1 day ago",
      isRead: true,
      icon: AlertCircle,
    },
    {
      id: 4,
      type: "pickup",
      title: "Pickup Completed",
      message: "Your previous pickup has been completed successfully. 12 kg of e-waste recycled!",
      timestamp: "3 days ago",
      isRead: true,
      icon: CheckCircle2,
    },
    {
      id: 5,
      type: "reward",
      title: "Bonus Points Available",
      message: "Limited time offer! Get 50% extra EcoPoints on your next pickup.",
      timestamp: "5 days ago",
      isRead: true,
      icon: Trophy,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const latestNotifications = notifications.slice(0, 4); // Show latest 4 in dropdown

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleViewAll = () => {
    navigate("/notifications");
    setShowNotificationDropdown(false);
  };

  return (
    <header className="bg-stone-50 dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-stone-200 dark:border-slate-700 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <Recycle className="w-7 h-7 text-emerald-600" />
            <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">EcoRecycle</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition">
              Home
            </Link>
            <Link to="/schedule-pickup" className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition">
              Schedule Pickup
            </Link>
            <Link to="/leaderboard" className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition">
              Leaderboard
            </Link>
            <a href="#learn" className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition">
              Learn
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                title="Notifications"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 transition-all duration-300">
                  {/* Dropdown Header */}
                  <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-900/10 dark:to-transparent">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
                      </p>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {latestNotifications.length > 0 ? (
                      <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {latestNotifications.map((notification) => {
                          const IconComponent = notification.icon;
                          return (
                            <div
                              key={notification.id}
                              className={`p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                                !notification.isRead ? "bg-emerald-50 dark:bg-emerald-900/10" : ""
                              }`}
                            >
                              <div className="flex gap-3">
                                {/* Icon */}
                                <div
                                  className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                                    notification.type === "pickup"
                                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                      : notification.type === "reward"
                                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                                  }`}
                                >
                                  <IconComponent className="h-5 w-5" />
                                </div>

                                {/* Content */}
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
                                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {notification.timestamp}
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-3 ml-13">
                                {!notification.isRead && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMarkAsRead(notification.id);
                                    }}
                                    className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition flex items-center gap-1"
                                  >
                                    <CheckCircle2 className="h-3 w-3" />
                                    Mark read
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(notification.id);
                                  }}
                                  className="text-xs px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition flex items-center gap-1"
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
                        <p className="text-sm text-slate-500 dark:text-slate-400">No notifications yet</p>
                      </div>
                    )}
                  </div>

                  {/* View All Button */}
                  {notifications.length > 0 && (
                    <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <button
                        type="button"
                        onClick={handleViewAll}
                        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
                      >
                        View all notifications
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

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
        </div>
      </nav>

      {/* Close dropdown when clicking outside */}
      {showNotificationDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotificationDropdown(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
