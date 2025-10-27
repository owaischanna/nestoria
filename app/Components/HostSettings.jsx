"use client";

import { useState } from "react";
import { CheckCircle, Bell, Lock, Moon, User, Shield } from "lucide-react";
import HostSidebar from "./HostSidebar";
import HostHeader from "./HostHeader";

export default function SettingsComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const [notifications, setNotifications] = useState({
    newApplications: { email: true, push: true },
    confirmations: { email: true, push: false },
    reminders: { email: true, sms: false },
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "Public",
    contactSharing: true,
    locationPrecision: "Approximate",
  });

  const [security, setSecurity] = useState({
    loginAlerts: true,
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <HostSidebar />
      <div className="flex-1 flex flex-col">
        <HostHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-500 mb-6">
            Manage your account preferences and hosting settings
          </p>

          {/* ---------------- ACCOUNT SETTINGS ---------------- */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center mb-4">
              <User className="text-green-600 mr-2" />
              <h2 className="font-semibold text-gray-800 text-lg">Account Settings</h2>
            </div>

            <div className="space-y-4">
              <SettingItem
                title="Email & Password"
                description="Change your email address or password"
                action={<button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">Change</button>}
              />

              <SettingItem
                title="Two-Factor Authentication"
                description="Add extra security to your account"
                toggle={twoFactor}
                setToggle={setTwoFactor}
              />

              <SettingItem
                title="Dark Theme"
                description="Enable dark theme"
                toggle={darkMode}
                setToggle={setDarkMode}
              />

              <SettingItem
                title="Identity Verification"
                status={
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" /> Verified
                  </div>
                }
                action={<button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">Manage</button>}
              />

              <div className="flex justify-end">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* ---------------- NOTIFICATION SETTINGS ---------------- */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center mb-4">
              <Bell className="text-green-600 mr-2" />
              <h2 className="font-semibold text-gray-800 text-lg">Notification Settings</h2>
            </div>

            <div className="space-y-4">
              <NotificationSetting
                title="New Applications"
                description="When someone applies to your apartment(s)"
                settings={notifications.newApplications}
                onChange={(key, val) =>
                  setNotifications((prev) => ({
                    ...prev,
                    newApplications: { ...prev.newApplications, [key]: val },
                  }))
                }
              />

              <NotificationSetting
                title="Booking Confirmations"
                description="When a booking is confirmed or cancelled"
                settings={notifications.confirmations}
                onChange={(key, val) =>
                  setNotifications((prev) => ({
                    ...prev,
                    confirmations: { ...prev.confirmations, [key]: val },
                  }))
                }
              />

              <NotificationSetting
                title="Check-in Reminders"
                description="Before a guest’s arrival"
                settings={notifications.reminders}
                onChange={(key, val) =>
                  setNotifications((prev) => ({
                    ...prev,
                    reminders: { ...prev.reminders, [key]: val },
                  }))
                }
              />

              <NotificationSetting
                title="Payment Received"
                description="When you receive rent payments"
                settings={{ email: true }}
                onChange={() => {}}
              />

              <div className="flex justify-end">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* ---------------- PRIVACY & SECURITY ---------------- */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center mb-4">
              <Shield className="text-green-600 mr-2" />
              <h2 className="font-semibold text-gray-800 text-lg">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <SettingItem
                title="Profile Visibility"
                description="Control who can see your profile information"
                action={
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, profileVisibility: e.target.value })
                    }
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                }
              />

              <SettingItem
                title="Contact Information Sharing"
                description="Allow verified guests to see your contact details"
                toggle={privacy.contactSharing}
                setToggle={(val) => setPrivacy({ ...privacy, contactSharing: val })}
              />

              <SettingItem
                title="Location Precision"
                description="Show exact address or approximate location only"
                action={
                  <div className="flex items-center gap-2">
                    {["Exact", "Approximate"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setPrivacy({ ...privacy, locationPrecision: opt })}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          privacy.locationPrecision === opt
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                }
              />

              <div className="flex justify-end">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* ---------------- SECURITY SETTINGS ---------------- */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Lock className="text-green-600 mr-2" />
                <h2 className="font-semibold text-gray-800 text-lg">Security Settings</h2>
              </div>
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                SECURE
              </span>
            </div>

            <div className="space-y-4">
              <SettingItem
                title="Login Alerts"
                description="Get notified when someone logs into your account"
                toggle={security.loginAlerts}
                setToggle={(val) => setSecurity({ ...security, loginAlerts: val })}
              />

              <SettingItem
                title="Active Sessions"
                description="Manage devices logged into your account"
                action={<button className="px-3 py-1 bg-gray-100 rounded text-sm">Manage</button>}
              />

              <SettingItem
                title="Password Requirements"
                description="Last changed: March 15, 2024"
                action={<button className="px-3 py-1 bg-gray-100 rounded text-sm">Change</button>}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* --- Reusable Sub Components --- */

const SettingItem = ({ title, description, toggle, setToggle, action, status }) => (
  <div className="flex justify-between items-center border-b last:border-0 pb-3">
    <div>
      <p className="font-medium text-gray-800">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {status && <div className="mt-1">{status}</div>}
    </div>
    {typeof toggle !== "undefined" ? (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={toggle}
          onChange={() => setToggle(!toggle)}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 transition-all"></div>
        <span className="ml-2 text-sm text-gray-500">{toggle ? "On" : "Off"}</span>
      </label>
    ) : (
      action
    )}
  </div>
);

const NotificationSetting = ({ title, description, settings, onChange }) => (
  <div className="border-b last:border-0 pb-3">
    <p className="font-medium text-gray-800">{title}</p>
    <p className="text-sm text-gray-500 mb-2">{description}</p>
    <div className="flex items-center space-x-6 text-sm text-gray-600">
      {Object.keys(settings).map((key) => (
        <ToggleOption
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          checked={settings[key]}
          onChange={(val) => onChange(key, val)}
        />
      ))}
    </div>
  </div>
);

const ToggleOption = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-1 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="accent-green-600"
    />
    <span>{label}</span>
  </label>
);
