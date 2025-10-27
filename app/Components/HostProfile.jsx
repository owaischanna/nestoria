"use client";

import React from "react";
import { 
  MapPin, 
  Calendar, 
  Languages, 
  Star, 
  Edit2, 
  CheckCircle, 
  Wifi, 
  Utensils, 
  Car, 
  Shirt,
  PawPrint,
  TreePine,
  Eye,
  MessageCircle,
  UserCheck,
  Clock,
  Trash2,
  ExternalLink
} from "lucide-react";
import HostSidebar from "./HostSidebar";
import HostHeader from "./HostHeader";

export default function HostProfile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <HostSidebar />

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Header */}
        <HostHeader />

        {/* ✅ Profile Content - All sections in vertical scrolling view */}
        <main className="p-6">
          {/* ---- Page Title ---- */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* ---- LEFT COLUMN ---- */}
            <div className="lg:w-1/3 space-y-6">
              {/* Host Stats */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-600 mb-4">
                  HOST STATISTICS
                </h2>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex justify-between">
                    <span>Total Properties</span>
                    <span className="font-medium">3</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Active Bookings</span>
                    <span className="font-medium">7</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total Reviews</span>
                    <span className="font-medium">47</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </li>
                </ul>
              </div>

              {/* Profile Completion */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-600 mb-3">
                  PROFILE COMPLETION
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Profile Completion <span className="font-medium">85%</span>
                </p>
                <p className="text-xs text-gray-600">Complete your profile:</p>
                <ul className="text-xs text-yellow-600 mt-1 list-disc list-inside space-y-1">
                  <li>Add Profile Photos</li>
                  <li>Verify Phone Number</li>
                </ul>
              </div>

              {/* Profile Tips */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-200">
                <h2 className="text-sm font-semibold text-blue-600 mb-3">PROFILE TIPS</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>💡 Complete profiles get 40% more bookings</li>
                  <li>📸 Add high-quality photos</li>
                </ul>
              </div>
            </div>

            {/* ---- RIGHT COLUMN ---- */}
            <div className="lg:w-2/3 space-y-6">
              {/* ---- Profile Overview Section ---- */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
                      MJ
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        Margaret Johnson
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle size={16} className="mr-1" /> Verified Host
                        </span>
                      </h2>
                      <p className="flex items-center text-gray-600 text-sm gap-2">
                        <MapPin size={14} /> Cantabria, Spain
                        <span>•</span> <Calendar size={14} /> Host since March 2022
                        <span>•</span> <Languages size={14} /> English, Spanish
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={16} fill={i < 4 ? "#facc15" : "none"} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">(47 reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <button className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-all">
                    <Edit2 size={16} /> Edit Profile
                  </button>
                </div>

                {/* Host Achievements */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Host Achievements
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                      🌟 Superhost
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                      🎖 Experienced Host
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      ⚡ Quick Responder
                    </span>
                  </div>
                </div>
              </div>

              {/* ---- About Section ---- */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-semibold text-gray-700">
                    About Margaret
                  </h3>
                  <Edit2 size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Hi there! I'm Margaret, a longtime Cantabria resident who loves hosting
                  international students and young professionals. As a retired teacher, I
                  understand the importance of creating a welcoming, study-friendly
                  environment.
                  <br />
                  <br />
                  I've been hosting for over 2 years and have had the pleasure of welcoming
                  guests from over 15 countries. My Victorian house in Park Slope has been
                  home to many students from NYU, Columbia, and other local universities.
                  <br />
                  <br />
                  When I'm not hosting, you can find me tending my garden, reading, or
                  exploring the amazing restaurants and cafés Brooklyn has to offer. I'm
                  always happy to share local recommendations and help my guests feel at
                  home in New York!
                </p>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Interests & Hobbies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Gardening", "Cooking", "Reading", "Local History", "Photography"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* ---- Contact Information Section ---- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="border-b pb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value="margaret.johnson@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      readOnly
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This is your primary contact email for bookings and notifications
                    </p>
                  </div>

                  {/* Phone Number */}
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Phone Number
                      </label>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    </div>
                    <input
                      type="tel"
                      value="+1 (555) 234-5678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      readOnly
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Phone verification helps build trust with guests
                    </p>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Emergency Contact
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                      Provide an emergency contact for safety purposes
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Emergency Contact Name
                        </label>
                        <input
                          type="text"
                          value="John Johnson"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value="+1 (555) 987-6543"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Relationship
                        </label>
                        <input
                          type="text"
                          value="Spouse"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* ---- Hosting Preferences Section ---- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Hosting Preferences</h2>
                
                <div className="space-y-8">
                  {/* Preferred Guest Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Preferred Guest Types
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Select the types of guests you prefer to host
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {["Students", "Young Professionals", "Business Travelers", "Families", "Couples"].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={["Students", "Young Professionals", "Business Travelers"].includes(type)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Stay Duration */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Preferred Stay Duration
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Short-term (1-3 months)", checked: true },
                        { label: "Medium-term (3-12 months)", checked: true },
                        { label: "Long-term (12+ months)", checked: false }
                      ].map((item) => (
                        <label key={item.label} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* House Rules & Restrictions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Smoking Policy */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Smoking Policy
                      </h3>
                      <div className="space-y-2">
                        {["No Smoking", "Smoking Allowed", "Smoking in Designated Areas"].map((policy) => (
                          <label key={policy} className="flex items-center">
                            <input
                              type="radio"
                              name="smoking"
                              defaultChecked={policy === "No Smoking"}
                              className="text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{policy}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Pet Policy */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Pet Policy
                      </h3>
                      <div className="space-y-2">
                        {["No Pets", "Pets Allowed", "Small Pets Only"].map((policy) => (
                          <label key={policy} className="flex items-center">
                            <input
                              type="radio"
                              name="pets"
                              defaultChecked={policy === "No Pets"}
                              className="text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{policy}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Guest Visits */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Guest Visits
                    </h3>
                    <div className="space-y-2">
                      {["No Visitors", "Visitors Allowed with Notice", "Visitors Allowed Freely"].map((policy) => (
                        <label key={policy} className="flex items-center">
                          <input
                            type="radio"
                            name="visitors"
                            defaultChecked={policy === "Visitors Allowed with Notice"}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{policy}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Communication Preferences
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Expected Response Time:</span>
                      <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Within 1 hour</option>
                        <option>Within 2 hours</option>
                        <option selected>Within 4 hours</option>
                        <option>Within 12 hours</option>
                        <option>Within 24 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>

              {/* ---- Margaret's Properties Section ---- */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Margaret's Properties (3)</h2>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors">
                    View All Listings
                  </button>
                </div>

                {/* Property Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Property Image */}
                      <div className="lg:w-1/3">
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=500&q=80"
                            alt="Cozy Room in Victorian House"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="lg:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              Cozy Room in Victorian House
                            </h3>
                            <p className="text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin size={14} /> Park Slope, Brooklyn
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">€750/month</p>
                            <p className="text-sm text-gray-500">Utilities included</p>
                          </div>
                        </div>

                        {/* Property Status */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Available
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Private Room
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            Shared Bath
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            120 sqft
                          </span>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Amenities</h4>
                          <div className="flex flex-wrap gap-4">
                            {[
                              { icon: Wifi, label: "WIFI" },
                              { icon: Utensils, label: "Kitchen Access" },
                              { icon: Car, label: "Parking" },
                              { icon: Shirt, label: "Laundry" },
                              { icon: PawPrint, label: "Pet Friendly" },
                              { icon: TreePine, label: "Garden" }
                            ].map((amenity, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <amenity.icon size={16} className="text-green-600" />
                                <span className="text-sm text-gray-600">{amenity.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="border-t pt-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Performance</h4>
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                            {[
                              { value: "124", label: "Total Views", icon: Eye },
                              { value: "18", label: "Inquiries", icon: MessageCircle },
                              { value: "8", label: "Applications", icon: UserCheck },
                              { value: "92%", label: "Response Rate", icon: MessageCircle },
                              { value: "2.4h", label: "Avg Response", icon: Clock }
                            ].map((metric, index) => (
                              <div key={index} className="text-center">
                                <p className="text-lg font-bold text-gray-800">{metric.value}</p>
                                <p className="text-xs text-gray-500">{metric.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                      <Edit2 size={16} /> Edit
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                      <Trash2 size={16} /> Delete
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2">
                      <ExternalLink size={16} /> View Live
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}