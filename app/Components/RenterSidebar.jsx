"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; 
import { useState } from 'react';
import Hab from '../../public/assets/hab.jpg';
import {
    LayoutDashboard, FileText, Heart, MessageSquare, Briefcase,
    CreditCard, User, Settings, HelpCircle, Menu, X, ChevronDown, ChevronRight,ClipboardList
} from 'lucide-react';

const mainMenuItems = [
    { id: 'dashboard', label: "Dashboard", icon: LayoutDashboard, route: "/renterdashboard" },
    { id: 'applications', label: "My Applications", icon: FileText, count: 5, route: "/rentermyapplication" },
    { id: 'favorites', label: "Favorites", icon: Heart, count: 7, route: "/renterfavorite" },
    { id: 'messages', label: "Messages", icon: MessageSquare, count: 3, alert: true, route: "/rentermessage" },
    { id: 'bookings', label: "My Bookings", icon: Briefcase, route: "/rentermybooking" },
    { id: 'payments', label: "Payments", icon: CreditCard, route: "/renterpayment" },
      { id: "disputes", label: "Disputes", icon: ClipboardList, route: "/renterdispute"}
      
];

const quickFilters = [
    { label: "Near You", route: "/renternearyou" },
    { label: "Under €800", route: "/renterunder" },
    { label: "Pet Friendly", route: "/renterpetfriendly" },
];

const accountItems = [
    { id: "Profile", label: "Profile", icon: User, route: "/renterprofile" },
    { label: "Settings", icon: Settings, route: "/rentersetting" },
    { label: "Help & Support", icon: HelpCircle, route: "/renterhelp" },
];

// --- Sidebar Item ---
const SidebarItem = ({ icon: Icon, label, count, href, alert, isFilter = false, onItemClick }) => {
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
        onItemClick?.();
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

export default function RenterSidebar() {
    const [openMobile, setOpenMobile] = useState(false);

    return (
        <>
            {/* ✅ Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-2 left-5 z-50 bg-white p-2 rounded-lg shadow" 
                onClick={() => setOpenMobile(true)}
            >
                <Menu className="h-6 w-6 text-gray-800" />
            </button>

            {/* ✅ Overlay */}
            {openMobile && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpenMobile(false)}
                ></div>
            )}

            {/* ✅ Sidebar (desktop & mobile slide) */}
            <aside
                className={`
                    bg-white border-r border-gray-100 pt-0 px-6 flex flex-col flex-shrink-0 h-screen
                    overflow-y-auto z-50 fixed md:static top-0 left-0
                    w-64 transition-transform duration-300
                    ${openMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* ✅ Close Button (Mobile Only) */}
                <button
                    className="md:hidden absolute top-4 right-4 z-50 bg-white p-1.5 rounded-full shadow"
                    onClick={() => setOpenMobile(false)}
                >
                    <X className="h-5 w-5 text-gray-700" />
                </button>

                {/* ✅ Logo */}
                <div className="mb-8 flex items-center mt-0 transform -translate-y-6">
                    <Image
                        src={Hab}
                        alt="Habisolo Logo"
                        width={290}
                        height={50}
                        className="rounded-full object-none h-[95px]"
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
                                onItemClick={() => setOpenMobile(false)}
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
                                onItemClick={() => setOpenMobile(false)}
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
                                onItemClick={() => setOpenMobile(false)}
                            />
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}