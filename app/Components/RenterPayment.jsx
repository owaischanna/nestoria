"use client";
import React, { useState } from "react";
import { CheckCircle, Euro, Calendar, MapPin, X, CreditCard, Wallet } from "lucide-react";
import RenterHeader from "./RenterHeader";
import Sidebar from "./RenterSidebar";

const RenterPayment = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedDigitalMethod, setSelectedDigitalMethod] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  const paymentData = {
    paidThisYear: "950.00",
    amountDue: "950.00",
    dueDate: "Nov 1, 2024",
    daysUntilDue: 4,
    monthlyRent: "950.00",
    listingName: "Modern Studio in Brooklyn",
    location: "Williamsburg, Brooklyn",
    unit: "Studio B",
    paymentBreakdown: {
      baseRent: "850.00",
      utilities: "75.00",
      serviceFee: "25.00",
    },
    isAutoPayScheduled: true,
  };

  const handlePayNow = () => {
    setShowPaymentModal(true);
    setActiveStep(1);
    setShowCardForm(false);
    setSelectedMethod("");
    setSelectedDigitalMethod("");
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    if (method === "card") {
      setShowCardForm(true);
      setActiveStep(2);
    } else if (method === "digital") {
      // If digital method is selected but no specific method chosen, don't proceed
      if (!selectedDigitalMethod) {
        return;
      }
      setShowCardForm(false);
      setActiveStep(2);
    }
  };

  const handleSelectDigitalMethod = (digitalMethod) => {
    setSelectedDigitalMethod(digitalMethod);
    setSelectedMethod("digital");
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setShowCardForm(false);
    setSelectedMethod("");
    setSelectedDigitalMethod("");
    setActiveStep(1);
  };

  const handleBackToMethods = () => {
    setShowCardForm(false);
    setSelectedMethod("");
    setSelectedDigitalMethod("");
    setActiveStep(1);
  };

  const handleContinueToPayment = () => {
    if (selectedMethod === "card") {
      setActiveStep(3);
      // Here you would typically process the payment
      console.log("Processing card payment...");
    } else if (selectedMethod === "digital" && selectedDigitalMethod) {
      setActiveStep(3);
      // Here you would typically redirect to the selected digital payment
      console.log(`Processing ${selectedDigitalMethod} payment...`);
    }
  };

  const getDigitalMethodDisplayName = (method) => {
    switch (method) {
      case "apple-google-pay":
        return "Apple Pay & Google Pay";
      case "paypal":
        return "PayPal";
      default:
        return method;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <RenterHeader />

        {/* Payments Page */}
        <main className="flex-1 p-8 pl-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
              <p className="text-gray-600">
                Manage your rent payments and billing information
              </p>
            </div>
            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
              Download Statement
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white  p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <CheckCircle className="w-7 h-7 text-green-600 mr-3" />
                <div>
                  <p className="text-gray-600 text-sm">Paid This Year</p>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    €{paymentData.paidThisYear}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <Euro className="w-7 h-7 text-red-500 mr-3" />
                <div>
                  <p className="text-gray-600 text-sm">Amount Due</p>
                  <h3 className="text-2xl font-semibold text-red-500">
                    €{paymentData.amountDue}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white  p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <Calendar className="w-7 h-7 text-yellow-500 mr-3" />
                <div>
                  <p className="text-gray-600 text-sm">
                    Due in {paymentData.daysUntilDue} days
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {paymentData.dueDate}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Current Payment Due */}
          <div className="bg-white  p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Current Payment Due{" "}
                <span className="ml-2 text-sm text-red-500 font-medium">
                  DUE SOON
                </span>
              </h3>

              {/* Auto-pay toggle (visual only) */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 font-medium">Auto-pay:</span>
                <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end pr-1">
                  <div className="w-3.5 h-3.5 bg-white rounded-full shadow"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start">
              {/* Listing Info */}
              <div className="flex items-start space-x-4">
                <div className="w-28 h-28 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Listing"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {paymentData.listingName}
                  </h4>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {paymentData.location} • {paymentData.unit}
                  </p>

                  {/* Breakdown */}
                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-medium mb-1">Payment Breakdown</p>
                    <ul className="space-y-0.5">
                      <li>Base Rent: €{paymentData.paymentBreakdown.baseRent}</li>
                      <li>Utilities: €{paymentData.paymentBreakdown.utilities}</li>
                      <li>Service Fee: €{paymentData.paymentBreakdown.serviceFee}</li>
                    </ul>
                  </div>

                  <p className="mt-3 text-sm text-red-600 font-medium">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    Payment Due Date: {paymentData.dueDate} (
                    {paymentData.daysUntilDue} days)
                  </p>
                </div>
              </div>

              {/* Actions + Rent */}
              <div className="text-right">
                <h3 className="text-2xl font-bold text-red-600">
                  €{paymentData.monthlyRent}
                </h3>
                <p className="text-gray-600 text-sm mb-4">Monthly Rent</p>

                {paymentData.isAutoPayScheduled && (
                  <p className="text-green-600 text-sm mb-2 font-medium">
                    ✅ Auto-pay scheduled
                  </p>
                )}

                <div className="space-x-2">
                  <button className="px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                    Update Method
                  </button>
                  <button 
                    onClick={handlePayNow}
                    className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {showCardForm ? "Add Credit/Debit Card" : "Select Payment Method"}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 pt-4">
              <div className="flex items-center justify-center mb-6">
                <div className={`flex items-center ${activeStep >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${activeStep >= 1 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">Select Method</span>
                </div>
                <div className={`w-16 h-0.5 mx-2 ${activeStep >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center ${activeStep >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${activeStep >= 2 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">Payment Details</span>
                </div>
                <div className={`w-16 h-0.5 mx-2 ${activeStep >= 3 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center ${activeStep >= 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${activeStep >= 3 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}>
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            {!showCardForm ? (
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                  
                  {/* Credit/Debit Card Option */}
                  <div className={`border-2 rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                    selectedMethod === "card" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleSelectMethod("card")}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <CreditCard className="w-6 h-6 text-gray-700 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Credit/Debit Card</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Add your credit or debit card for instant payments
                          </p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Instant payments
                            </div>
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Works with all major cards
                            </div>
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Auto-pay compatible
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition">
                        Select
                      </button>
                    </div>
                  </div>
                </div>

                {/* Other Payment Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Payment Options</h3>
                  
                  {/* Digital Wallet Option */}
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === "digital" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => selectedDigitalMethod && handleSelectMethod("digital")}
                  >
                    <div className="flex items-start space-x-3">
                      <Wallet className="w-6 h-6 text-gray-700 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Digital Wallet</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Use Apple Pay, Google Pay, or PayPal for quick payments
                        </p>
                        
                        {/* Digital Method Selection */}
                        <div className="mt-3 space-y-3">
                          {/* Apple & Google Pay Option */}
                          <div 
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedDigitalMethod === "apple-google-pay" 
                                ? "border-orange-500 bg-orange-50" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectDigitalMethod("apple-google-pay");
                            }}
                          >
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                              <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                                selectedDigitalMethod === "apple-google-pay" 
                                  ? "border-orange-500 bg-orange-500" 
                                  : "border-gray-300"
                              }`}>
                                {selectedDigitalMethod === "apple-google-pay" && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Apple Pay & Google Pay</span>
                          </div>

                          {/* PayPal Option */}
                          <div 
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedDigitalMethod === "paypal" 
                                ? "border-orange-500 bg-orange-50" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectDigitalMethod("paypal");
                            }}
                          >
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                              <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                                selectedDigitalMethod === "paypal" 
                                  ? "border-orange-500 bg-orange-500" 
                                  : "border-gray-300"
                              }`}>
                                {selectedDigitalMethod === "paypal" && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">PayPal Integration</span>
                          </div>
                        </div>

                        {/* Selection Status */}
                        {selectedDigitalMethod && (
                          <div className="mt-3 flex justify-end">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectMethod("digital");
                              }}
                              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition"
                            >
                              Select {getDigitalMethodDisplayName(selectedDigitalMethod)}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue Button for Selected Method */}
                {selectedMethod && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        if (selectedMethod === "card") {
                          handleSelectMethod("card");
                        } else if (selectedMethod === "digital" && selectedDigitalMethod) {
                          handleSelectMethod("digital");
                        }
                      }}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                    >
                      Continue with {selectedMethod === "card" ? "Credit Card" : getDigitalMethodDisplayName(selectedDigitalMethod)}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Credit Card Form */
              <div className="p-6">
                <div className="max-w-md mx-auto">
                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                        <div className="absolute right-3 top-3 text-gray-400 font-semibold">
                          VISA
                        </div>
                      </div>
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          placeholder="12/26"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Arma Chen"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Name as it appears on your card
                      </p>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Billing Address
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="same-address"
                          defaultChecked
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="same-address" className="ml-2 text-sm text-gray-700">
                          Same as profile address
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handleBackToMethods}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinueToPayment}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenterPayment;