import React, { useState, useMemo, useEffect } from "react";
import { Trash2, CheckCircle2, Clock, Zap, Trophy, AlertCircle, Bell, Package, X } from "lucide-react";

// Filter Tabs Component
const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All", icon: null },
    { id: "unread", label: "Unread", icon: null },
    { id: "pickup", label: "Pickups", icon: null },
    { id: "reward", label: "Rewards", icon: null },
    { id: "system", label: "System", icon: null },
  ];

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2 sm:pb-0">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onFilterChange(filter.id)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? "bg-eco-green-600 text-white shadow-md hover:shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Notification Card Component
const NotificationCard = ({ notification, onToggleRead, onDelete }) => {
  const IconComponent = notification.icon;

  const getIconContainerStyle = () => {
    const typeStyles = {
      pickup: "bg-gradient-to-br from-eco-green-500 to-eco-green-600",
      reward: "bg-gradient-to-br from-eco-yellow-400 to-eco-yellow-500",
      system: "bg-gradient-to-br from-slate-400 to-slate-500",
    };
    return typeStyles[notification.type] || typeStyles.system;
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-l-4 transition-all duration-300 ${
        notification.isRead
          ? "border-slate-200 bg-slate-50/40 dark:border-slate-700 dark:bg-slate-800/40 opacity-75 hover:opacity-100 hover:bg-slate-50/60 dark:hover:bg-slate-800/60"
          : "border-eco-green-500 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl hover:bg-eco-green-50/30 dark:hover:bg-eco-green-950/20"
      }`}
    >
      {/* Unread indicator pulsing dot */}
      {!notification.isRead && (
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <div className="relative inline-flex">
            <div className="h-2 w-2 rounded-full bg-eco-green-600 animate-pulse"></div>
            <div className="absolute h-2 w-2 rounded-full bg-eco-green-600 animate-ping"></div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-4 p-5 sm:p-6">
        {/* Icon Container */}
        <div
          className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${getIconContainerStyle()}`}
        >
          <IconComponent className="h-6 w-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white transition-colors">
                {notification.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {notification.message}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{notification.timestamp}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 items-center gap-1.5 ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onToggleRead(notification.id)}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              notification.isRead
                ? "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                : "text-eco-green-600 hover:text-eco-green-700 dark:text-eco-green-400 dark:hover:text-eco-green-300"
            }`}
            title={notification.isRead ? "Mark as unread" : "Mark as read"}
          >
            <CheckCircle2 className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(notification.id)}
            className="p-2 text-slate-400 transition-all duration-300 hover:text-red-600 hover:scale-110 dark:text-slate-500 dark:hover:text-red-400"
            title="Delete notification"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-l-4 border-eco-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-50 pointer-events-none" />
    </div>
  );
};

// Main Notifications Page
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/notifications", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        if (res.ok) {
          const data = await res.json();
          // Map backend types to icons
          const mapped = data.map(n => {
            let icon = AlertCircle;
            if(n.type === 'pickup') icon = Package;
            if(n.type === 'reward') icon = Trophy;
            if(n.type === 'system') icon = Bell;
            return {
              ...n,
              icon
            };
          });
          setNotifications(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  const [activeFilter, setActiveFilter] = useState("all");

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "pickup":
        return notifications.filter((n) => n.type === "pickup");
      case "reward":
        return notifications.filter((n) => n.type === "reward");
      case "system":
        return notifications.filter((n) => n.type === "system");
      case "all":
      default:
        return notifications;
    }
  }, [notifications, activeFilter]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleRead = async (id) => {
    const notif = notifications.find(n => n.id === id);
    if(!notif) return;
    try {
      await fetch("http://localhost:5000/notifications/read/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
        body: JSON.stringify({ isRead: !notif.isRead })
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: !notif.isRead } : n))
      );
    } catch(err) { console.error(err); }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch("http://localhost:5000/notifications/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch(err) { console.error(err); }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("http://localhost:5000/notifications/read-all", {
        method: "PUT",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
    } catch(err) { console.error(err); }
  };

  const clearAll = async () => {
    try {
      await fetch("http://localhost:5000/notifications/clear-all", {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setNotifications([]);
    } catch(err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-colors duration-300 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-eco-green-500 to-eco-green-600 shadow-lg">
                <Bell className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-eco-green-600 text-white text-xs font-semibold animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {unreadCount > 0
                    ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                    : "All caught up! 🎉"}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-slate-200 via-slate-200 to-transparent dark:from-slate-700 dark:via-slate-700"></div>
        </div>

        {/* Filter Tabs */}
        {notifications.length > 0 && (
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        )}

        {/* Action Buttons */}
        {notifications.length > 0 && (unreadCount > 0 || notifications.length > 0) && (
          <div className="mb-6 flex flex-col gap-2 sm:flex-row">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="group flex items-center justify-center gap-2 rounded-lg border border-eco-green-200 bg-eco-green-50 px-4 py-2.5 text-sm font-medium text-eco-green-700 transition-all duration-300 hover:bg-eco-green-100 dark:border-eco-green-700/30 dark:bg-eco-green-900/20 dark:text-eco-green-300 dark:hover:bg-eco-green-900/30"
              >
                <CheckCircle2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="group flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-all duration-300 hover:bg-red-100 dark:border-red-700/30 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
              >
                <X className="h-4 w-4 transition-transform group-hover:scale-110" />
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Notifications List or Empty State */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onToggleRead={toggleRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white/50 p-16 text-center transition-colors dark:border-slate-600 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="mb-4 flex justify-center">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <Bell className="h-12 w-12 text-slate-400 dark:text-slate-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {activeFilter !== "all" ? "No notifications in this category" : "You're all caught up!"}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {activeFilter !== "all"
                ? "Check back later for new updates."
                : "When you have updates about pickups, rewards, or system alerts, they'll appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
