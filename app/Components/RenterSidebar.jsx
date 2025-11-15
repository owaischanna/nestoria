"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Hab from '../../public/assets/hab.jpg';
import {
    LayoutDashboard, FileText, Heart, MessageSquare, Briefcase,
    CreditCard, User, Settings, HelpCircle, Menu, X, ClipboardList
} from 'lucide-react';

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

                {count > 0 && (
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
    const { user } = useAuth();
    const [openMobile, setOpenMobile] = useState(false);
    const [stats, setStats] = useState({
        favorites: 0,
        applications: 0,
        messages: 0
    });
    const [hasAlert, setHasAlert] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;

            try {
                console.log('📊 Fetching sidebar stats...');
                const response = await fetch('/api/sidebar/stats', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.success) {
                        setStats({
                            favorites: data.counts.favorites,
                            applications: data.counts.applications,
                            messages: data.counts.messages
                        });

                        setHasAlert(data.hasAlerts.messages);

                        console.log('✅ Stats loaded:', {
                            favorites: data.counts.favorites,
                            applications: data.counts.applications,
                            messages: data.counts.messages
                        });
                    }
                }
            } catch (error) {
                console.error('❌ Error fetching sidebar stats:', error);
            }
        };

        fetchStats();

        const interval = setInterval(fetchStats, 60000);

        return () => clearInterval(interval);
    }, [user]);

    const mainMenuItems = [
        { id: 'dashboard', label: "Dashboard", icon: LayoutDashboard, route: "/renterdashboard" },
        { id: 'applications', label: "My Applications", icon: FileText, count: stats.applications, route: "/rentermyapplication" },
        { id: 'favorites', label: "Favorites", icon: Heart, count: stats.favorites, route: "/renterfavorite" },
        { id: 'messages', label: "Messages", icon: MessageSquare, count: stats.messages, alert: hasAlert, route: "/rentermessage" },
        { id: 'bookings', label: "My Bookings", icon: Briefcase, route: "/rentermybooking" },
        { id: 'payments', label: "Payments", icon: CreditCard, route: "/renterpayment" },
        { id: "disputes", label: "Disputes", icon: ClipboardList, route: "/renterdispute" }
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

    return (
        <>
            <button
                className="md:hidden fixed top-2 left-5 z-50 bg-white p-2 rounded-lg shadow"
                onClick={() => setOpenMobile(true)}
            >
                <Menu className="h-6 w-6 text-gray-800" />
            </button>

            {openMobile && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpenMobile(false)}
                ></div>
            )}

            <aside
                className={`
                    bg-white border-r border-gray-100 pt-0 px-6 flex flex-col flex-shrink-0 h-screen
                    overflow-y-auto z-50 fixed md:static top-0 left-0
                    w-64 transition-transform duration-300
                    ${openMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                <button
                    className="md:hidden absolute top-4 right-4 z-50 bg-white p-1.5 rounded-full shadow"
                    onClick={() => setOpenMobile(false)}
                >
                    <X className="h-5 w-5 text-gray-700" />
                </button>

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