// "use client";

// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//     LayoutDashboard, FileText, Heart, MessageSquare, Briefcase,
//     MapPin, DollarSign, PawPrint, User, Settings, HelpCircle,
//     CreditCard // Added CreditCard for Payments
// } from 'lucide-react';

// // --- SIDEBAR DATA STRUCTURE ---
// const mainMenuItems = [
//     { id: 'dashboard', label: "Dashboard", icon: LayoutDashboard, route: "/renterdashboard" },
//     { id: 'applications', label: "My Applications", icon: FileText, count: 5, route: "/rentermyapplication" },
//     { id: 'favorites', label: "Favorites", icon: Heart, count: 7, route: "/renterfavorite" },
//     { id: 'messages', label: "Messages", icon: MessageSquare, count: 3, alert: true, route: "/rentermessage" },
//     { id: 'bookings', label: "My Bookings", icon: Briefcase, route: "/rentermybooking" },
//     { id: 'payments', label: "Payments", icon: CreditCard, route: "/renterpayment" },
// ];

// const quickFilters = [
//     { label: "Near You", route: "/renterlistings?filter=nearyou" },
//     { label: "Under $800", route: "/renterlistings?filter=under800" },
//     { label: "Pet Friendly", route: "/renterlistings?filter=petfriendly" },
// ];

// const accountItems = [
//     { label: "Profile", icon: User, route: "/renterprofile" },
//     { label: "Settings", icon: Settings, route: "/rentersettings" },
//     { label: "Help & Support", icon: HelpCircle, route: "/renterhelp" },
// ];


// // --- SIDEBAR ITEM COMPONENT ---

// const SidebarItem = ({ icon: Icon, label, count, href, alert, isLink, isFilter = false }) => {
//     const router = useRouter();
//     const pathname = usePathname();
    
//     // Check if the current route matches the item's route
//     // Note: For filters, we'll check the base path only for simplicity.
//     const isActive = isFilter ? 
//         (pathname === href.split('?')[0]) : 
//         (pathname === href);

//     // Styling based on the provided image (Orange/Amber)
//     const baseClasses = "flex items-center p-3 rounded-lg transition-colors cursor-pointer";
//     const activeClasses = "bg-orange-50 text-orange-700 font-semibold";
//     const inactiveClasses = "text-gray-600 hover:bg-gray-100";

//     const handleClick = (e) => {
//         e.preventDefault();
//         router.push(href);
//     };

//     const linkContent = (
//         <div className="flex items-center flex-1">
//             {Icon && <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />}
//             <span className="flex-1 text-sm">{label}</span>
//         </div>
//     );
    
//     // For non-icon items (like Quick Filters)
//     const filterContent = (
//         <span className="text-sm flex-1">{label}</span>
//     );

//     return (
//         <Link href={href} passHref legacyBehavior>
//             <div 
//                 className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
//                 onClick={handleClick}
//             >
//                 {isFilter ? filterContent : linkContent}
                
//                 {count && (
//                     <span className={`${isActive ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'} text-xs font-semibold px-2 py-0.5 rounded-full`}>
//                         {count}
//                     </span>
//                 )}
//                 {alert && (
//                      <span className="w-2 h-2 bg-red-500 rounded-full ml-1" />
//                 )}
//             </div>
//         </Link>
//     );
// };


// // --- MAIN SIDEBAR COMPONENT ---

// const Sidebar = () => {
//     const pathname = usePathname();
    
//     return (
//         <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
            
//             {/* Logo/Header area (assuming it's a simple text logo) */}
//             <div className="mb-8">
//                 {/* Replace with your actual logo component or design */}
//                 <h2 className="text-xl font-bold text-gray-900">HAB<span className='text-orange-500'>ISOLO</span></h2>
//             </div>
            
//             {/* Main Menu */}
//             <div className="mb-6">
//                 <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">MAIN MENU</h3>
//                 <nav className="space-y-1">
//                     {mainMenuItems.map(item => (
//                         <SidebarItem 
//                             key={item.id} 
//                             icon={item.icon} 
//                             label={item.label} 
//                             count={item.count} 
//                             href={item.route}
//                             alert={item.alert}
//                         />
//                     ))}
//                 </nav>
//             </div>

//             {/* Quick Filters */}
//             <div className="mb-6">
//                 <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">QUICK FILTERS</h3>
//                 <nav className="space-y-1">
//                     {quickFilters.map((filter, index) => (
//                         <SidebarItem 
//                             key={index} 
//                             label={filter.label} 
//                             href={filter.route}
//                             isFilter={true} // Style filters slightly differently if needed
//                         />
//                     ))}
//                 </nav>
//             </div>

//             {/* Account */}
//             <div className="mb-6">
//                 <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">ACCOUNT</h3>
//                 <nav className="space-y-1">
//                     {accountItems.map(item => (
//                         <SidebarItem 
//                             key={item.label} 
//                             icon={item.icon} 
//                             label={item.label} 
//                             href={item.route}
//                         />
//                     ))}
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;


"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; 
import Hab from '../../public/assets/hab.jpg'; // ✅ adjust path if needed
import {
    LayoutDashboard, FileText, Heart, MessageSquare, Briefcase,
    CreditCard, User, Settings, HelpCircle
} from 'lucide-react';

const mainMenuItems = [
    { id: 'dashboard', label: "Dashboard", icon: LayoutDashboard, route: "/renterdashboard" },
    { id: 'applications', label: "My Applications", icon: FileText, count: 5, route: "/rentermyapplication" },
    { id: 'favorites', label: "Favorites", icon: Heart, count: 7, route: "/renterfavorite" },
    { id: 'messages', label: "Messages", icon: MessageSquare, count: 3, alert: true, route: "/rentermessage" },
    { id: 'bookings', label: "My Bookings", icon: Briefcase, route: "/rentermybooking" },
    { id: 'payments', label: "Payments", icon: CreditCard, route: "/renterpayment" },
];

const quickFilters = [
    { label: "Near You", route: "/renternearyou" },
    { label: "Under $800", route: "/renterunder" },
    { label: "Pet Friendly", route: "/renterpetfriendly" },
];

const accountItems = [
    {  id: "Profile",label: "Profile", icon: User, route: "/renterprofile" },
    { label: "Settings", icon: Settings, route: "/rentersetting" },
    { label: "Help & Support", icon: HelpCircle, route: "/renterhelp" },
];

// --- Sidebar Item ---
const SidebarItem = ({ icon: Icon, label, count, href, alert, isFilter = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const isActive = isFilter
        ? (pathname === href.split('?')[0])
        : (pathname === href);

    const baseClasses = "flex items-center p-3 rounded-lg transition-colors cursor-pointer";
    const activeClasses = "bg-orange-50 text-orange-700 font-semibold";
    const inactiveClasses = "text-gray-600 hover:bg-gray-100";

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <Link href={href} passHref legacyBehavior>
            <div 
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                onClick={handleClick}
            >
                {Icon && <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />}
                <span className="flex-1 text-sm">{label}</span>

                {count && (
                    <span className={`${isActive ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'} text-xs font-semibold px-2 py-0.5 rounded-full`}>
                        {count}
                    </span>
                )}
                {alert && <span className="w-2 h-2 bg-red-500 rounded-full ml-1" />}
            </div>
        </Link>
    );
};

// --- Main Sidebar ---
const Sidebar = () => {
    return (
        <div className="w-64 bg-white border-r border-gray-100 px-6 flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
            
            {/* ✅ Logo Section */}
            <div className="mb-5 flex items-center justify-center -mt-6">
                <Image
                    src={Hab}
                    alt="Habisolo Logo"
                    width={290}
                    height={50}
                    className="rounded-full object-none  h-[95px]"
                    priority
                />
            </div>

            {/* Main Menu */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">MAIN MENU</h3>
                <nav className="space-y-1">
                    {mainMenuItems.map(item => (
                        <SidebarItem 
                            key={item.id} 
                            icon={item.icon} 
                            label={item.label} 
                            count={item.count} 
                            href={item.route}
                            alert={item.alert}
                        />
                    ))}
                </nav>
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">QUICK FILTERS</h3>
                <nav className="space-y-1">
                    {quickFilters.map((filter, index) => (
                        <SidebarItem 
                            key={index} 
                            label={filter.label} 
                            href={filter.route}
                            isFilter={true}
                        />
                    ))}
                </nav>
            </div>

            {/* Account */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">ACCOUNT</h3>
                <nav className="space-y-1">
                    {accountItems.map(item => (
                        <SidebarItem 
                            key={item.label} 
                            icon={item.icon} 
                            label={item.label} 
                            href={item.route}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
