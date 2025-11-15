// RenterSettingsComponent.js
"use client";

import { useState, useEffect } from "react";
import RenterHeader from "./RenterHeader";
import Sidebar from "./RenterSidebar";
import toast from 'react-hot-toast'; // Make sure you have react-hot-toast installed
import { Bell, Lock, User, ChevronDown, Loader2 } from "lucide-react";

// --- Helper Components (Unchanged) ---
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

const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
    </label>
);
// ------------------------------------

// --- Settings Panel Components ---
// These are now "dumb" components that just receive state and send changes up.

const AccountSettingsPanel = ({ settings, onSettingChange, onPasswordChange }) => (
    <div id="account-settings" className="space-y-4">
        <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
        </div>

        <SettingRow
            title="Dark Theme"
            subtitle="Enable dark theme"
            actionElement={
                <ToggleSwitch
                    checked={settings.uiTheme === 'dark'}
                    onChange={(e) => onSettingChange('uiTheme', e.target.checked ? 'dark' : 'light')}
                />
            }
        />

        {/* Security Settings Sub-Section */}
        <div className="space-y-4 pt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Lock className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
                </div>
            </div>

            <SettingRow
                title="Login Alerts"
                subtitle="Get notified when someone logs into your account"
                actionElement={
                    <ToggleSwitch
                        checked={settings.wantsLoginAlerts}
                        onChange={(e) => onSettingChange('wantsLoginAlerts', e.target.checked)}
                    />
                }
            />

            <SettingRow
                title="Change Password"
                subtitle="Last changed: March 15, 2024" // This should be dynamic
                actionElement={
                    <button
                        onClick={onPasswordChange} // This would open a modal
                        className="px-4 py-2 text-sm border border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition"
                    >
                        Change
                    </button>
                }
            />
        </div>
    </div>
);

const NotificationSettingsPanel = ({ settings, onSettingChange }) => {
    const prefs = settings.notificationPreferences;

    // Helper to safely update nested state
    const handleNotifChange = (key, type, value) => {
        onSettingChange('notificationPreferences', {
            ...prefs,
            [key]: {
                ...prefs[key],
                [type]: value,
            },
        });
    };

    return (
        <div id="notification-settings" className="space-y-4 mt-12">
            <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
            </div>

            <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Application Notifications</h4>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                        <h5 className="text-base font-medium text-gray-800">Application Status Updates</h5>
                        <p className="text-sm text-gray-500">When hosts respond</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Email</span>
                        <ToggleSwitch
                            checked={prefs.applicationStatus.email}
                            onChange={(e) => handleNotifChange('applicationStatus', 'email', e.target.checked)}
                        />
                        <span className="text-sm text-gray-500">Push</span>
                        <ToggleSwitch
                            checked={prefs.applicationStatus.push}
                            onChange={(e) => handleNotifChange('applicationStatus', 'push', e.target.checked)}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                        <h5 className="text-base font-medium text-gray-800">New Listing Alerts</h5>
                        <p className="text-sm text-gray-500">When new properties match</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Email</span>
                        <ToggleSwitch
                            checked={prefs.newListingAlerts.email}
                            onChange={(e) => handleNotifChange('newListingAlerts', 'email', e.target.checked)}
                        />
                        <span className="text-sm text-gray-500">Push</span>
                        <ToggleSwitch
                            checked={prefs.newListingAlerts.push}
                            onChange={(e) => handleNotifChange('newListingAlerts', 'push', e.target.checked)}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                        <h5 className="text-base font-medium text-gray-800">Price Drop Alerts</h5>
                        <p className="text-sm text-gray-500">On your saved properties</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Email</span>
                        <ToggleSwitch
                            checked={prefs.priceDropAlerts.email}
                            onChange={(e) => handleNotifChange('priceDropAlerts', 'email', e.target.checked)}
                        />
                        <span className="text-sm text-gray-500">SMS</span>
                        <ToggleSwitch
                            checked={prefs.priceDropAlerts.sms}
                            onChange={(e) => handleNotifChange('priceDropAlerts', 'sms', e.target.checked)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Booking & Payment</h4>
                <div className="flex items-center justify-between py-2">
                    <div>
                        <h5 className="text-base font-medium text-gray-800">Booking Confirmations</h5>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Email</span>
                        <ToggleSwitch
                            checked={prefs.bookingConfirmations.email}
                            onChange={(e) => handleNotifChange('bookingConfirmations', 'email', e.target.checked)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PrivacySecurityPanel = ({ settings, onSettingChange }) => {
    const privacy = settings.privacySettings;

    const handlePrivacyChange = (key, value) => {
        onSettingChange('privacySettings', {
            ...privacy,
            [key]: value,
        });
    };

    return (
        <div id="privacy-security" className="space-y-4 mt-12">
            <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Privacy & Security</h3>
            </div>

            <SettingRow
                title="Profile Visibility"
                subtitle="Control who can see your profile information"
                actionElement={
                    <div className="relative">
                        <select
                            value={privacy.profileVisibility}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition appearance-none pr-8"
                        >
                            <option>Public</option>
                            <option>Hosts Only</option>
                            <option>Private</option>
                        </select>
                        <ChevronDown className="w-4 h-4 ml-1 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                }
            />

            <SettingRow
                title="Contact Information Sharing"
                subtitle="Allow hosts to see your contact details"
                actionElement={
                    <ToggleSwitch
                        checked={privacy.shareContactInfo}
                        onChange={(e) => handlePrivacyChange('shareContactInfo', e.target.checked)}
                    />
                }
            />

            <SettingRow
                title="Location Precision"
                subtitle="Show exact address or approximate location"
                actionElement={
                    <div className="inline-flex rounded-lg border border-gray-300">
                        <button
                            onClick={() => handlePrivacyChange('locationPrecision', 'Exact')}
                            className={`px-3 py-1.5 text-sm rounded-l-lg transition ${privacy.locationPrecision === 'Exact' ? 'text-white bg-orange-500' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            Exact
                        </button>
                        <button
                            onClick={() => handlePrivacyChange('locationPrecision', 'Approximate')}
                            className={`px-3 py-1.5 text-sm rounded-r-lg transition ${privacy.locationPrecision === 'Approximate' ? 'text-white bg-orange-500' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            Approximate
                        </button>
                    </div>
                }
            />
        </div>
    );
};

// --- Main Renter Settings Component ---
const defaultSettings = {
    uiTheme: 'light',
    wantsLoginAlerts: true,
    notificationPreferences: {
        applicationStatus: { email: true, push: true },
        newListingAlerts: { email: true, push: false },
        priceDropAlerts: { email: true, sms: false },
        bookingConfirmations: { email: true },
    },
    privacySettings: {
        profileVisibility: 'Public',
        shareContactInfo: true,
        locationPrecision: 'Approximate',
    },
};

export default function RenterSettingsComponent() {
    const [settings, setSettings] = useState(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // 1. Load settings on component mount
    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/users/me/settings');
                if (!response.ok) throw new Error('Failed to load settings');

                const data = await response.json();
                if (data.success) {
                    // Merge fetched settings with defaults to avoid errors if new fields are missing
                    setSettings(prev => ({ ...prev, ...data.settings }));
                }
            } catch (error) {
                toast.error(error.message || 'Could not load your settings.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // 2. Handle changes to any setting
    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // 3. Handle saving all settings
    const handleSaveAllSettings = async () => {
        setIsSaving(true);
        const loadingToast = toast.loading('Saving settings...');
        try {
            const response = await fetch('/api/users/me/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to save settings');

            toast.success(data.message, { id: loadingToast });
        } catch (error) {
            toast.error(error.message, { id: loadingToast });
        } finally {
            setIsSaving(false);
        }
    };

    // 4. Placeholder for password change modal
    const handlePasswordChange = () => {
        // This is where you would open a modal to get current/new password
        // For now, we'll just log it.
        console.log("Open change password modal...");
        // The modal would then call the '/api/users/me/change-password' API
        toast('Password change modal not implemented yet.', { icon: 'ℹ️' });
    };

    if (isLoading) {
        return (
            <div className="flex h-screen bg-gray-50 items-center justify-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <RenterHeader />
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        {/* The single save button for all settings */}
                        <button
                            onClick={handleSaveAllSettings}
                            disabled={isSaving}
                            className="flex items-center px-6 py-2 text-sm bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            {isSaving ? 'Saving...' : 'Save All Changes'}
                        </button>
                    </div>
                    <p className="text-gray-500 mb-10">
                        Manage your account preferences and security settings
                    </p>

                    {/* Pass state and handlers down to each panel */}
                    <AccountSettingsPanel
                        settings={settings}
                        onSettingChange={handleSettingChange}
                        onPasswordChange={handlePasswordChange}
                    />
                    <NotificationSettingsPanel
                        settings={settings}
                        onSettingChange={handleSettingChange}
                    />
                    <PrivacySecurityPanel
                        settings={settings}
                        onSettingChange={handleSettingChange}
                    />
                </main>
            </div>
        </div>
    );
};