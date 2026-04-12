import React, { useMemo, useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  Lock,
  LogOut,
  Bell,
  AtSign,
  CheckCircle2,
  Moon,
} from "lucide-react";
import useTheme from "../hooks/useTheme";

const Profile = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    fullAddress: "",
    city: "",
    zip: "",
  });

  const [profileDraft, setProfileDraft] = useState(profile);
  const [addressDraft, setAddressDraft] = useState(address);

  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdatesEnabled, setEmailUpdatesEnabled] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        if (res.ok) {
          const data = await res.json();
          const loadedProfile = {
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || ""
          };
          const loadedAddress = {
            fullAddress: data.address || "",
            city: data.city || "",
            zip: data.zip || ""
          };
          setProfile(loadedProfile);
          setAddress(loadedAddress);
          setProfileDraft(loadedProfile);
          setAddressDraft(loadedAddress);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const initials = useMemo(() => {
    const parts = (profile.name || "").trim().split(" ").filter(Boolean);
    if (!parts.length) return "ER";
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  }, [profile.name]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 2400);
  };

  const updateBackend = async (payload) => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch(err) {
      console.error(err);
      return false;
    }
  };

  const handleProfileSave = async () => {
    if (!profileDraft.name.trim() || !profileDraft.email.trim() || !profileDraft.phone.trim()) {
      setProfileError("Please fill all profile fields.");
      return;
    }

    const success = await updateBackend({ ...profileDraft, address: address.fullAddress, city: address.city, zip: address.zip });
    if(success) {
      setProfile(profileDraft);
      setProfileError("");
      setIsProfileEditing(false);
      showSuccess("Profile updated successfully.");
    } else {
      setProfileError("Failed to update profile.");
    }
  };

  const handleAddressSave = async () => {
    if (!addressDraft.fullAddress.trim() || !addressDraft.city.trim() || !addressDraft.zip.trim()) {
      setAddressError("Please fill all address fields.");
      return;
    }

    const success = await updateBackend({ ...profile, address: addressDraft.fullAddress, city: addressDraft.city, zip: addressDraft.zip });
    if(success) {
      setAddress(addressDraft);
      setAddressError("");
      setIsAddressEditing(false);
      showSuccess("Address updated successfully.");
    } else {
      setAddressError("Failed to update address.");
    }
  };

  const handleProfileCancel = () => {
    setProfileDraft(profile);
    setProfileError("");
    setIsProfileEditing(false);
  };

  const handleAddressCancel = () => {
    setAddressDraft(address);
    setAddressError("");
    setIsAddressEditing(false);
  };

  const tabButtonClass = (tab) =>
    `relative px-2 pb-3 text-sm sm:text-base transition-all duration-300 ${
      activeTab === tab
        ? "text-green-600 dark:text-green-400 font-semibold"
        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
    }`;

  const panelClass = (tab) =>
    `space-y-6 transition-all duration-300 ${
      activeTab === tab
        ? "opacity-100 translate-y-0"
        : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-green-50/30 dark:from-slate-900 dark:to-slate-800 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-2xl border border-green-100 dark:border-slate-700 bg-gradient-to-r from-green-50 to-white dark:from-slate-800 dark:to-slate-800/90 px-6 py-5 shadow-md transition-colors duration-300">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Profile & Settings</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage your EcoRecycle account details and preferences.</p>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 pt-4 shadow-md transition-colors duration-300">
          <div className="flex items-center gap-8 border-b border-slate-200 dark:border-slate-700">
            <button type="button" onClick={() => setActiveTab("profile")} className={tabButtonClass("profile")}>
              Profile
              <span
                className={`absolute left-0 -bottom-px h-0.5 w-full rounded-full bg-green-600 dark:bg-green-400 transition-all duration-300 ${
                  activeTab === "profile" ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>

            <button type="button" onClick={() => setActiveTab("settings")} className={tabButtonClass("settings")}>
              Settings
              <span
                className={`absolute left-0 -bottom-px h-0.5 w-full rounded-full bg-green-600 dark:bg-green-400 transition-all duration-300 ${
                  activeTab === "settings" ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/25 px-4 py-3 text-sm text-green-800 dark:text-green-300 transition-all duration-300 ${
            successMessage ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1 h-0 py-0 border-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{successMessage}</span>
          </div>
        </div>

        <div className="relative min-h-[700px]">
          <div className={panelClass("profile")}>
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-100 dark:border-slate-700 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center text-xl font-semibold">
                    {initials}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Profile Information</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your personal details</p>
                  </div>
                </div>

                {!isProfileEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsProfileEditing(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    <Settings className="h-4 w-4" />
                    Edit
                  </button>
                ) : null}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      value={isProfileEditing ? profileDraft.name : profile.name}
                      onChange={(e) => setProfileDraft((prev) => ({ ...prev, name: e.target.value }))}
                      readOnly={!isProfileEditing}
                      className={`w-full rounded-lg border px-9 py-2.5 text-base font-medium transition ${
                        isProfileEditing
                          ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      value={isProfileEditing ? profileDraft.email : profile.email}
                      onChange={(e) => setProfileDraft((prev) => ({ ...prev, email: e.target.value }))}
                      readOnly={!isProfileEditing}
                      className={`w-full rounded-lg border px-9 py-2.5 text-base font-medium transition ${
                        isProfileEditing
                          ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      value={isProfileEditing ? profileDraft.phone : profile.phone}
                      onChange={(e) => setProfileDraft((prev) => ({ ...prev, phone: e.target.value }))}
                      readOnly={!isProfileEditing}
                      className={`w-full rounded-lg border px-9 py-2.5 text-base font-medium transition ${
                        isProfileEditing
                          ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {profileError ? <p className="mt-4 text-sm text-red-600 dark:text-red-400">{profileError}</p> : null}

              {isProfileEditing ? (
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleProfileSave}
                    className="rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleProfileCancel}
                    className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </section>

            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-100 dark:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Address</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Pickup and contact location</p>
                </div>

                {!isAddressEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsAddressEditing(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    <Settings className="h-4 w-4" />
                    Edit
                  </button>
                ) : null}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">Full Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      value={isAddressEditing ? addressDraft.fullAddress : address.fullAddress}
                      onChange={(e) => setAddressDraft((prev) => ({ ...prev, fullAddress: e.target.value }))}
                      readOnly={!isAddressEditing}
                      className={`w-full rounded-lg border px-9 py-2.5 text-base font-medium transition ${
                        isAddressEditing
                          ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">City</label>
                  <input
                    type="text"
                    value={isAddressEditing ? addressDraft.city : address.city}
                    onChange={(e) => setAddressDraft((prev) => ({ ...prev, city: e.target.value }))}
                    readOnly={!isAddressEditing}
                    className={`w-full rounded-lg border px-3 py-2.5 text-base font-medium transition ${
                      isAddressEditing
                        ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">ZIP Code</label>
                  <input
                    type="text"
                    value={isAddressEditing ? addressDraft.zip : address.zip}
                    onChange={(e) => setAddressDraft((prev) => ({ ...prev, zip: e.target.value }))}
                    readOnly={!isAddressEditing}
                    className={`w-full rounded-lg border px-3 py-2.5 text-base font-medium transition ${
                      isAddressEditing
                        ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                    }`}
                  />
                </div>
              </div>

              {addressError ? <p className="mt-4 text-sm text-red-600 dark:text-red-400">{addressError}</p> : null}

              {isAddressEditing ? (
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddressSave}
                    className="rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleAddressCancel}
                    className="rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </section>
          </div>

          <div className={panelClass("settings")}>
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Account Settings</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Security and session management</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => alert("A password reset link has been sent to your email!")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <Lock className="h-4 w-4" />
                  Change Password
                </button>

                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </section>

            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Preferences</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose how you want updates from EcoRecycle</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 p-4">
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-900 dark:text-slate-100">Dark Mode</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Use a darker appearance across the app</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                      isDark ? "bg-green-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        isDark ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-900 dark:text-slate-100">Push Notifications</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Get alerts for pickups and rewards</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotificationsEnabled((prev) => !prev)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                      notificationsEnabled ? "bg-green-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 p-4">
                  <div className="flex items-center gap-3">
                    <AtSign className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-base font-medium text-slate-900 dark:text-slate-100">Email Updates</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive monthly eco impact summary</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEmailUpdatesEnabled((prev) => !prev)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                      emailUpdatesEnabled ? "bg-green-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        emailUpdatesEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
