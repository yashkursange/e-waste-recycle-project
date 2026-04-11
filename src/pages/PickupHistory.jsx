import React, { useState, useMemo } from "react";
import {
  Calendar,
  Package,
  Award,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Filter,
  ChevronDown,
  Weight,
  Zap,
  X,
} from "lucide-react";

// ============================================
// STATS CARD COMPONENT
// ============================================
const StatsCard = ({ icon: Icon, label, value, unit, gradient, hoverColor }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-5 transition-all duration-300 group-hover:opacity-10 ${gradient}`}
      ></div>

      <div className="relative z-10">
        {/* Icon Container */}
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${gradient} mb-4 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Label */}
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          {label}
        </p>

        {/* Value */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILTER BAR COMPONENT
// ============================================
const FilterBar = ({ activeFilter, onFilterChange, stats }) => {
  const filters = [
    { id: "all", label: "All Pickups", count: stats.total, icon: Package },
    { id: "completed", label: "Completed", count: stats.completed, icon: CheckCircle2 },
    { id: "cancelled", label: "Cancelled", count: stats.cancelled, icon: AlertCircle },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
          <Filter className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Filter Pickups
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
        {filters.map((filter) => {
          const FilterIcon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`group relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl scale-100"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-150 dark:hover:bg-slate-750 active:scale-95"
              }`}
            >
              <FilterIcon className={`h-4 w-4 transition-transform duration-300 ${isActive ? "group-hover:rotate-12" : ""}`} />
              <span>{filter.label}</span>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-white/30 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// ITEM BADGE COMPONENT (Reusable)
// ============================================
const ItemBadge = ({ name, quantity }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200">
      <span className="font-medium">{name}</span>
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-0.5">
        ×{quantity}
      </span>
    </div>
  );
};

// ============================================
// PICKUP CARD COMPONENT
// ============================================
const PickupCard = ({ pickup }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = pickup.status === "completed";

  const getStatusStyles = () => {
    if (isCompleted) {
      return {
        backgroundColor: "bg-emerald-50 dark:bg-emerald-900/10",
        borderColor: "border-l-4 border-l-emerald-500",
        badgeBg: "bg-emerald-100 dark:bg-emerald-900/30",
        badgeText: "text-emerald-700 dark:text-emerald-400",
        badgeBorder: "border-emerald-200 dark:border-emerald-700",
        icon: "text-emerald-600",
        iconBg: "from-emerald-500 to-emerald-600",
      };
    } else {
      return {
        backgroundColor: "bg-red-50 dark:bg-red-900/10",
        borderColor: "border-l-4 border-l-red-500",
        badgeBg: "bg-red-100 dark:bg-red-900/30",
        badgeText: "text-red-700 dark:text-red-400",
        badgeBorder: "border-red-200 dark:border-red-700",
        icon: "text-red-600",
        iconBg: "from-red-500 to-red-600",
      };
    }
  };

  const styles = getStatusStyles();

  return (
    <div
      className={`group relative rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${styles.borderColor}`}
    >
      {/* Main Content - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left Section: Icon + Header */}
          <div className="flex gap-4 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${styles.iconBg} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6`}
            >
              <Package className="h-7 w-7 text-white" />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Pickup #{pickup.id}
                </h3>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${styles.badgeBg} ${styles.badgeText} ${styles.badgeBorder}`}
                >
                  {isCompleted ? "✓ Completed" : "✕ Cancelled"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{pickup.pickupDate}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <Weight className="h-4 w-4" />
                  <span>{pickup.weight} kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Points Badge + Expand Button */}
          <div className="flex items-start gap-4">
            {/* Points Badge */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 bg-gradient-to-br from-amber-50 to-amber-50/50 dark:from-amber-900/20 dark:to-amber-900/10 rounded-xl px-3 py-2 border border-amber-200 dark:border-amber-700/50">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {pickup.rewardPoints}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Points
              </p>
            </div>

            {/* Expand Button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30 px-6 py-5 animate-in fade-in duration-200">
          {/* Items Recycled - Tag Style */}
          <div className="mb-6">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
              📦 Items Recycled
            </p>
            <div className="flex flex-wrap gap-2">
              {pickup.items.map((item, idx) => (
                <ItemBadge key={idx} name={item.name} quantity={item.quantity} />
              ))}
            </div>
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-600">
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                Schedule Type
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {pickup.scheduleType}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                Total Weight
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {pickup.weight} kg
              </p>
            </div>
          </div>

          {/* Cancellation Reason (if cancelled) */}
          {!isCompleted && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase mb-1">
                Cancellation Reason
              </p>
              <p className="text-sm text-red-800 dark:text-red-300">
                {pickup.cancellationReason}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const PickupHistory = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock pickup history data
  const [pickupHistory] = useState([
    {
      id: 1001,
      date: "December 15, 2025",
      pickupDate: "Dec 15, 2025 - 2:30 PM",
      scheduleType: "Standard",
      status: "completed",
      items: [
        { name: "Old Laptop", quantity: 1 },
        { name: "Desktop Monitor", quantity: 1 },
        { name: "Keyboards", quantity: 2 },
      ],
      weight: 8.5,
      rewardPoints: 425,
      cancellationReason: null,
    },
    {
      id: 1002,
      date: "December 10, 2025",
      pickupDate: "Dec 10, 2025 - 10:00 AM",
      scheduleType: "Express",
      status: "completed",
      items: [
        { name: "Mobile Phones", quantity: 3 },
        { name: "Phone Chargers", quantity: 5 },
        { name: "Headphones", quantity: 2 },
      ],
      weight: 2.3,
      rewardPoints: 190,
      cancellationReason: null,
    },
    {
      id: 1003,
      date: "December 5, 2025",
      pickupDate: "Dec 5, 2025 - 3:00 PM",
      scheduleType: "Standard",
      status: "cancelled",
      items: [
        { name: "TV Sets", quantity: 1 },
        { name: "Speakers", quantity: 2 },
      ],
      weight: 15.0,
      rewardPoints: 0,
      cancellationReason: "Customer requested cancellation",
    },
    {
      id: 1004,
      date: "November 28, 2025",
      pickupDate: "Nov 28, 2025 - 1:30 PM",
      scheduleType: "Standard",
      status: "completed",
      items: [
        { name: "Printers", quantity: 1 },
        { name: "Scanners", quantity: 1 },
        { name: "Cables & Accessories", quantity: 3 },
      ],
      weight: 12.0,
      rewardPoints: 600,
      cancellationReason: null,
    },
    {
      id: 1005,
      date: "November 20, 2025",
      pickupDate: "Nov 20, 2025 - 11:00 AM",
      scheduleType: "Express",
      status: "cancelled",
      items: [
        { name: "Tablets", quantity: 2 },
        { name: "E-readers", quantity: 1 },
      ],
      weight: 1.8,
      rewardPoints: 0,
      cancellationReason: "User was unavailable at scheduled time",
    },
    {
      id: 1006,
      date: "November 12, 2025",
      pickupDate: "Nov 12, 2025 - 2:00 PM",
      scheduleType: "Standard",
      status: "completed",
      items: [
        { name: "Computer Towers", quantity: 2 },
        { name: "Hard Drives", quantity: 3 },
        { name: "RAM Sticks", quantity: 4 },
      ],
      weight: 18.5,
      rewardPoints: 925,
      cancellationReason: null,
    },
    {
      id: 1007,
      date: "November 5, 2025",
      pickupDate: "Nov 5, 2025 - 10:00 AM",
      scheduleType: "Standard",
      status: "completed",
      items: [
        { name: "Routers & Modems", quantity: 2 },
        { name: "Network Switches", quantity: 1 },
      ],
      weight: 4.2,
      rewardPoints: 280,
      cancellationReason: null,
    },
  ]);

  // Filter pickups
  const filteredPickups = useMemo(() => {
    switch (activeFilter) {
      case "completed":
        return pickupHistory.filter((p) => p.status === "completed");
      case "cancelled":
        return pickupHistory.filter((p) => p.status === "cancelled");
      case "all":
      default:
        return pickupHistory;
    }
  }, [activeFilter, pickupHistory]);

  const stats = {
    total: pickupHistory.length,
    completed: pickupHistory.filter((p) => p.status === "completed").length,
    cancelled: pickupHistory.filter((p) => p.status === "cancelled").length,
    totalPoints: pickupHistory.reduce((sum, p) => sum + p.rewardPoints, 0),
    totalWeight: pickupHistory.reduce((sum, p) => sum + p.weight, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
      {/* Main Container - Spacious & Full Width */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Pickup History
              </h1>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                Track all your e-waste pickups and recycling achievements
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Grid with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon={Package}
            label="Total Pickups"
            value={stats.total}
            gradient="bg-blue-500"
          />
          <StatsCard
            icon={CheckCircle2}
            label="Completed"
            value={stats.completed}
            gradient="bg-emerald-500"
          />
          <StatsCard
            icon={Weight}
            label="Total Weight"
            value={stats.totalWeight.toFixed(1)}
            unit="kg"
            gradient="bg-purple-500"
          />
          <StatsCard
            icon={Award}
            label="Points Earned"
            value={stats.totalPoints}
            gradient="bg-amber-500"
          />
        </div>

        {/* Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          stats={stats}
        />

        {/* Pickups List or Empty State */}
        <div className="space-y-4">
          {filteredPickups.length > 0 ? (
            <>
              {filteredPickups.map((pickup) => (
                <PickupCard key={pickup.id} pickup={pickup} />
              ))}
            </>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50 px-8 py-16 text-center backdrop-blur-sm transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                  <Package className="h-12 w-12 text-slate-400 dark:text-slate-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No pickups found
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {activeFilter !== "all"
                  ? `You don't have any ${activeFilter} pickups yet. Try a different filter!`
                  : "You haven't scheduled any pickups yet. Start your recycling journey today!"}
              </p>
            </div>
          )}
        </div>

        {/* Footer Info Card */}
        {pickupHistory.length > 0 && (
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-50/50 dark:from-emerald-900/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-700/50 p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
                  💡 Your Impact
                </h4>
                <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-1">
                  You've recycled <strong>{stats.totalWeight.toFixed(1)} kg</strong> of e-waste and earned{" "}
                  <strong>{stats.totalPoints} points</strong>! Keep it up to unlock exclusive rewards and
                  make a difference for the planet.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupHistory;
