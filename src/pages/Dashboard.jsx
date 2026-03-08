import React, { useState, useEffect } from "react";
import { Calendar, Package, Gift, MapPin, TrendingUp, Leaf, Award, Truck, CheckCircle, Plus } from "lucide-react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    upcomingPickup: null,
    impactStats: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Please login to view dashboard");
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    { title: "Schedule Pickup", icon: Calendar },
    { title: "View Rewards", icon: Gift },
    { title: "Track Pickup", icon: MapPin },
    { title: "Add More E-Waste", icon: Plus }
  ];

  // Helper mapping string icon names from backend to Lucide components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Package': return Package;
      case 'Leaf': return Leaf;
      case 'Award': return Award;
      case 'Calendar': return Calendar;
      case 'Gift': return Gift;
      case 'CheckCircle': return CheckCircle;
      default: return CheckCircle;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-8 bg-[#F1F8F4]"><div className="text-xl font-bold text-[#2E7D32]">Loading dashboard...</div></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center p-8 bg-[#F1F8F4]"><div className="text-xl font-bold text-red-600 bg-red-50 p-6 rounded-2xl">{error}</div></div>;
  }

  const { upcomingPickup, impactStats, recentActivity } = dashboardData;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1F8F4' }}>
      {/* Header Banner */}
      <div
        className="mb-10"
        style={{
          background: 'linear-gradient(135deg, #E2EFE6 0%, #d4e7d9 100%)',
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.08)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="w-10 h-10" style={{ color: '#2E7D32' }} />
            <h1 className="text-5xl font-bold" style={{ color: '#2E7D32' }}>Welcome Back</h1>
          </div>
          <p className="text-lg" style={{ color: '#5a7a5e' }}>Here's your recycling overview</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* Upcoming Pickup Card */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Upcoming Pickup</h2>
          {upcomingPickup ? (
            <div
              className="rounded-2xl shadow-lg border-l-8 p-8 relative"
              style={{
                backgroundColor: '#fafdfb',
                borderLeftColor: '#2E7D32',
                border: '1px solid rgba(46, 125, 50, 0.1)'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: '#E2EFE6' }}>
                    <Truck className="w-8 h-8" style={{ color: '#2E7D32' }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Pickup ID</p>
                    <p className="text-xl font-bold text-gray-800">{upcomingPickup.id}</p>
                  </div>
                </div>
                <span
                  className="px-5 py-2 text-white text-sm font-semibold rounded-full self-start shadow-md"
                  style={{ backgroundColor: '#2E7D32' }}
                >
                  {upcomingPickup.status}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-1" style={{ color: '#2E7D32' }} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Scheduled Date</p>
                    <p className="font-semibold text-gray-800">{upcomingPickup.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 mt-1" style={{ color: '#2E7D32' }} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Time Slot</p>
                    <p className="font-semibold text-gray-800">{upcomingPickup.timeSlot}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1" style={{ color: '#2E7D32' }} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Address</p>
                    <p className="font-semibold text-gray-800">{upcomingPickup.address}</p>
                  </div>
                </div>
              </div>

              <button
                className="px-8 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl flex items-center gap-2"
                style={{
                  backgroundColor: '#2E7D32',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)'
                }}
              >
                <MapPin className="w-5 h-5" />
                Track Pickup
              </button>
            </div>
          ) : (
            <div className="rounded-2xl shadow-lg p-8 text-center" style={{ backgroundColor: '#fafdfb', border: '1px solid rgba(46, 125, 50, 0.1)' }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#E2EFE6]">
                <Truck className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Upcoming Pickups</h3>
              <p className="text-gray-500 mb-6">You don't have any e-waste pickups scheduled at the moment.</p>
              <button
                className="px-6 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-[#236025] transition"
                style={{ backgroundColor: '#2E7D32' }}
              >
                Schedule Now
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    backgroundColor: '#fafdfb',
                    border: '1px solid rgba(46, 125, 50, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.3)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(46, 125, 50, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.1)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#E2EFE6' }}>
                      <Icon className="w-8 h-8" style={{ color: '#2E7D32' }} />
                    </div>
                    <p className="font-semibold text-gray-800">{action.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-7 h-7" style={{ color: '#2E7D32' }} />
            <h2 className="text-2xl font-bold text-gray-800">Your Environmental Impact</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {(impactStats && impactStats.length > 0 ? impactStats : [
              { label: "E-waste Recycled", value: "0", unit: "kg", iconName: "Package" },
              { label: "CO₂ Saved", value: "0", unit: "kg", iconName: "Leaf" },
              { label: "Rewards Earned", value: "0", unit: "pts", iconName: "Award" }
            ]).map((stat, index) => {
              const Icon = getIcon(stat.iconName);
              return (
                <div
                  key={index}
                  className="rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: '#E2EFE6',
                    border: '1px solid rgba(46, 125, 50, 0.15)'
                  }}
                >
                  <Icon className="w-12 h-12 mb-4" style={{ color: '#2E7D32' }} />
                  <div className="mb-2">
                    <span className="text-5xl font-bold" style={{ color: '#2E7D32' }}>{stat.value}</span>
                    <span className="text-2xl font-semibold text-gray-600 ml-1">{stat.unit}</span>
                  </div>
                  <p className="text-gray-700 font-medium text-lg">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div
          className="rounded-2xl shadow-lg p-9"
          style={{
            backgroundColor: '#fafdfb',
            border: '1px solid rgba(46, 125, 50, 0.1)'
          }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-7">Recent Activity</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#d4e7d9' }}></div>

            <div className="space-y-6">
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => {
                  const Icon = getIcon(activity.iconName);
                  return (
                    <div key={index} className="flex items-start gap-6 relative">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center border-4 shadow-lg"
                          style={{
                            backgroundColor: '#2E7D32',
                            borderColor: '#fafdfb'
                          }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" style={{ color: '#2E7D32' }} />
                            <p className="text-gray-800 font-semibold text-lg">{activity.text}</p>
                          </div>
                          <p
                            className="text-sm font-medium px-3 py-1 rounded-full"
                            style={{
                              color: '#5a7a5e',
                              backgroundColor: '#E2EFE6'
                            }}
                          >
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 italic">No recent activity found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
