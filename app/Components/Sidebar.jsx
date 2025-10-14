// Sidebar.jsx
import {
  LayoutDashboard, FileText, Heart, MessageSquare, Briefcase,
  MapPin, DollarSign, PawPrint, User, Settings, HelpCircle
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, count, isActive }) => {
  const baseClasses = "flex items-center p-3 rounded-lg transition-colors cursor-pointer";
  const activeClasses = "bg-amber-600 text-white font-semibold shadow-md";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <Icon className="h-5 w-5 mr-3" />
      <span className="flex-1">{label}</span>
      {count && (
        <span className={`${isActive ? 'bg-amber-700' : 'bg-gray-200 text-gray-700'} text-xs font-semibold px-2 py-0.5 rounded-full`}>
          {count}
        </span>
      )}
    </div>
  );
};

const Sidebar = () => (
  <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col flex-shrink-0">
    {/* Main Menu */}
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">MAIN MENU</h3>
      <nav className="space-y-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={true} />
        <SidebarItem icon={FileText} label="My Applications" count={3} isActive={false} />
        <SidebarItem icon={Heart} label="Favorites" count={7} isActive={false} />
        <SidebarItem icon={MessageSquare} label="Messages" count="•" isActive={false} />
        <SidebarItem icon={Briefcase} label="My Bookings" isActive={false} />
      </nav>
    </div>

    {/* Quick Filters */}
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">QUICK FILTERS</h3>
      <nav className="space-y-1">
        <SidebarItem icon={MapPin} label="Near You" isActive={false} />
        <SidebarItem icon={DollarSign} label="Under $800" isActive={false} />
        <SidebarItem icon={PawPrint} label="Pet Friendly" isActive={false} />
      </nav>
    </div>

    {/* Account */}
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">ACCOUNT</h3>
      <nav className="space-y-1">
        <SidebarItem icon={User} label="Profile" isActive={false} />
        <SidebarItem icon={Settings} label="Settings" isActive={false} />
        <SidebarItem icon={HelpCircle} label="Help & Support" isActive={false} />
      </nav>
    </div>
  </div>
);

export default Sidebar;