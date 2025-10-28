// RenterSettingsComponent.js
"use client";

import { useState } from "react";
// Import the separated header and sidebar components
import RenterHeader from "./RenterHeader";
import Sidebar from "./RenterSidebar";

import {
  Bell, Lock, User, CheckCircle, ChevronDown, Redo2 
} from "lucide-react";

// --- Helper Components for Settings Panels ---

// Shared style for setting rows
const SettingRow = ({ icon, title, subtitle, actionElement }) => (
    <div className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-200">
        <div className="flex items-start space-x-4">
            {icon && <div className="text-gray-500 pt-1">{icon}</div>}
            <div>
                <h4 className="text-base font-medium text-gray-800">{title}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            </div>
        </div>
        {actionElement}
    </div>
);

// Toggle Switch Component (Stub)
const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={checked} onChange={onChange}/>
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
    </label>
);

// --- Settings Panel Components ---

const AccountSettingsPanel = () => (
    <div id="account-settings" className="space-y-4">
        <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
            <button className="ml-auto px-4 py-2 text-sm bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                Save Changes
            </button>
        </div>

        <SettingRow
            title="Email & Password"
            subtitle="Change your email address or password"
            actionElement={
                <button className="px-4 py-2 text-sm border border-gray-300 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition">
                    Change
                </button>
            }
        />

        <SettingRow
            title="Two-Factor Authentication"
            subtitle="Add extra security to your account"
            actionElement={<ToggleSwitch checked={false} onChange={() => {}} />}
        />

        <SettingRow
            title="Dark Theme"
            subtitle="Enable dark theme"
            actionElement={<ToggleSwitch checked={false} onChange={() => {}} />}
        />
        
        <SettingRow
            title="Identity Verification"
            subtitle={<span className="text-orange-600">Verified</span>}
            actionElement={
                <button className="px-4 py-2 text-sm border border-gray-300 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition">
                    Manage
                </button>
            }
            icon={<CheckCircle className="w-5 h-5 text-orange-600" />}
        />
        
        {/* Security Settings Sub-Section */}
        <div className="space-y-4 pt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                     <Lock className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">SECURE</span>
            </div>
             
            <SettingRow
                title="Login Alerts"
                subtitle="Get notified when someone logs into your account"
                actionElement={<ToggleSwitch checked={true} onChange={() => {}} />}
            />

            <SettingRow
                title="Active Sessions"
                subtitle="Manage devices logged into your account"
                actionElement={
                    <button className="px-4 py-2 text-sm border border-gray-300 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition">
                        Manage
                    </button>
                }
            />

            <SettingRow
                title="Password Requirements"
                subtitle="Last changed: March 15, 2024"
                actionElement={
                    <button className="px-4 py-2 text-sm border border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition">
                        Change
                    </button>
                }
            />
        </div>
    </div>
);

const NotificationSettingsPanel = () => (
    <div id="notification-settings" className="space-y-4 mt-12">
        <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
            <button className="ml-auto px-4 py-2 text-sm bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                Save Changes
            </button>
        </div>

        {/* Application Notifications */}
        <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Application Notifications</h4>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                    <h5 className="text-base font-medium text-gray-800">Application Status Updates</h5>
                    <p className="text-sm text-gray-500">When hosts respond to your applications</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Email</span>
                    <ToggleSwitch checked={true} onChange={() => {}} />
                    <span className="text-sm text-gray-500">Push</span>
                    <ToggleSwitch checked={true} onChange={() => {}} />
                </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                    <h5 className="text-base font-medium text-gray-800">New Listing Alerts</h5>
                    <p className="text-sm text-gray-500">When properties matching your preferences are listed</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Email</span>
                    <ToggleSwitch checked={true} onChange={() => {}} />
                    <span className="text-sm text-gray-500">Push</span>
                    <ToggleSwitch checked={false} onChange={() => {}} />
                </div>
            </div>
            
             <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                    <h5 className="text-base font-medium text-gray-800">Price Drop Alerts</h5>
                    <p className="text-sm text-gray-500">When saved properties reduce their rent price</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Email</span>
                    <ToggleSwitch checked={true} onChange={() => {}} />
                    <span className="text-sm text-gray-500">SMS</span>
                    <ToggleSwitch checked={true} onChange={() => {}} />
                </div>
            </div>
        </div>
        
        {/* Booking & Payment Notifications */}
        <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Booking & Payment Notifications</h4>
            <div className="flex items-center justify-between py-2">
                <div>
                    <h5 className="text-base font-medium text-gray-800">Booking Confirmations</h5>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Email</span>
                    <ToggleSwitch checked={true} onChange={() => {}} />
                </div>
            </div>
        </div>
    </div>
);

const PrivacySecurityPanel = () => (
    <div id="privacy-security" className="space-y-4 mt-12">
        <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-semibold text-gray-900">Privacy & Security</h3>
            <button className="ml-auto px-4 py-2 text-sm bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                Save Changes
            </button>
        </div>
        
        <SettingRow
            title="Profile Visibility"
            subtitle="Control who can see your profile information"
            actionElement={
                <button className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center">
                    Public <ChevronDown className="w-4 h-4 ml-1" />
                </button>
            }
        />

        <SettingRow
            title="Contact Information Sharing"
            subtitle="Allow hosts to see your contact details"
            actionElement={<ToggleSwitch checked={true} onChange={() => {}} />}
        />

        <SettingRow
            title="Location Precision"
            subtitle="Show exact address or approximate location only"
            actionElement={
                <div className="inline-flex rounded-lg border border-gray-300">
                    <button className="px-3 py-1.5 text-sm text-gray-700 rounded-l-lg hover:bg-gray-50">
                        Exact
                    </button>
                    <button className="px-3 py-1.5 text-sm text-white bg-orange-500 rounded-r-lg hover:bg-orange-600 transition">
                        Approximate
                    </button>
                </div>
            }
        />
    </div>
);

// --- Main Renter Settings Component ---

export default function RenterSettingsComponent() {
    return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
  {/* Sidebar - always on the left */}
  <Sidebar />

  {/* Main Content Section */}
  <div className="flex flex-col flex-1 overflow-hidden">
    {/* Renter Header - stays on top of main content */}
    <RenterHeader />

    {/* Main Scrollable Content */}
    <main className="flex-1 overflow-y-auto p-8">
      {/* Settings Page Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <button className="flex items-center px-4 py-2 text-sm border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition">
          <Redo2 className="w-4 h-4 mr-2" />
          Reset All
        </button>
      </div>
      <p className="text-gray-500 mb-10">
        Manage your account preferences and hosting settings
      </p>

      {/* All Settings Panels */}
      <AccountSettingsPanel />
      <NotificationSettingsPanel />
      <PrivacySecurityPanel />
    </main>
  </div>
</div>

    );
};