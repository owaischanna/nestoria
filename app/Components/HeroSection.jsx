// "use client";

// import { useState } from "react";
// import Link from "next/link";
// // Importing Menu and X for the responsive NavBar
// import { Search, MapPin, ChevronDown, Menu, X } from "lucide-react"; 
// // Relying on your external AuthModal file as intended
// import AuthModal from "./AuthModal"; 
// import LanguageSwitcher from "./LanguageSwitcher";
// import Image from "next/image"; 
// import Hab from '../../public/assets/hab.jpg';

// // --- Data for Select Options (Used in SearchFilter) ---
// const cityOptions = [
//   "Select Your City",
//   "Sevilla",
//   "Madrid",
//   "Granada",
//   "Madrid",
// ];
// const propertyTypeOptions = [
//   "Choose Property Type",
//   "Apartment",
//   "House",
//   "Condo",
//   "Townhouse",
// ];
// const priceRangeOptions = [
//   "Choose Price Range",
//   "1000 - €2000",
//   "€2000 - €3000",
//   "€3000 - €5000",
//   "Above €5000",
// ];


// // --- Brand logo (Original) ---
// // --- Brand logo ---
// const BrandLogo = () => (
//   <div className="flex items-center space-x-2 h-[45px] -mt-8">
//     <div className="flex-shrink-0 flex items-center">
//       <Image
//         src={Hab}
//         alt="Habisolo Logo"
//         width={260}    // Increase freely
//         height={50}    // Increase freely
//         className="rounded-full object-none  h-[95px]" // Lock height
//         priority
//       />
//     </div>

//   </div>
// );


// // --- NavBar Component (Responsive - Unchanged from last step) ---
// const NavBar = ({ onOpenAuth }) => {
//   const [activeLink, setActiveLink] = useState("home");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//     setIsMenuOpen(false);
//   };
  
//   const handleAuthClick = () => {
//     onOpenAuth();
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//    <div className="flex items-center justify-between px-8 py-3 md:py-4">

//         {/* Left: Brand Logo */}
//         <div className="flex-shrink-0">
//           <BrandLogo />
//         </div>

//         {/* Right: Navigation and Mobile Menu Button */}
//         <div className="flex items-center space-x-6">
          
//           {/* Desktop Navigation Links (Original content - hidden on small screens) */}
//           <div className="hidden md:flex items-center space-x-4">
//             <LanguageSwitcher/>
//             <Link 
//               href="#top" 
//               className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
//                 activeLink === "home" 
//                   ? "bg-green-600 text-white" 
//                   : "text-gray-600 hover:bg-green-50"
//               }`}
//               onClick={() => setActiveLink("home")}
//             >
//               Home
//             </Link>
//             <Link 
//               href="#about" 
//               className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
//                 activeLink === "about" 
//                   ? "bg-green-600 text-white" 
//                   : "text-gray-600 hover:bg-green-50"
//               }`}
//               onClick={() => setActiveLink("about")}
//             >
//               About Us 
//             </Link>
//             <Link 
//               href="#how-it-works" 
//               className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
//                 activeLink === "how-it-works" 
//                   ? "bg-green-600 text-white" 
//                   : "text-gray-600 hover:bg-green-50"
//               }`}
//               onClick={() => setActiveLink("how-it-works")}
//             >
//               How it works
//             </Link>
//             <Link 
//               href="#testimonials" 
//               className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
//                 activeLink === "testimonials" 
//                   ? "bg-green-600 text-white" 
//                   : "text-gray-600 hover:bg-green-50"
//               }`}
//               onClick={() => setActiveLink("testimonials")}
//             >
//               Testimonials
//             </Link>
//             <Link 
//               href="#faq" 
//               className={`px-4 py-2 rounded-lg transition duration-150 font-medium ${
//                 activeLink === "faq" 
//                   ? "bg-green-600 text-white" 
//                   : "text-gray-600 hover:bg-green-50"
//               }`}
//               onClick={() => setActiveLink("faq")}
//             >
//               FAQ
//             </Link>
            
//              {/* Desktop Get Started Button */}
//             <button
//               onClick={onOpenAuth}
//               className="flex items-center space-x-2 py-2 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition duration-150 font-medium"
//             >
//               <span>Get Started</span>
//               <span className="text-xl">→</span>
              
//             </button>
//           </div>
          
//           {/* Mobile Menu Button - Appears only on small screens */}
//           <button 
//             className="md:hidden p-2 text-gray-600" 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>
      
//       {/* Mobile Menu Dropdown */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200 py-2 pb-4">
//           {/* Navigation Links */}
//           <Link href="#top" className={`block px-8 py-2 text-gray-700 hover:bg-green-50 ${activeLink === "home" ? "font-bold text-green-600" : ""}`} onClick={() => handleLinkClick("home")}>Home</Link>
//           <Link href="#about" className={`block px-8 py-2 text-gray-700 hover:bg-green-50 ${activeLink === "about" ? "font-bold text-green-600" : ""}`} onClick={() => handleLinkClick("about")}>About Us </Link>
//           <Link href="#how-it-works" className={`block px-8 py-2 text-gray-700 hover:bg-green-50 ${activeLink === "how-it-works" ? "font-bold text-green-600" : ""}`} onClick={() => handleLinkClick("how-it-works")}>How it works</Link>
//           <Link href="#testimonials" className={`block px-8 py-2 text-gray-700 hover:bg-green-50 ${activeLink === "testimonials" ? "font-bold text-green-600" : ""}`} onClick={() => handleLinkClick("testimonials")}>Testimonials</Link>
//           <Link href="#faq" className={`block px-8 py-2 text-gray-700 hover:bg-green-50 ${activeLink === "faq" ? "font-bold text-green-600" : ""}`} onClick={() => handleLinkClick("faq")}>FAQ</Link>

//           {/* Get Started button for mobile */}
//           <div className="px-8 mt-2">
//             <button
//               onClick={handleAuthClick}
//               className="w-full text-center py-2 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition duration-150 font-medium"
//             >
//               Get Started →
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };


// // --- Search Filter Component (MODIFIED FOR RESPONSIVENESS) ---
// const SearchFilter = () => (
//   // Removed mr-8 on mobile, kept it for large screens (lg:mr-8)
//   <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full lg:mr-8">
    
//     {/* RENT LIST buttons on same line */}
//     <div className="flex space-x-6 mb-4 sm:mb-6">
//       <button className="text-gray-900 font-bold text-lg">RENT</button>
//       <button className="text-gray-500 font-bold text-lg">LIST</button>
//     </div>

//     {/* Four columns layout wraps on smaller screens */}
//     {/* Added sm:flex-col to stack fields vertically on mobile */}
//     <div className="flex flex-col sm:flex-row items-end gap-3 sm:gap-4">
      
//       {/* Location Column */}
//       <div className="w-full sm:flex-1">
//         <label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-2">Location</label>
//         <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
//           <select className="w-full bg-white text-gray-600 outline-none text-sm">
//             {cityOptions.map((option, index) => (
//               <option key={option} value={option} disabled={index === 0} hidden={index === 0}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Apartment Type Column */}
//       <div className="w-full sm:flex-1">
//         <label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-2">Apartment Type</label>
//         <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
//           <select className="w-full bg-white text-gray-600 outline-none text-sm">
//             {propertyTypeOptions.map((option, index) => (
//               <option key={option} value={option} disabled={index === 0} hidden={index === 0}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Price Range Column */}
//       <div className="w-full sm:flex-1">
//         <label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-2">Price Range</label>
//         <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
//           <select className="w-full bg-white text-gray-600 outline-none text-sm">
//             {priceRangeOptions.map((option, index) => (
//               <option key={option} value={option} disabled={index === 0} hidden={index === 0}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Search Button - Now full width on mobile, fixed height on desktop */}
//       <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition duration-150 h-[42px] sm:h-[52px] flex items-center justify-center flex-shrink-0">
//         <Search className="w-5 h-5" />
//         <span className="ml-2 sm:hidden">Search</span> {/* Add text label on mobile */}
//       </button>
//     </div>
//   </div>
// );


// // --- Stats Section (MODIFIED FOR RESPONSIVENESS) ---
// const StatsSection = () => (
//   // Added flex-col to stack stats vertically on small screens
//   // Added space-y-4 for vertical gap on mobile, restored space-x-12 on medium screens
//   <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-12 relative z-20 pt-4 px-4">
//     <div className="bg-white px-6 py-4 rounded-3xl shadow-xl flex items-center space-x-3 max-w-full sm:max-w-xs">
//       <div className="flex -space-x-2">
//         <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=30&q=80" alt="User 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=30&q=80" alt="User 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//         <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=30&q=80" alt="User 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
//         <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">+</div>
//       </div>
//       <p className="text-base font-bold text-gray-800">72k+ Happy Customers</p>
//     </div>

//     {/* The second stat is hidden on mobile screens by default (hidden sm:flex) */}
//     <div className="hidden sm:flex bg-white px-6 py-4 rounded-3xl shadow-xl items-center space-x-3 max-w-xs">
//       <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//         <span className="text-green-600 text-xl font-bold">200+</span>
//       </div>
//       <p className="text-base font-bold text-gray-800">200+ New Listings Everyday!</p>
//     </div>
//   </div>
// );


// // --- Hero Section (Slightly adjusted for mobile stacking) ---
// const HeroSection = () => {
//   const [isAuthOpen, setIsAuthOpen] = useState(false);

//   return (
//     <div id="top" className="min-h-screen bg-yellow-50 overflow-hidden relative">
//       <NavBar onOpenAuth={() => setIsAuthOpen(true)} />
//       <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

//         {/* <div className="absolute top-6 right-8 z-50">
//           <LanguageSwitcher /> 
//       </div> */}

//       {/* 1. The Large Light Green/White Curved Background */}
//       <div
//         className="absolute bottom-0 left-0 right-0 h-3/4 z-0"
//         style={{
//           background: 'radial-gradient(ellipse at 50% 100%, rgba(200, 255, 200, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
//           transform: 'translateY(50%)', 
//           opacity: 0.9,
//         }}
//       />
//       {/* Top Left/Right Gradient for a warmer tone, blending with the curve */}
//       <div
//         className="absolute top-0 left-0 w-full h-full z-0"
//         style={{
//           background: 'radial-gradient(circle at 10% 0, rgba(255, 240, 200, 0.3) 0%, transparent 40%)',
//         }}
//       />
      
//       {/* Main Content Container: Added pt-20 and pb-20 to ensure content isn't under the navbar/stats on mobile */}
//       <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between h-full lg:h-screen pt-28 pb-20 lg:pt-28 lg:pb-40 px-8 z-10">
        
//         {/* Left Content (Text and Search Bar) - Added text-center on mobile */}
//         <div className="lg:w-1/2 p-0 lg:p-4 text-center lg:text-left relative z-20 order-2 lg:order-1">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
//             Find a perfect home you love..!
//           </h1>
//           <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
//             One Roof, Many Generations, Endless Connections...
//           </p>

//           {/* Search Filter Component Placement */}
//           <div className="mt-10 sm:mt-16 w-full flex justify-center lg:justify-start">
//             <SearchFilter />
//           </div>
//         </div>

//         {/* Right Content (House Image) - Changed order to display image first on mobile */}
//         <div className="lg:w-1/2 mt-10 lg:mt-0 relative z-10 flex justify-center lg:justify-end order-1 lg:order-2">
//           <div className="relative w-full max-w-xl h-72 sm:h-96 lg:h-[550px] overflow-hidden">
//             {/* House Image */}
//             <img
//               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
//               alt="Modern gray and white house with a two-car garage at twilight"
//               className="w-full h-full object-cover rounded-xl shadow-2xl"
//               style={{ objectPosition: 'center 70%' }}
//             />
//             {/* The subtle, floating gradient orbs/circles */}
//             <div className="absolute top-8 right-12 w-6 h-6 bg-green-300 rounded-full opacity-70 mix-blend-multiply filter blur-sm" />
//             <div className="absolute top-1/4 right-0 w-8 h-8 bg-yellow-300 rounded-full opacity-70 mix-blend-multiply filter blur-sm" />
//           </div>
//         </div>
//       </div>
      
//       {/* Stats Section (Placed after the main content, still has its absolute logic inside) */}
//       <StatsSection />
//     </div>
//   );
// };

// export default HeroSection;


"use client";

import { useState } from "react";
import Link from "next/link";
// Importing Menu and X for the responsive NavBar
import { Search, MapPin, ChevronDown, Menu, X } from "lucide-react"; 
// Relying on your external AuthModal file as intended
import AuthModal from "./AuthModal"; 
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image"; 
import Hab from '../../public/assets/hab.jpg';

// --- Data for Select Options (Used in SearchFilter) ---
const cityOptions = [
  "Select Your City",
  "Sevilla",
  "Madrid",
  "Granada",
  "Madrid", // Note: Madrid is duplicated, you may want to remove one
];
const propertyTypeOptions = [
  "Choose Property Type",
  "Apartment",
  "House",
  "Condo",
  "Townhouse",
];
const priceRangeOptions = [
  "Choose Price Range",
  "1000 - €2000",
  "€2000 - €3000",
  "€3000 - €5000",
  "Above €5000",
];


// --- Brand logo ---
const BrandLogo = () => (
  <div className="flex items-center space-x-2 h-[45px] -mt-8">
    <div className="flex-shrink-0 flex items-center">
      <Image
        src={Hab}
        alt="Habisolo Logo"
        width={260}    // Increase freely
        height={50}    // Increase freely
        className="rounded-full object-none  h-[95px]" // Lock height
        priority
      />
    </div>
  </div>
);


// --- NavBar Component ---
const NavBar = ({ onOpenAuth }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };
  
  const handleAuthClick = () => {
    onOpenAuth();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#top", label: "Home", key: "home" },
    { href: "#about", label: "About Us", key: "about" },
    { href: "#how-it-works", label: "How it works", key: "how-it-works" },
    { href: "#testimonials", label: "Testimonials", key: "testimonials" },
    { href: "#faq", label: "FAQ", key: "faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 z-50">
      <div className="flex items-center justify-between px-8 py-3 md:py-4">

        {/* Left: Brand Logo - No background */}
        <div className="flex-shrink-0 bg-transparent">
          <BrandLogo />
        </div>

        {/* Right: Navigation and Mobile Menu Button */}
        <div className="flex items-center space-x-6">
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher/>
            
            {navLinks.map((link) => (
              <Link 
                key={link.key}
                href={link.href} 
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium relative group ${
                  activeLink === link.key 
                    ? "bg-green-600 text-white shadow-sm" 
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`}
                onClick={() => setActiveLink(link.key)}
              >
                {link.label}
                {/* Animated underline effect */}
                <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-green-500 transition-all duration-300 ${
                  activeLink === link.key ? "scale-100" : "scale-0 group-hover:scale-100"
                }`} />
              </Link>
            ))}
            
            {/* Desktop Get Started Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 hover:to-emerald-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown - No logo background */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-lg border-b border-gray-200 shadow-2xl animate-in slide-in-from-top duration-300">
          
          {/* Mobile Menu Header with Close Button - No logo */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50/30">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-400 rounded-full"></div>
              <span className="font-semibold text-gray-800">Menu</span>
            </div>
            <button 
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 border border-gray-200"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Language Switcher for Mobile */}
          <div className="px-8 py-4 border-b border-gray-100">
            <LanguageSwitcher />
          </div>

          {/* Navigation Links with Beautiful Icons */}
          <div className="px-6 py-4">
            {navLinks.map((link, index) => (
              <Link 
                key={link.key}
                href={link.href} 
                className={`flex items-center py-4 px-4 rounded-2xl transition-all duration-300 group mx-2 mb-1 ${
                  activeLink === link.key 
                    ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg transform scale-105" 
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600 hover:shadow-md"
                }`}
                onClick={() => handleLinkClick(link.key)}
              >
                {/* Animated Icon/Dot */}
                <div className={`w-2 h-2 rounded-full mr-4 transition-all duration-300 ${
                  activeLink === link.key 
                    ? "bg-white scale-125" 
                    : "bg-green-400 group-hover:bg-green-500 group-hover:scale-110"
                }`} />
                
                <span className={`font-medium text-base flex-1 transition-all duration-300 ${
                  activeLink === link.key ? "font-semibold" : ""
                }`}>
                  {link.label}
                </span>
                
                {/* Animated Arrow */}
                <div className={`transition-all duration-300 ${
                  activeLink === link.key ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  <span className="text-lg">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Get Started Section - Beautiful CTA */}
          <div className="px-8 py-6 bg-gradient-to-br from-green-50 via-white to-emerald-50/50 border-t border-gray-100 mt-4">
          
            
            <button
              onClick={handleAuthClick}
              className="w-full flex items-center justify-center py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl hover:from-green-700 hover:to-emerald-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group mb-3"
            >
              <span className="text-base">Get Started Now</span>
              <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            
       
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};


// --- Search Filter Component ---
const SearchFilter = () => (
  // Removed mr-8 on mobile, kept it for large screens (lg:mr-8)
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full lg:mr-8">
    
    {/* RENT LIST buttons on same line */}
    <div className="flex space-x-6 mb-4 sm:mb-6">
      <button className="text-gray-900 font-bold text-lg">RENT</button>
      <button className="text-gray-500 font-bold text-lg">LIST</button>
    </div>

    {/* Four columns layout wraps on smaller screens */}
    <div className="flex flex-col sm:flex-row items-end gap-3 sm:gap-4">
      
      {/* Location Column */}
      <div className="w-full sm:flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-2">Location</label>
        <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
          <select className="w-full bg-white text-gray-600 outline-none text-sm">
            {cityOptions.map((option, index) => (
              <option key={option + index} value={option} disabled={index === 0} hidden={index === 0}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Apartment Type Column */}
      <div className="w-full sm:flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-2">Apartment Type</label>
        <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
          <select className="w-full bg-white text-gray-600 outline-none text-sm">
            {propertyTypeOptions.map((option, index) => (
              <option key={option} value={option} disabled={index === 0} hidden={index === 0}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Column */}
      <div className="w-full sm:flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-2">Price Range</label>
        <div className="border border-gray-300 rounded-lg p-2 sm:p-3">
          <select className="w-full bg-white text-gray-600 outline-none text-sm">
            {priceRangeOptions.map((option, index) => (
              <option key={option} value={option} disabled={index === 0} hidden={index === 0}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button - Now full width on mobile, fixed height on desktop */}
      <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition duration-150 h-[42px] sm:h-[52px] flex items-center justify-center flex-shrink-0">
        <Search className="w-5 h-5" />
        <span className="ml-2 sm:hidden">Search</span> {/* Add text label on mobile */}
      </button>
    </div>
  </div>
);


// --- Stats Section ---
const StatsSection = () => (
  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-12 relative z-20 pt-4 px-4">
    <div className="bg-white px-6 py-4 rounded-3xl shadow-xl flex items-center space-x-3 max-w-full sm:max-w-xs">
      <div className="flex -space-x-2">
        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=30&q=80" alt="User 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=30&q=80" alt="User 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=30&q=80" alt="User 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">+</div>
      </div>
      <p className="text-base font-bold text-gray-800">72k+ Happy Customers</p>
    </div>

    <div className="hidden sm:flex bg-white px-6 py-4 rounded-3xl shadow-xl items-center space-x-3 max-w-xs">
      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
        <span className="text-green-600 text-xl font-bold">200+</span>
      </div>
      <p className="text-base font-bold text-gray-800">200+ New Listings Everyday!</p>
    </div>
  </div>
);


// --- Hero Section ---
const HeroSection = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-yellow-50 overflow-hidden relative">
      <NavBar onOpenAuth={() => setIsAuthOpen(true)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* 1. The Large Light Green/White Curved Background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-3/4 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(200, 255, 200, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
          transform: 'translateY(50%)', 
          opacity: 0.9,
        }}
      />
      {/* Top Left/Right Gradient for a warmer tone, blending with the curve */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: 'radial-gradient(circle at 10% 0, rgba(255, 240, 200, 0.3) 0%, transparent 40%)',
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between h-full lg:h-screen pt-28 pb-20 lg:pt-28 lg:pb-40 px-8 z-10">
        
        {/* Left Content (Text and Search Bar) */}
        <div className="lg:w-1/2 p-0 lg:p-4 text-center lg:text-left relative z-20 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Find a perfect home you love..!
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
            One Roof, Many Generations, Endless Connections...
          </p>
          {/* Search Filter Component Placement */}
          <div className="mt-10 sm:mt-16 w-full flex justify-center lg:justify-start">
            <SearchFilter />
          </div>
        </div>

        {/* Right Content (House Image) */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 relative z-10 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-full max-w-xl h-72 sm:h-96 lg:h-[550px] overflow-hidden">
            {/* House Image */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Modern gray and white house with a two-car garage at twilight"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
              style={{ objectPosition: 'center 70%' }}
            />
            {/* The subtle, floating gradient orbs/circles */}
            <div className="absolute top-8 right-12 w-6 h-6 bg-green-300 rounded-full opacity-70 mix-blend-multiply filter blur-sm" />
            <div className="absolute top-1/4 right-0 w-8 h-8 bg-yellow-300 rounded-full opacity-70 mix-blend-multiply filter blur-sm" />
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <StatsSection />
    </div>
  );
};

export default HeroSection;