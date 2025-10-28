import React from 'react';
import HostHeader from './HostHeader';
import HostSidebar from './HostSidebar';
import { Calendar, Image, ChevronDown } from 'lucide-react';

const MaintenanceManagement = () => {
  const openRequests = [
    {
      id: 1,
      title: "Electrical Outlet Not Working",
      tenant: "Sarah Chen (Tenant)",
      property: "Victoria House - Room A",
      category: "Electrical",
      date: "Oct 26, 2024 - 9:30 AM",
      description: "The electrical outlet in the bedroom stopped working completely. Tried multiple devices and nothing works. Need immediate attention as it's affecting my study setup.",
      priority: "URGENT",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=80&q=80"
    },
    {
      id: 2,
      title: "Kitchen Sink Leak",
      tenant: "Alex Kim (Tenant)",
      property: "Modern Studio House",
      category: "Plumbing",
      date: "Oct 26, 2024 - 9:30 AM",
      description: "The Kitchen sink has started leaking again, tried multiple devices and nothing works. Need immediate attention as it's affecting my study setup.",
      priority: "URGENT",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
    }
  ];

  const MaintenanceCard = ({ request }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {/* Request Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
          <span className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-700 rounded-lg">
            {request.priority}
          </span>
        </div>

        {/* Tenant and Property Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <img 
                src={request.avatar}
                alt={request.tenant}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <div>
                <span className="text-sm text-gray-500">A.</span>
                <span className="text-sm text-gray-900 ml-1">{request.tenant}</span>
              </div>
            </div>
            <div className="flex items-center ml-11">
              <span className="text-sm text-gray-500">B.</span>
              <span className="text-sm text-gray-900 ml-1">{request.property}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm text-gray-900 ml-2">{request.category}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">{request.date}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{request.description}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">All Properties</div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
              <Image className="w-4 h-4" />
              <span>View Photos</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
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
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Maintenance Management</h1>
            <p className="text-gray-600">Track and manage property maintenance requests and repairs</p>
          </div>

          {/* Statistics Numbers */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">1</div>
                <div className="text-sm text-gray-500 mt-1">Open Request</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-500 mt-1">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-500 mt-1">Completed</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* Open Requests Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Open Requests ({openRequests.length})
              </h2>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
                <span>All Properties</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Requests List */}
            <div>
              {openRequests.map(request => (
                <MaintenanceCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceManagement;