import React from 'react';
import { ArrowLeft, Heart, MapPin, Wifi, Car, Users, Dog } from 'lucide-react';

const ListingDetail = ({ listing, onBack, onApply }) => {
  if (!listing) return null;

  return (
    <div className="w-full py-6 pl-0 pr-6 ml-6"> {/* removed px & centered width */}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5 mr-6" />
        </button>
      </div>

      {/* Title + Location + Price */}
      <div className="flex justify-between items-start mb-4 mr-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{listing.location}</span>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-green-700">${listing.price}</h2>
          <p className="text-gray-600">per month</p>
        </div>
      </div>

      {/* Image + Host Section Side by Side */}
      <div className="grid grid-cols-3 gap-6 mb-8 mr-6">
        {/* Main Image */}
        <div className="col-span-2">
          <div className="rounded-xl overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Small Thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-3 mr-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden">
                <img
                  src={listing.image}
                  alt={`${listing.title}-${item}`}
                  className="w-full h-28 object-cover hover:opacity-90 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Host Info */}
        <div className="col-span-1">
          <div className="border rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Your Host</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="font-semibold text-gray-600">MJ</span>
              </div>
              <div>
                <p className="font-semibold">Margaret Johnson</p>
                <p className="text-sm text-gray-500">Host since 2005</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={onApply}
                className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Contact Host
              </button>
              <button className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Applied
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Side (Main content) */}
        <div className="col-span-2">
          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['Bedroom', 'Kitchen', 'Bathroom', 'Living', '+3 more'].map((tag, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-lg border ${
                  tag === '+3 more'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                } font-medium text-sm`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About this place</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Perfect for international students! This spacious private room features a comfortable bed,
              study desk, and plenty of natural light. Located in a quiet residential area close to key
              locations, universities, and public transport.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You’ll be sharing the property with friendly and professional hosts. The apartment is
              well-equipped, clean, and ready for move-in — with modern furniture, high-speed internet,
              and all kitchen essentials provided.
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> WiFi</div>
              <div className="flex items-center"><Car className="w-4 h-4 mr-2" /> Parking</div>
              <div className="flex items-center"><Users className="w-4 h-4 mr-2" /> Laundry</div>
              <div className="flex items-center"><Dog className="w-4 h-4 mr-2" /> Pet Friendly</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
