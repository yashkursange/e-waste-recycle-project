import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Clipboard, Bell } from "lucide-react";

const PickupConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pickupDetails = location.state?.pickupDetails || {
    id: "#ECO-10234",
    date: "January 5, 2026",
    timeSlot: "Morning (9 AM - 12 PM)",
    address: "123 Green Street, Eco City, 400001"
  };

  const handleTrackPickup = () => {
    const pickupId = pickupDetails.id.replace('#ECO-', '');
    navigate(`/pickup-tracking/${pickupId}`, { 
      state: { pickupId: pickupId } 
    });
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12 transition-colors duration-300 animate-in fade-in duration-500">
        <div className="max-w-2xl w-full">
          <div className="bg-stone-50 dark:bg-slate-800 rounded-3xl shadow-sm p-8 md:p-12 border border-stone-200 dark:border-slate-700 transition-colors duration-300 dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_h3]:text-white dark:[&_p]:text-slate-300 dark:[&_span]:text-slate-300 animate-in zoom-in-95 fade-in duration-500">
            <div className="text-center mb-8 animate-in fade-in duration-700">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 rounded-full mb-6 border border-emerald-100 animate-in scale-95 duration-700">
                <CheckCircle className="w-12 h-12 text-emerald-600 animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                Pickup Scheduled Successfully!
              </h1>
              <p className="text-lg text-slate-600">
                Thank you for choosing EcoRecycle. Your e-waste pickup has been confirmed.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 mb-8 border border-emerald-100 dark:border-emerald-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clipboard className="w-5 h-5 text-emerald-700" />
                Pickup Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                  <span className="text-sm font-semibold text-slate-600">Pickup ID</span>
                  <span className="text-base font-bold text-emerald-700">{pickupDetails.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                  <span className="text-sm font-semibold text-slate-600">Date</span>
                  <span className="text-base font-semibold text-slate-800">{pickupDetails.date}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                  <span className="text-sm font-semibold text-slate-600">Time Slot</span>
                  <span className="text-base font-semibold text-slate-800">{pickupDetails.timeSlot}</span>
                </div>
                <div className="flex justify-between items-start py-2">
                  <span className="text-sm font-semibold text-slate-600">Address</span>
                  <span className="text-base font-semibold text-slate-800 text-right max-w-xs">
                    {pickupDetails.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-6 mb-8 border border-sky-100 dark:border-sky-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-sky-700" />
                What Happens Next?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Confirmation Call</h3>
                    <p className="text-sm text-slate-600">
                      Our team will contact you to confirm the pickup details
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Pickup Collection</h3>
                    <p className="text-sm text-slate-600">
                      Our certified recycler will collect your e-waste at the scheduled time
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Track Impact Points</h3>
                    <p className="text-sm text-slate-600">
                      Points will be credited to your leaderboard ranking after successful pickup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <button
                onClick={handleTrackPickup}
                className="flex-1 bg-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-sm hover:bg-emerald-700 active:scale-95 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Track Pickup
              </button>
              <button
                onClick={handleGoToDashboard}
                className="flex-1 bg-stone-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 py-4 px-6 rounded-xl font-bold text-lg hover:bg-stone-300 dark:hover:bg-slate-600 active:scale-95 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </button>
            </div>

            <div className="mt-6 text-center animate-in fade-in duration-700 delay-500">
              <p className="text-sm text-slate-500">
                Need help?{" "}
                <a href="#" className="text-emerald-700 font-semibold hover:underline transition">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickupConfirmation;
