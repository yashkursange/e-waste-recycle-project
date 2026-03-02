import React from "react";
import { Calendar, Clock, MapPin, Truck, User, Phone, CheckCircle, Package, Recycle, Navigation } from "lucide-react";
import LiveMap from "../components/LiveMap";

const PickupTracking = () => {
  const pickupDetails = {
    id: "#ECOR-1024",
    date: "20 Jan 2026",
    time: "10:00 AM – 12:00 PM",
    address: "123 Green Street, Eco City, 400001",
    driverName: "Rohan Kumar"
  };

  const trackingSteps = [
    {
      id: 1,
      label: "Scheduled",
      icon: Calendar,
      status: "completed"
    },
    {
      id: 2,
      label: "Driver Assigned",
      icon: User,
      status: "completed"
    },
    {
      id: 3,
      label: "On the Way",
      icon: Truck,
      status: "active"
    },
    {
      id: 4,
      label: "Picked Up",
      icon: Package,
      status: "pending"
    },
    {
      id: 5,
      label: "Recycled",
      icon: Recycle,
      status: "pending"
    }
  ];

  const currentStep = trackingSteps.findIndex(step => step.status === 'active');

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20">
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
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <Navigation className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Track Your Pickup</h1>
          </div>
          <p className="text-lg text-gray-600 ml-16">Stay updated on your e-waste collection in real time</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Modern Horizontal Progress Stepper */}
        <div className="bg-white rounded-3xl shadow-lg px-6 sm:px-8 lg:px-12 py-8 lg:py-10 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-8 lg:mb-10">Delivery Progress</h2>
          
          {/* Desktop Stepper */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Progress Line Background */}
              <div 
                className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"
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
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 lg:mb-8">Pickup Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <Package className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Pickup ID</p>
                    <p className="text-base font-medium text-gray-900">{pickupDetails.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <Calendar className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Date & Time</p>
                    <p className="text-base font-medium text-gray-900">{pickupDetails.date}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{pickupDetails.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Address</p>
                    <p className="text-base font-medium text-gray-900">{pickupDetails.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Driver Name</p>
                    <p className="text-base font-medium text-gray-900">{pickupDetails.driverName}</p>
                  </div>
                </div>
              </div>

              {/* Current Status Alert */}
              <div 
                className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200 flex items-center gap-4"
              >
                <div className="p-2 bg-green-100 rounded-xl">
                  <Truck className="w-6 h-6 text-green-700" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                </div>
                <div>
                  <p className="font-semibold text-green-900">Driver is on the way!</p>
                  <p className="text-sm text-green-700 mt-1">Estimated arrival: 15 minutes</p>
                </div>
              </div>
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
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  className="w-full px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  <Phone className="w-5 h-5" />
                  Contact Driver
                </button>

                <button 
                  className="w-full px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 hover:scale-[1.02]"
                >
                  <Calendar className="w-5 h-5" />
                  Reschedule Pickup
                </button>

                <button 
                  className="w-full px-6 py-3.5 bg-white hover:bg-red-50 text-red-600 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-red-300 hover:border-red-400 hover:scale-[1.02]"
                >
                  Cancel Pickup
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-6 sm:p-7 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed">
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
    </div>
  );
};

export default PickupTracking;
