import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle, Bell, Clock, Trash2, CheckCircle2, Package, Trophy, AlertCircle, ChevronRight, User, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotificationsAndProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const notifRes = await fetch("http://localhost:5000/notifications", {
          headers: { Authorization: "Bearer " + token }
        });
        if (notifRes.ok) {
          const data = await notifRes.json();
          const mapped = data.map(n => {
            let icon = AlertCircle;
            if(n.type === 'pickup') icon = Package;
            if(n.type === 'reward') icon = Trophy;
            if(n.type === 'system') icon = Bell;
            return { ...n, icon };
          });
          setNotifications(mapped);
        }

        const profileRes = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: "Bearer " + token }
        });
        if (profileRes.ok) {
          const pData = await profileRes.json();
          setUserProfile(pData);
        }
      } catch (err) {
        console.error("Failed to fetch navbar data", err);
      }
    };
    fetchNotificationsAndProfile();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const latestNotifications = notifications.slice(0, 4);

  const handleMarkAsRead = async (id) => {
    const notif = notifications.find(n => n.id === id);
    if (!notif) return;
    try {
      await fetch("http://localhost:5000/notifications/read/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
        body: JSON.stringify({ isRead: true })
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch(err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:5000/notifications/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch(err) { console.error(err); }
  };

  const handleViewAll = () => {
    navigate("/notifications");
    setShowNotificationDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const getInitials = () => {
    if (!userProfile?.name) return "U";
    return userProfile.name.charAt(0).toUpperCase();
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

            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-500 overflow-hidden shadow-sm hover:ring-2 hover:ring-emerald-400 focus:outline-none transition-all"
                >
                  {userProfile?.picture ? (
                    <img src={userProfile.picture} alt="Profile" className="w-full h-full object-cover" />
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
                           {userProfile?.name || "User"}
                         </p>
                         <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                           {userProfile?.email}
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
                         onClick={handleLogout}
                         className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors"
                       >
                         <LogOut className="w-4 h-4 mr-3" />
                         Sign Out
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>

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
    </header>
  );
};

export default Navbar;
