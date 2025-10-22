import React from "react";
import { TrendingUp, DollarSign, Calendar, AlertCircle, Download, MoreHorizontal } from "lucide-react";
import HostHeader from "./HostHeader";
import HostSidebar from "./HostSidebar";

const HostEarnings = () => {
  // Sample data for the earnings dashboard
  const earningsData = {
    totalEarned: "52,400",
    thisMonth: {
      amount: "4,250",
      change: "+12%",
      trend: "up"
    },
    outstanding: {
      amount: "1,700",
      change: "-5%",
      trend: "down"
    },
    monthlyRent: "2,500"
  };

  // Sample properties data
  const properties = [
    {
      id: 1,
      name: "Modern Studio in Brooklyn",
      location: "Williamsburg, Brooklyn",
      monthlyRent: "750.00",
      status: "occupied",
      lastPayment: "Nov 1, 2024",
      nextPayment: "Dec 1, 2024",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Luxury Apartment in Manhattan",
      location: "Upper East Side, Manhattan",
      monthlyRent: "1,200.00",
      status: "occupied",
      lastPayment: "Nov 2, 2024",
      nextPayment: "Dec 2, 2024",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Cozy Studio in Queens",
      location: "Astoria, Queens",
      monthlyRent: "550.00",
      status: "pending",
      lastPayment: "Oct 28, 2024",
      nextPayment: "Nov 28, 2024",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Sample transaction history
  const transactions = [
    {
      id: 1,
      property: "Modern Studio in Brooklyn",
      date: "Nov 1, 2024",
      amount: "750.00",
      type: "rent",
      status: "completed"
    },
    {
      id: 2,
      property: "Luxury Apartment in Manhattan",
      date: "Nov 2, 2024",
      amount: "1,200.00",
      type: "rent",
      status: "completed"
    },
    {
      id: 3,
      property: "Cozy Studio in Queens",
      date: "Oct 28, 2024",
      amount: "550.00",
      type: "rent",
      status: "pending"
    },
    {
      id: 4,
      property: "Modern Studio in Brooklyn",
      date: "Oct 1, 2024",
      amount: "750.00",
      type: "rent",
      status: "completed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "occupied":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✅";
      case "pending":
        return "⏳";
      case "occupied":
        return "🏠";
      default:
        return "●";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <HostSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HostHeader />

        {/* Earnings Dashboard */}
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Payments & Earnings</h1>
            <p className="text-gray-600 mt-2">
              Track rental income, manage payments, and view financial reports
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Earned */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Total Earned</h3>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">€{earningsData.totalEarned}</span>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+15.2% from last year</span>
              </div>
            </div>

            {/* This Month */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">This Month</h3>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">€{earningsData.thisMonth.amount}</span>
                <span className={`ml-2 text-sm font-medium ${
                  earningsData.thisMonth.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {earningsData.thisMonth.change}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">From 3 properties</p>
            </div>

            {/* Outstanding */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Outstanding</h3>
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">€{earningsData.outstanding.amount}</span>
                <span className={`ml-2 text-sm font-medium ${
                  earningsData.outstanding.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {earningsData.outstanding.change}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">1 payment pending</p>
            </div>

            {/* Monthly Rent */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Monthly Rent</h3>
                <DollarSign className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">€{earningsData.monthlyRent}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Average per property</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Properties Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Your Properties</h2>
                  <button className="text-sm text-orange-500 font-medium hover:text-orange-600">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={property.image}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{property.name}</h3>
                          <p className="text-sm text-gray-500">{property.location}</p>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(property.status)}`}>
                              {getStatusIcon(property.status)} {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">€{property.monthlyRent}</p>
                        <p className="text-sm text-gray-500">monthly</p>
                        <p className="text-xs text-gray-400 mt-1">Next: {property.nextPayment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.status === 'completed' ? 'bg-green-50' : 
                          transaction.status === 'pending' ? 'bg-yellow-50' : 'bg-gray-50'
                        }`}>
                          <DollarSign className={`w-5 h-5 ${
                            transaction.status === 'completed' ? 'text-green-500' : 
                            transaction.status === 'pending' ? 'text-yellow-500' : 'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{transaction.property}</h3>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">€{transaction.amount}</p>
                        <div className="flex items-center justify-end space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            transaction.status === 'completed' ? 'text-green-600 bg-green-50' : 
                            transaction.status === 'pending' ? 'text-yellow-600 bg-yellow-50' : 'text-gray-600 bg-gray-50'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total this month</span>
                    <span className="font-semibold text-gray-900">€2,500.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-600">Expected outstanding</span>
                    <span className="font-semibold text-orange-500">€550.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors text-left">
              <DollarSign className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Request Payment</h3>
              <p className="text-sm text-gray-600">Send payment reminders to tenants</p>
            </button>

            <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors text-left">
              <Download className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Download Reports</h3>
              <p className="text-sm text-gray-600">Export financial statements</p>
            </button>

            <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors text-left">
              <TrendingUp className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
              <p className="text-sm text-gray-600">Detailed earnings insights</p>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HostEarnings;