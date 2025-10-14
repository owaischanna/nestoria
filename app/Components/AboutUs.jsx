// components/AboutUsSection.jsx
"use client";

import React from 'react';

// Reusable component for the section header (e.g., "WHO ARE WE")
const SectionHeader = ({ title }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-green-700 tracking-wider">{title}</h2>
    <div className="w-16 h-1 bg-green-700 mt-1" />
  </div>
);

const AboutUsSection = () => {
  // --- UPDATED ONLINE IMAGE LINKS ---
  const images = {
    // New: Elderly woman and young person laughing together
    teamMeeting: "https://plus.unsplash.com/premium_photo-1661778490723-371305b4fb06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", 
    // New: Elderly person and young student using a laptop
    elderlyCouple: "https://plus.unsplash.com/premium_photo-1665203421659-09089ede4ffa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", 
    // New: Clean, simple bedroom for a student
    bedroom: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", 
    // New: Young person smiling in a home environment
    professional: "https://media.istockphoto.com/id/2184295789/photo/happy-businessman-shaking-hands-with-his-colleague-on-a-meeting-in-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=-6cc7ba7G4_cTqa3ZZ7bksVIISQX-2Y6U6-IQ4ObhIk=", 
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Absolute positioning for the soft green decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-24 h-24 bg-green-100 rounded-full opacity-40 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
          ABOUT US
        </h1>

        {/* --- 1. WHO ARE WE SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          
          {/* Left Text Content */}
          <div className="relative z-10">
            <SectionHeader title="WHO ARE WE" />
            <p className="mt-4 text-gray-700 leading-relaxed text-lg">
              **Nestoria** is the human-centered housing platform that connects **elderly homeowners** with **international students and young professionals** seeking affordable, meaningful accomodation in Spain. Together, we turn spare rooms into shared homes and build stronger communities.
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="py-2 px-6 border border-yellow-700 text-yellow-700 rounded-full hover:bg-yellow-50 transition duration-150 font-medium">
                Find a Room
              </button>
              <button className="py-2 px-6 border border-green-700 text-green-700 rounded-full hover:bg-green-50 transition duration-150 font-medium">
                List Your Space
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="p-2 bg-white rounded-3xl shadow-xl">
              <div 
                className="w-full h-80 bg-gray-200 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${images.teamMeeting}')` }} 
              />
            </div>
            {/* Soft green circle accent next to the image */}
            <div className="absolute bottom-[-20px] right-[-20px] w-12 h-12 bg-green-300 rounded-full opacity-60 mix-blend-multiply" />
          </div>
        </div>

        {/* --- 2. MISSION & VISION SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Image Collage */}
          <div className="flex flex-col space-y-4">
            {/* Top Image: Elderly couple */}
            <div className="p-2 bg-white rounded-3xl shadow-lg">
              <div 
                className="w-full h-48 bg-gray-200 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${images.elderlyCouple}')` }}
              />
            </div>

            {/* Bottom Row of Images */}
            <div className="flex space-x-4">
              {/* Bottom Left: Bedroom */}
              <div className="w-1/2 p-2 bg-white rounded-3xl shadow-lg">
                <div 
                  className="w-full h-48 bg-gray-200 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${images.bedroom}')` }}
                />
              </div>
              {/* Bottom Right: Young professional */}
              <div className="w-1/2 p-2 bg-white rounded-3xl shadow-lg">
                <div 
                  className="w-full h-48 bg-gray-200 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${images.professional}')` }}
                />
              </div>
            </div>
          </div>
          
          {/* Right Text Content */}
          <div>
            <SectionHeader title="MISSION & VISION" />
            
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                We exist to make housing affordable while reducing loneliness for seniors. Our mission is to connect generations through safe, affordable, and human-centered living.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                A future where every student/professional finds a home they can afford, every senior feels supported, and communities thrive through cultural exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;