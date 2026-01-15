import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clipboard, Bell } from "lucide-react";
import Navbar from "../components/Navbar";

const PickupConfirmation = () => {
  const navigate = useNavigate();

  const pickupDetails = {
    id: "#ECO-10234",
    date: "January 5, 2026",
    timeSlot: "Morning (9 AM - 12 PM)",
    address: "123 Green Street, Eco City, 400001"
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-stone-50 rounded-3xl shadow-sm p-8 md:p-12 border border-stone-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 rounded-full mb-6 border border-emerald-100">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Pickup Scheduled Successfully!
            </h1>
            <p className="text-lg text-slate-600">
              Thank you for choosing EcoRecycle. Your e-waste pickup has been confirmed.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-6 mb-8 border border-emerald-100">
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

          <div className="bg-sky-50 rounded-2xl p-6 mb-8 border border-sky-100">
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
                  <h3 className="font-semibold text-slate-800 mb-1">Earn Rewards</h3>
                  <p className="text-sm text-slate-600">
                    Reward points will be credited to your account after successful pickup
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-sm hover:bg-emerald-700 transition-all"
            >
              Track Pickup
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-stone-200 text-slate-800 py-4 px-6 rounded-xl font-bold text-lg hover:bg-stone-300 transition-all"
            >
              Go to Dashboard
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Need help?{" "}
              <a href="#" className="text-emerald-700 font-semibold hover:underline">
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
