"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Send, ArrowRight } from 'lucide-react';

// --- Subcomponent: Call to Action Banner (Dark Green Section) ---
const CallToAction = () => (
  // Fixed: Changed -mt-20 to mt-16 to ensure separation from the section above it.
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20">
    <div className="bg-green-700 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
      
      {/* House Image (Blended into background on the left, matching image_78fd86.png) */}
      <div 
        className="absolute top-0 left-0 h-full w-1/2 hidden md:block" 
        style={{ 
          backgroundImage: "url('/images/house-cta-small.jpg')", // Placeholder for the house part of the uploaded image
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          filter: 'grayscale(100%) brightness(0.7)' // Gray and dimmed to blend with green
        }}
      >
        {/* Dark overlay to blend */}
        <div className="absolute inset-0 bg-green-900 opacity-60 mix-blend-multiply rounded-3xl"></div>
      </div>

      {/* Decorative Gradient Circles (Matching image_78fd86.png aesthetics) */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full opacity-30 transform translate-x-1/2 -translate-y-1/4 z-0" />
      <div className="absolute bottom-0 left-1/3 w-16 h-16 bg-orange-200 rounded-full opacity-30 transform -translate-x-1/2 translate-y-1/4 z-0" />


      {/* Text Content - pushed right due to the absolute house image */}
      <div className="text-center lg:text-left py-4 lg:py-0 pl-0 md:pl-60 flex-1 z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          Ready to open your doors or find your next home?
        </h2>
        <p className="mt-2 text-white opacity-90 text-lg">
          Join Nestoria today and be part of the change.
        </p>
      </div>

      {/* Button */}
      <div className="mt-6 lg:mt-0 flex-shrink-0 z-10">
        <Link href="/get-started">
          <button className="bg-white text-green-700 py-3 px-6 rounded-lg font-bold shadow-xl hover:bg-gray-100 transition duration-300 flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

// --- Main Footer Content ---
const MainFooter = () => {
    // Custom light purple/lavender background color derived from image_78fd86.png
    const footerBgColor = 'bg-gray-50'; 
    const textColor = 'text-gray-700';
    const linkHoverColor = 'text-green-600';

    return (
        // Fixed: Reduced padding from pt-40 to pt-32 to close the gap after adjusting the CTA margin
        <div className={`pt-32 pb-12 ${footerBgColor}`}> 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-12 border-b border-gray-300/50 pb-12">
                
                {/* Column 1: Contact Info and Logo */}
                <div className="col-span-2 lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        {/* Logo (Placeholder matching the image design) */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent">
                            {/* SVG of house logo or similar to represent Nestoria */}
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l-2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-800">Nestoria</span>
                    </div>
                    
                    <address className={`not-italic text-sm ${textColor} space-y-3`}>
                        <p className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-600" />
                            Malaga, Spain
                        </p>
                        <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
                            602 56 27 12
                        </p>
                        <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
                            hello@nestoria.online
                        </p>
                    </address>
                </div>
                
                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
                    <nav className={`text-sm ${textColor} space-y-3`}>
                        <Link href="/" className={`block hover:${linkHoverColor} transition`}>Home</Link>
                        <Link href="/about" className={`block hover:${linkHoverColor} transition`}>About</Link>
                        <Link href="/listings" className={`block hover:${linkHoverColor} transition`}>Listings</Link>
                        <Link href="/services" className={`block hover:${linkHoverColor} transition`}>Services</Link>
                        <Link href="/blogs" className={`block hover:${linkHoverColor} transition`}>Blogs</Link>
                        <Link href="/testimonials" className={`block hover:${linkHoverColor} transition`}>Testimonials</Link>
                    </nav>
                </div>
                
                {/* Column 3: Discovery (Locations) */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Discovery</h4>
                    <nav className={`text-sm ${textColor} space-y-3`}>
                        <Link href="/locations/canada" className={`block hover:${linkHoverColor} transition`}>Canada</Link>
                        <Link href="/locations/usa" className={`block hover:${linkHoverColor} transition`}>United States</Link>
                        <Link href="/locations/germany" className={`block hover:${linkHoverColor} transition`}>Germany</Link>
                        <Link href="/locations/africa" className={`block hover:${linkHoverColor} transition`}>Africa</Link>
                        <Link href="/locations/spain" className={`block hover:${linkHoverColor} transition`}>Spain</Link>
                    </nav>
                </div>
                
                {/* Column 4: Newsletter and Social */}
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                    <h4 className="font-semibold text-gray-800 mb-4">Subscribe to our Newsletter!</h4>
                    
                    {/* Newsletter Input */}
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="p-3 border border-gray-300 rounded-l-lg focus:ring-green-600 focus:border-green-600 w-full"
                        />
                        <button 
                            className="bg-green-600 p-3 rounded-r-lg text-white hover:bg-green-700 transition duration-300"
                            aria-label="Subscribe"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mt-6 mb-4">Follow Us on</h4>
                    
                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <a href="https://linkedin.com" aria-label="LinkedIn" className={`${textColor} hover:${linkHoverColor} transition`}>
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" aria-label="Facebook" className={`${textColor} hover:${linkHoverColor} transition`}>
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" className={`${textColor} hover:${linkHoverColor} transition`}>
                            <Instagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                </div>
            
                {/* Copyright Section */}
                <div className="pt-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Nestoria. All rights reserved. | Built with ❤️ for community.</p>
                </div>
            </div>
        </div>
    );
}


// Main exported component combines CTA and Main Footer
const Footer = () => {
  return (
    <footer>
      <CallToAction />
      <MainFooter />
    </footer>
  );
};

export default Footer;
