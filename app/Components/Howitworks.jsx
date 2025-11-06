// components/HowItWorksSection.jsx
import React from 'react';
import { CheckSquare } from 'lucide-react'; // Using lucide-react for the checkmark icons

// --- 1. How It Works Process Flow Component ---
const ProcessStep = ({ title, description, color }) => {
  // Utility function to get the correct background and hover color class
  const bgColorClass = {
    green: 'bg-green-600 hover:bg-green-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    darkgreen: 'bg-green-800 hover:bg-green-900',
    gray: 'bg-gray-600 hover:bg-gray-700',
  }[color] || 'bg-gray-700 hover:bg-gray-800';

  return (
    <div className={`p-6 rounded-lg shadow-xl text-white h-40 flex flex-col justify-center transition duration-300 ${bgColorClass}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm font-light leading-relaxed">{description}</p>
    </div>
  );
};

const HowItWorksFlow = () => (
  <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
      HOW IT WORKS
    </h2>
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-4">
      
      {/* Step 1 */}
      <ProcessStep 
        title="Sign Up & Verify"
        description="Create your Habisolo account. Verify your ID for safety."
        color="green"
      />
      
      {/* Arrow */}
      <div className="hidden lg:block w-12 h-0.5 bg-gray-400 relative">
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rotate-45" />
      </div>
      
      {/* Step 2 */}
      <ProcessStep 
        title="List or Search"
        description="Elderly hosts list available rooms. Guests search by city, price, and preferences."
        color="orange"
      />

      {/* Arrow */}
      <div className="hidden lg:block w-12 h-0.5 bg-gray-400 relative">
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rotate-45" />
      </div>
      
      {/* Step 3 */}
      <ProcessStep 
        title="Book & Confirm"
        description="Guests request bookings. Hosts review, chat, and approve."
        color="darkgreen"
      />

      {/* Arrow */}
      <div className="hidden lg:block w-12 h-0.5 bg-gray-400 relative">
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rotate-45" />
      </div>
      
      {/* Step 4 */}
      <ProcessStep 
        title="Move In & Connect"
        description="Enjoy a safe stay, cultural exchange, and companionship."
        color="gray"
      />
    </div>
  </div>
);

// --- 2. Our Impacts Section Component ---
const ImpactCommitmentItem = ({ text }) => (
  <li className="flex items-start space-x-3 mb-3">
    <CheckSquare className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </li>
);

const OurImpactsSection = () => (
  <div className="max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative">
    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
      OUR IMPACTS
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Left Content: Impact Statistics & Problem/Solution */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Affordable Housing for Students, Income & Companionship for Seniors.
        </h3>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <span className="w-2.5 h-2.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
            <p className="text-gray-700">
              241,775 International Students in Spain (2022 - 2023), with numbers rising every year.
            </p>
          </li>
          <li className="flex items-start">
            <span className="w-2.5 h-2.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
            <p className="text-gray-700">
              Housing Crisis: Many renters spend 40-50% of income on rent.
            </p>
          </li>
          <li className="flex items-start">
            <span className="w-2.5 h-2.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
            <p className="text-gray-700">
              Seniors own over 80% of housing stock, with many living alone.
            </p>
          </li>
        </ul>

        <p className="text-lg text-gray-800 leading-relaxed mt-4">
          Habisolo solves both problems by connecting supply with demand affordably, safely, and with human value.
        </p>
      </div>

      {/* Right Content: Image & Impact Commitment */}
      <div className="flex flex-col space-y-10">
        
        {/* Image */}
        <div className="p-3 bg-white rounded-3xl shadow-xl w-full">
          <div 
            className="w-full h-80 bg-gray-200 rounded-2xl bg-cover bg-center"
            // Replaced placeholder with an online image of a modern living room
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U29mYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600')" }} 
          />
        </div>

        {/* Impact Commitment List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Impact Commitment
          </h3>
          <p className="font-semibold text-gray-800 mb-4">We commit to:</p>
          <ul className="space-y-4">
            <ImpactCommitmentItem text="Verified users and secure payments." />
            <ImpactCommitmentItem text="Accessibility-first design for elderly homeowners." />
            <ImpactCommitmentItem text="Transparent fees and insurance options." />
            <ImpactCommitmentItem text="Strong partnerships with universities and municipalities." />
            <ImpactCommitmentItem text="Reducing loneliness among seniors, one shared home at a time." />
          </ul>
        </div>
      </div>
    </div>
    
    {/* Decorative circle matching the design aesthetics */}
    <div className="absolute top-1/4 right-0 w-24 h-24 bg-green-200 rounded-full opacity-40 transform translate-x-1/2" />
  </div>
);


const HowItWorksSection = () => {
  return (
    <div className="bg-gray-50">
      <HowItWorksFlow />
      <OurImpactsSection />
    </div>
  );
};

export default HowItWorksSection;