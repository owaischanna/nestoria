// "use client";

// import {
//   Home,
//   ClipboardList,
//   Calendar,
//   MessageSquare,
//   Star,
//   DollarSign,
//   User,
//   Settings,
//   HelpCircle,
// } from "lucide-react";
// import { useState } from "react";

// export default function HostSidebar() {
//   const [activeMenu, setActiveMenu] = useState("Dashboard");

//   const menuItems = [
//     { name: "Dashboard", icon: Home,  },
//     { name: "My Listings", icon: ClipboardList, badge: 3 },
//     { name: "Bookings", icon: Calendar },
//     { name: "Messages", icon: MessageSquare, dot: true },
//     { name: "Reviews", icon: Star },
//     { name: "Payments", icon: DollarSign },
//   ];

//   const accountItems = [
//     { name: "Profile", icon: User },
//     { name: "Settings", icon: Settings },
//     { name: "Help & Support", icon: HelpCircle },
//   ];

//   return (
//     <aside className="w-64 bg-white flex flex-col shadow-sm overflow-y-auto">
//       {/* Logo */}
//       <div className="p-6 flex items-center space-x-2">
//         <div className="bg-green-600 h-6 w-6 rounded-full" />
//         <span className="text-lg font-bold text-green-700">Nestoria</span>
//       </div>

//       {/* Main Menu */}
//       <div className="px-4">
//         <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
//           Main Menu
//         </h3>
//         <nav className="space-y-1">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeMenu === item.name;
//             return (
//               <button
//                 key={item.name}
//                 onClick={() => setActiveMenu(item.name)}
//                 className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
//                   isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <Icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </div>
//                 {item.badge && (
//                   <span className="bg-green-200 text-green-800 text-xs rounded-full px-2">
//                     {item.badge}
//                   </span>
//                 )}
//                 {item.dot && <span className="bg-red-500 h-2 w-2 rounded-full"></span>}
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Account Section */}
//       <div className="px-4 mt-6">
//         <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
//           Account
//         </h3>
//         <nav className="space-y-1">
//           {accountItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.name}
//                 className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
//               >
//                 <Icon className="h-4 w-4 mr-3" />
//                 {item.name}
//               </button>
//             );
//           })}
//         </nav>
//       </div>
//     </aside>
//   );
// }




"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  Calendar,
  MessageSquare,
  Star,
  DollarSign,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const mainMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, route: "/hostdashboard" },
  { id: "listings", label: "My Listings", icon: ClipboardList, badge: 3, route: "/hostmylisting" },
  {
    id: "bookings",
    label: "Bookings",
    icon: Calendar,
    route: "/hostbooking",
    subItems: [
      { id: "all-bookings", label: "All Bookings", route: "/hostbooking" },
        { id: "check-ins", label: "Check-ins", route: "/hostcheckin" },
          { id: "check-out", label: "Check-out", route: "/hostbooking" },
            { id: "maintenance", label: "Maintenance", route: "/hostbooking" },

    ],
  },
  { id: "messages", label: "Messages", icon: MessageSquare, dot: true, route: "/hostmessage" },
  { id: "reviews", label: "Reviews", icon: Star, route: "/hostreviews" },
  { id: "payments", label: "Earnings", icon: DollarSign, route: "/hostearning" },
];

const accountItems = [
  { label: "Profile", icon: User, route: "/hostprofile" },
  { label: "Settings", icon: Settings, route: "/hostsettings" },
  { label: "Help & Support", icon: HelpCircle, route: "/hosthelp" },
];

const SidebarItem = ({ item }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = pathname.startsWith(item.route);
  const Icon = item.icon;

  const handleClick = (e) => {
    if (item.subItems) {
      e.preventDefault();
      setOpen((prev) => !prev);
    } else {
      router.push(item.route);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
          isActive ? "bg-green-50 text-green-700 font-semibold" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-5 w-5 mr-3 ${
              isActive ? "text-green-600" : "text-gray-400"
            }`}
          />
        )}
        <span className="flex-1 text-sm">{item.label}</span>
        {item.subItems && (
          open ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )
        )}
        {item.badge && (
          <span
            className={`${
              isActive ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            } text-xs font-semibold px-2 py-0.5 rounded-full`}
          >
            {item.badge}
          </span>
        )}
        {item.dot && <span className="w-2 h-2 bg-red-500 rounded-full ml-1" />}
      </div>

      {/* Sub Items */}
      {item.subItems && open && (
        <div className="ml-8 mt-1 space-y-1">
          {item.subItems.map((sub) => (
            <Link key={sub.id} href={sub.route}>
              <div
                className={`p-2 rounded-md text-sm cursor-pointer ${
                  pathname === sub.route
                    ? "text-green-700 bg-green-50 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {sub.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HostSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">
          Nest<span className="text-green-600">oria</span>
        </h2>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">
          MAIN MENU
        </h3>
        <nav className="space-y-1">
          {mainMenuItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">
          ACCOUNT
        </h3>
        <nav className="space-y-1">
          {accountItems.map((item) => (
            <Link href={item.route} key={item.label}>
              <div className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
                <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
