import React from 'react';

const SkeletonLoader = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`${width} ${height} ${className} bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-lg animate-pulse`}></div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F1F8F4] dark:bg-slate-900 transition-colors duration-300 animate-in fade-in">
      {/* Header Banner Skeleton */}
      <div className="mb-10 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <SkeletonLoader width="w-64" height="h-10" className="mb-4" />
          <SkeletonLoader width="w-48" height="h-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Upcoming Pickup Card Skeleton */}
        <div className="mb-10">
          <SkeletonLoader width="w-40" height="h-7" className="mb-5" />
          <div className="rounded-2xl shadow-lg p-8 bg-white dark:bg-slate-800">
            <SkeletonLoader width="w-48" height="h-6" className="mb-6" />
            <div className="grid grid-cols-3 gap-6">
              <div>
                <SkeletonLoader width="w-32" height="h-4" className="mb-2" />
                <SkeletonLoader width="w-40" height="h-5" />
              </div>
              <div>
                <SkeletonLoader width="w-32" height="h-4" className="mb-2" />
                <SkeletonLoader width="w-40" height="h-5" />
              </div>
              <div>
                <SkeletonLoader width="w-32" height="h-4" className="mb-2" />
                <SkeletonLoader width="w-40" height="h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="mb-10">
          <SkeletonLoader width="w-32" height="h-7" className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white dark:bg-slate-800 rounded-xl shadow-sm animate-pulse" />
            ))}
          </div>
        </div>

        {/* Impact Stats Skeleton */}
        <div className="mb-10">
          <SkeletonLoader width="w-40" height="h-7" className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-white dark:bg-slate-800 rounded-xl shadow-sm animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationsSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 animate-in fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SkeletonLoader width="w-48" height="h-10" className="mb-8" />
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-white dark:bg-slate-800 rounded-lg shadow-sm animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PickupHistorySkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SkeletonLoader width="w-48" height="h-10" className="mb-6" />
        
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white dark:bg-slate-800 rounded-xl shadow-sm animate-pulse" />
          ))}
        </div>

        {/* Pickup Cards Skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-white dark:bg-slate-800 rounded-xl shadow-sm animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
