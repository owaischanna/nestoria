  "use client";

  import { useState } from "react";
  import Link from "next/link";
  import Image from "next/image";
  import { usePathname, useRouter } from "next/navigation";
  import Hab from "../../public/assets/hab.jpg" 
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
        { id: "check-out", label: "Check-out", route: "/hostcheckout" },
        { id: "maintenance", label: "Maintenance", route: "/hostmentenance" },
      ],
    },
    { id: "messages", label: "Messages", icon: MessageSquare, dot: true, route: "/hostmessage" },
    { id: "reviews", label: "Reviews", icon: Star, route: "/hostreview" },
    { id: "payments", label: "Earnings", icon: DollarSign, route: "/hostearning" },
  ];

  const accountItems = [
    { id:"Profile", label: "Profile", icon: User, route: "/hostprofile" },

    {  id :"setting",
      label: "Settings", 
      icon: Settings, 
      route: "/hostsetting" ,
    subItems: [
        { id: "account", label: "Account", route: "/hostsetting" },
        { id: "notifications", label: "Notifications", route: "/hostsettting" },
        { id: "privacy-security", label: "Privacy and Security", route: "/hostsetting" },
      
      ],
    },
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
          {item.subItems &&
            (open ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            ))}
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
      <aside className="w-64 bg-white border-r border-gray-100 pt-0  px-6 flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-y-auto ">
        {/* ✅ Logo Section */}
        <div className="mb-8 flex items-center space-x-2 mt-0 transform -translate-y-6">
          <Image
            src={Hab}
            alt="Habisolo Logo"
            width={290}
            height={50}
            className="rounded-full object-none  h-[95px]"
            priority
          />
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
              <SidebarItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </aside>
    );
  }
