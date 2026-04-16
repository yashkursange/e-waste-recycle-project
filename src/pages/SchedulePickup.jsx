import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, MapPin, Phone, CheckCircle, Loader } from "lucide-react";
import { showSuccess, showError, showLoading, dismissToast } from "../utils/toast";

const SchedulePickup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ewasteType: "",
    quantity: "",
    condition: "",
    address: "",
    city: "",
    postalCode: "",
    pickupDate: "",
    timeSlot: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showError("Please login first!");
      navigate("/login");
      return;
    }

    // Validate form
    if (!formData.ewasteType || !formData.quantity || !formData.condition || !formData.address || 
        !formData.city || !formData.postalCode || !formData.pickupDate || !formData.timeSlot || !formData.phoneNumber) {
      showError("Please fill all fields");
      return;
    }

    setLoading(true);
    const toastId = showLoading("Scheduling your pickup...");

    try {
      const res = await fetch("http://localhost:5000/pickup/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          ewaste_type: formData.ewasteType,
          quantity: formData.quantity,
          item_condition: formData.condition,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          pickup_date: formData.pickupDate,
          time_slot: formData.timeSlot,
          phone_number: formData.phoneNumber
        })
      });

      const data = await res.json();
      dismissToast(toastId);

      if (res.ok) {
        showSuccess("✓ Pickup scheduled successfully!");
        // Redirect to pickup confirmation with data
        setTimeout(() => {
          navigate("/pickup-confirmation", {
            state: {
              pickupDetails: {
                id: `#ECO-${data.pickupId}`,
                date: formData.pickupDate,
                timeSlot: formData.timeSlot,
                address: formData.address,
              }
            }
          });
        }, 500);
      } else {
        showError(data.error || "Failed to schedule pickup");
      }
    } catch (err) {
      console.log(err);
      dismissToast(toastId);
      showError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-stone-50 dark:bg-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 border border-stone-200 dark:border-slate-700 transition-colors duration-300 dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_label]:text-slate-200 dark:[&_p]:text-slate-300 dark:[&_input]:bg-slate-900 dark:[&_input]:text-white dark:[&_input]:border-slate-700 dark:[&_textarea]:bg-slate-900 dark:[&_textarea]:text-white dark:[&_textarea]:border-slate-700 dark:[&_select]:bg-slate-900 dark:[&_select]:text-white dark:[&_select]:border-slate-700">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
              Schedule E-Waste Pickup
            </h1>
            <p className="text-slate-600 text-lg">
              We'll collect your old electronics from your doorstep
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 space-y-5 border border-emerald-100 dark:border-emerald-800">
              <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-emerald-700" />
                E-Waste Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="ewasteType" className="block text-sm font-semibold text-slate-700 mb-2">
                    E-waste Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ewasteType"
                    name="ewasteType"
                    value={formData.ewasteType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-slate-700"
                  >
                    <option value="">Select e-waste type</option>
                      <option value="Mobile Phone">Mobile Phone</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Battery">Battery</option>
                      <option value="TV">TV</option>
                      <option value="Other">Other</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">Choose the category that best describes your item</p>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-semibold text-slate-700 mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                      placeholder="How many items?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <label className={`flex-1 cursor-pointer`}>
                      <input
                        type="radio"
                        name="condition"
                        value="Working"
                        checked={formData.condition === "Working"}
                        onChange={handleChange}
                        required
                        className="sr-only"
                      />
                      <div className={`px-6 py-3 rounded-lg border-2 text-center font-medium ${formData.condition === "Working"
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-stone-300 bg-white text-slate-700 hover:border-emerald-400"
                        }`}>
                        Working
                      </div>
                    </label>
                    <label className={`flex-1 cursor-pointer`}>
                      <input
                        type="radio"
                        name="condition"
                        value="Not Working"
                        checked={formData.condition === "Not Working"}
                        onChange={handleChange}
                        required
                        className="sr-only"
                      />
                      <div className={`px-6 py-3 rounded-lg border-2 text-center font-medium ${formData.condition === "Not Working"
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-stone-300 bg-white text-slate-700 hover:border-emerald-400"
                        }`}>
                        Not Working
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-6 space-y-5 border border-sky-100 dark:border-sky-800">
                <h2 className="text-lg font-bold text-sky-800 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sky-700" />
                  Pickup Details
                </h2>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                    className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none resize-none"
                    placeholder="Street address, building name, floor, etc."
                  />
                  <p className="text-xs text-slate-500 mt-1">Include landmarks to help our team find you easily</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-semibold text-slate-700 mb-2">
                      Postal / ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Pickup Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Time Slot <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none text-slate-700"
                    >
                      <option value="">Select time slot</option>
                      <option value="Morning">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening">Evening (4 PM - 7 PM)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">We'll try our best to accommodate your schedule</p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 space-y-5 border border-violet-100 dark:border-violet-800">
                <h2 className="text-lg font-bold text-violet-800 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-violet-700" />
                  Contact Details
                </h2>

                <div className="max-w-md">
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent outline-none"
                    placeholder="+91 98765 43210"
                  />
                  <p className="text-xs text-slate-500 mt-1">We'll call to confirm your pickup</p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <p className="text-sm text-emerald-800 font-medium">
                    Pickup is free and handled by certified recyclers
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    "Schedule Pickup"
                  )}
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default SchedulePickup;
