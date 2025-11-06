import React from 'react';
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';
import { MapPin, Clock, Download, ChevronDown } from 'lucide-react';

const Checkouts = () => {
  const todayCheckouts = [
    {
      id: 1,
      name: "James Rodriguez",
      occupation: "Software Engineer",
      age: "28 years old",
      rating: "4.8",
      duration: "6 months",
      property: "Cozy Room in Victorian House",
      room: "Room A",
      location: "Park Slope, Brooklyn",
      scheduledTime: "11:00 AM - 12:00 PM",
      contact: "+1 (555) 987-6543",
      endDate: "October 28, 2025",
      totalPaid: "€4,500",
      securityDeposit: "€750",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
    }
  ];

  const upcomingCheckouts = [
    {
      id: 2,
      name: "Sarah Chen",
      occupation: "Student",
      age: "28 years old",
      rating: "4.8",
      duration: "6 months",
      property: "Cozy Room in Victorian House",
      room: "Room A",
      location: "Park Slope, Brooklyn",
      scheduledTime: "11:00 AM - 12:00 PM",
      contact: "+1 (555) 987-6543",
      endDate: "October 28, 2025",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
    }
  ];

  // Checkout Card Component
  const CheckoutCard = ({ checkout, isToday = false }) => {
    return (
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-4 md:p-6 md:space-x-6 mb-6">
        
        {/* Left Section: Tenant Avatar and Basic Info */}
        <div className="flex flex-col md:flex-row md:items-start md:w-48 md:flex-shrink-0 mb-4 md:mb-0">
          <div className="w-full md:w-48 mb-4 md:mb-0">
            <img 
              src={checkout.avatar}
              alt={checkout.name}
              className="w-full h-48 md:h-32 object-cover rounded-lg"
            />
          </div>
          <div className="md:ml-4 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">{checkout.name}</h3>
            <p className="text-sm text-gray-500 mt-1">(1) {checkout.occupation}</p>
            <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
              <span className="text-green-600 text-xs md:text-sm font-medium">✔ {checkout.age}</span>
              <span className="text-green-600 text-xs md:text-sm font-medium">✔ {checkout.rating} ✔</span>
              <span className="text-green-600 text-xs md:text-sm font-medium">✔ {checkout.duration}</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Property and Schedule Details */}
        <div className="flex-1 min-w-0">
          {/* Property Info */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
            <div className="flex-1">
              <h4 className="text-base md:text-lg font-bold text-gray-900">{checkout.property}</h4>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {checkout.location}
              </p>
              <p className="text-sm text-gray-600 mt-1">☐ {checkout.room}</p>
            </div>
            {isToday && (
              <span className="px-2 py-1 text-xs md:text-sm font-semibold bg-orange-100 text-orange-700 rounded-lg self-start">
                CHECK-OUT TODAY
              </span>
            )}
          </div>

          {/* Schedule & Contact Details */}
          <div className="mt-4 md:mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm md:text-base font-semibold text-gray-800 mb-3">Scheduled Time & Contact</p>
            <div className="flex flex-col md:flex-row md:justify-between text-sm gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-blue-600">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="font-medium text-xs md:text-sm">Scheduled Time</span>
                </div>
                <p className="md:ml-5 font-bold text-blue-600 text-xs md:text-sm">
                  {checkout.scheduledTime}
                  {isToday && <span className="text-xs text-red-500 ml-2">TODAY</span>}
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-gray-700 text-xs md:text-sm">Contact</div>
                <p className="text-gray-500 text-xs md:text-sm">{checkout.contact}</p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-gray-700 text-xs md:text-sm">Loose End Date</div>
                <p className="text-gray-500 text-xs md:text-sm">{checkout.endDate}</p>
              </div>
            </div>
          </div>

          {/* Payment Info - Only for Today's Checkouts */}
          {isToday && (
            <>
              <div className="mt-4 md:mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-3">Check-out Today</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 text-base md:text-lg">Total Paid: {checkout.totalPaid}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs md:text-sm">Security Deposit: {checkout.securityDeposit}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Checkout Preparation Status */}
          <div className="mt-4 md:mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-3 md:mb-4">Checkout Preparation Status</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="space-y-2">
                <div className="text-gray-900 text-xs md:text-sm font-medium">30-Day Notice</div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-900 text-xs md:text-sm font-medium">Pre-Inspection</div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-900 text-xs md:text-sm font-medium">Deposit Review</div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-900 text-xs md:text-sm font-medium">Key Return</div>
                <button className="py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md w-full">
                  Message Tenant
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Quick Actions */}
        <div className="flex flex-col justify-between items-stretch md:items-end pl-0 md:pl-6 border-t md:border-l border-gray-100 pt-4 md:pt-0 mt-4 md:mt-0 min-w-[150px]">
          <div className="text-sm space-y-2 mb-4">
            {/* Additional info can go here if needed */}
          </div>
          
          <div className="flex flex-col space-y-2 w-full">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 text-left">
              View Details
            </button>
            <button className="py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md">
              Call Tenant
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <HostSidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <HostHeader />
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 overflow-y-auto">
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Check-outs</h1>
              <p className="text-gray-600 text-sm md:text-base">Manage tenant departures and property transitions</p>
            </div>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm w-full sm:w-auto">
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Export</span>
            </button>
          </div>

          {/* Statistics Numbers */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-12 justify-between sm:justify-start">
              <div className="text-center min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">1</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">Today</div>
              </div>
              <div className="text-center min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">3</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">This Week</div>
              </div>
              <div className="text-center min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">2</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">Next Week</div>
              </div>
              <div className="text-center min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">12</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">Completed</div>
              </div>
            </div>
            
            {/* Checklist Dropdown */}
            <div className="flex items-center justify-center sm:justify-end">
              <button className="flex items-center space-x-2 px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm w-full sm:w-auto">
                <span>Checklist</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Today's Check-outs Section */}
          <div className="mb-8 md:mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Today's Check-outs ({todayCheckouts.length})
              </h2>
            </div>
            
            {/* Today's Checkouts List */}
            <div className="space-y-4 md:space-y-6">
              {todayCheckouts.map(checkout => (
                <CheckoutCard key={checkout.id} checkout={checkout} isToday={true} />
              ))}
            </div>
          </div>

          {/* Upcoming Check-outs Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Upcoming Check-outs ({upcomingCheckouts.length})
              </h2>
              <div className="text-xs md:text-sm text-gray-500">
                Next 30 days
              </div>
            </div>
            
            {/* Upcoming Checkouts List */}
            <div className="space-y-4 md:space-y-6">
              {upcomingCheckouts.map(checkout => (
                <CheckoutCard key={checkout.id} checkout={checkout} isToday={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkouts;