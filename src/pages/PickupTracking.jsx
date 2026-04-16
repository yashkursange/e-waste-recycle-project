import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Truck, User, Phone, CheckCircle, Package, Recycle, Navigation, X, Loader } from "lucide-react";
import { showSuccess, showError, dismissToast, showLoading, updateToast } from "../utils/toast";
import LiveMap from "../components/LiveMap";

const PickupTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: urlId } = useParams();
  
  const pickupIdFromState = location.state?.pickupId || null;
  const pickupId = urlId || pickupIdFromState || null;

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(!!pickupId);
  const [cancelling, setCancelling] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);

  const [pickupDetails, setPickupDetails] = useState({
    id: "#ECOR-1024",
    date: "20 Jan 2026",
    time: "10:00 AM – 12:00 PM",
    address: "123 Green Street, Eco City, 400001",
    driverName: "Rohan Kumar",
    status: "pending"
  });

  useEffect(() => {
    if (!pickupId) {
      setLoading(false);
      return;
    }
    
    const fetchTracking = async () => {
      try {
        const res = await fetch(`http://localhost:5000/pickup/${pickupId}/tracking`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        if (res.ok) {
          const data = await res.json();
          setPickupDetails(prev => ({
            ...prev,
            id: data.id,
            date: data.date,
            time: data.time,
            address: data.address,
            status: data.status // will be pending, in progress, completed, or cancelled
          }));
        }
      } catch (err) {
        console.error("Failed to fetch tracking details", err);
        showError("Failed to load tracking details");
      } finally {
        setLoading(false);
      }
    };
    fetchTracking();
  }, [pickupId]);

  const handleCancelPickup = async () => {
    try {
      // Ensure we use the exact ID we have loaded from tracking
      const rawId = String(pickupDetails.id || "");
      const dbId = rawId.replace('#ECO-', '').replace('#ECOR-', '').trim();
      
      if (!dbId || dbId === "1024") {
        showError("No valid pickup record found.");
        return;
      }
      
      if (!window.confirm("Are you sure you want to cancel this pickup? This action cannot be undone.")) {
        return;
      }

      setCancelling(true);
      const toastId = showLoading("Cancelling pickup...");

      const res = await fetch(`http://localhost:5000/pickup/${dbId}/cancel`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      
      dismissToast(toastId);
      
      if (res.ok) {
        showSuccess("✓ Pickup cancelled successfully.");
        setPickupDetails(prev => ({ ...prev, status: "cancelled" }));
      } else {
        let errorMsg = "Unknown error";
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorMsg;
        } catch(e) {}
        showError("Failed to cancel pickup: " + errorMsg);
      }
    } catch (err) {
      console.error(err);
      showError("Server or network error. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const handleReschedule = async () => {
    try {
      if (!newDate) {
        showError("Please select a date.");
        return;
      }
      
      const rawId = String(pickupDetails.id || "");
      const dbId = rawId.replace('#ECO-', '').replace('#ECOR-', '').trim();
      if (!dbId || dbId === "1024") {
        showError("No valid pickup record found.");
        return;
      }
      
      setRescheduling(true);
      const toastId = showLoading("Rescheduling pickup...");

      const res = await fetch(`http://localhost:5000/pickup/${dbId}/reschedule`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token") 
        },
        body: JSON.stringify({ newDate })
      });
      
      dismissToast(toastId);
      
      if (res.ok) {
        showSuccess("✓ Pickup rescheduled successfully!");
        setPickupDetails(prev => ({ ...prev, date: newDate }));
        setShowRescheduleModal(false);
      } else {
        let errStr = "Unknown error";
        try { 
          const errData = await res.json(); 
          errStr = errData.error; 
        } catch(e){}
        showError("Failed to reschedule: " + errStr);
      }
    } catch(err) {
      showError("Server or network error. Please try again.");
    } finally {
      setRescheduling(false);
    }
  };

  const dbStatus = pickupDetails.status;
  const isCancelled = dbStatus === 'cancelled';

  const trackingSteps = [
    {
      id: 1,
      label: "Scheduled",
      icon: Calendar,
      status: isCancelled ? "pending" : "completed"
    },
    {
      id: 2,
      label: "Driver Assigned",
      icon: User,
      status: isCancelled ? "pending" : (dbStatus === 'completed' || dbStatus === 'in progress' ? 'completed' : 'active')
    },
    {
      id: 3,
      label: "On the Way",
      icon: Truck,
      status: isCancelled ? "pending" : (dbStatus === 'completed' ? 'completed' : (dbStatus === 'in progress' ? 'active' : 'pending'))
    },
    {
      id: 4,
      label: "Picked Up",
      icon: Package,
      status: isCancelled ? "pending" : (dbStatus === 'completed' ? 'completed' : 'pending')
    },
    {
      id: 5,
      label: "Recycled",
      icon: Recycle,
      status: "pending"
    }
  ];

  const currentStep = trackingSteps.findIndex(step => step.status === 'active') === -1 ? trackingSteps.length - 1 : trackingSteps.findIndex(step => step.status === 'active');

  // Map coordinates (example)
  const userLocation = {
    lat: 19.0760,
    lng: 72.8777
  };

  const driverLocation = {
    lat: 19.0896,
    lng: 72.8656
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Modern Header with Soft Gradient */}
      <div 
        className="relative py-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e8f5e9 50%, #ffffff 100%)'
        }}
      >
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #2e8b57 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm transition-colors duration-300">
              <Navigation className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Track Your Pickup</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-slate-300 ml-16">Stay updated on your e-waste collection in real time</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Modern Horizontal Progress Stepper */}
        <div className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-3xl shadow-lg px-6 sm:px-8 lg:px-12 py-8 lg:py-10 mb-10 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-8 lg:mb-10">Delivery Progress</h2>
          
          {/* Desktop Stepper */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Progress Line Background */}
              <div 
                className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-700"
                style={{ zIndex: 0 }}
              ></div>
              
              {/* Progress Line Fill */}
              <div 
                className="absolute top-8 left-0 h-0.5 bg-green-600 transition-all duration-700 ease-out"
                style={{ 
                  width: `${(currentStep / (trackingSteps.length - 1)) * 100}%`,
                  zIndex: 0
                }}
              ></div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = step.status === 'completed';
                  const isActive = step.status === 'active';
                  const isPending = step.status === 'pending';

                  return (
                    <div key={step.id} className="flex flex-col items-center relative" style={{ width: '20%', zIndex: 1 }}>
                      {/* Icon Circle */}
                      <div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                          isActive ? 'shadow-lg shadow-green-200' : 'shadow-md'
                        }`}
                        style={{ 
                          backgroundColor: isCompleted || isActive ? '#16a34a' : '#e5e7eb',
                          boxShadow: isActive ? '0 0 0 4px rgba(22, 163, 74, 0.15)' : undefined,
                          animation: isActive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : undefined
                        }}
                      >
                        <Icon 
                          className="w-7 h-7" 
                          style={{ 
                            color: isCompleted || isActive ? '#ffffff' : '#9ca3af'
                          }} 
                        />
                      </div>
                      
                      {/* Label */}
                      <p 
                        className={`text-center font-medium text-sm ${
                          isCompleted || isActive ? 'text-gray-800' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </p>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <span 
                          className="mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700"
                        >
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 mt-2 text-green-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Stepper */}
          <div className="md:hidden space-y-4">
            {trackingSteps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div 
                  key={step.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    isActive ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: isCompleted || isActive ? '#16a34a' : '#e5e7eb'
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCompleted || isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-xs text-green-700 mt-1">In Progress</p>
                    )}
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pickup Details Card */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <div className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-3xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 lg:mb-8">Pickup Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <Package className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-1">Pickup ID</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{pickupDetails.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <Calendar className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-1">Date & Time</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{pickupDetails.date}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{pickupDetails.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-1">Address</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{pickupDetails.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-1">Driver Name</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{pickupDetails.driverName}</p>
                  </div>
                </div>
              </div>

              {/* Current Status Alert */}
              {!isCancelled ? (
                <div 
                  className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200 flex items-center gap-4"
                >
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Truck className="w-6 h-6 text-green-700" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Driver is resolving your pickup.</p>
                    <p className="text-sm text-green-700 mt-1">Status: {dbStatus}</p>
                  </div>
                </div>
              ) : (
                <div 
                  className="mt-8 p-5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-4"
                >
                  <div className="p-2 bg-red-100 rounded-xl">
                    <Package className="w-6 h-6 text-red-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-900">This pickup was cancelled.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Live Map */}
            <LiveMap 
              userLocation={userLocation}
              driverLocation={driverLocation}
              autoUpdate={true}
            />
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            
            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-3xl shadow-lg p-6 sm:p-7 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => alert("Connecting to driver...")}
                  className="w-full px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50"
                  disabled={isCancelled}
                >
                  <Phone className="w-5 h-5" />
                  Contact Driver
                </button>

                <button 
                  onClick={() => setShowRescheduleModal(true)}
                  disabled={isCancelled || dbStatus === 'completed'}
                  className="w-full px-6 py-3.5 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-100 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 hover:scale-[1.02] disabled:opacity-50"
                >
                  <Calendar className="w-5 h-5" />
                  Reschedule Pickup
                </button>

                <button 
                  onClick={handleCancelPickup}
                  disabled={isCancelled || dbStatus === 'completed'}
                  className="w-full px-6 py-3.5 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-300 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-red-300 dark:border-red-700 hover:border-red-400 hover:scale-[1.02] disabled:opacity-50"
                >
                  Cancel Pickup
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl shadow-lg p-6 sm:p-7 border border-green-100 dark:border-slate-700 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg transition-colors duration-300">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-slate-300 mb-5 leading-relaxed">
                Our support team is here to assist you with any questions about your pickup.
              </p>
              <button 
                className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Reschedule Pickup
              </h3>
              <button onClick={() => setShowRescheduleModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Select New Date</label>
              <input 
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-white"
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReschedule}
                className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupTracking;
