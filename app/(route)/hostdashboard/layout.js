"use client";
import HostSidebar from "@/app/Components/HostSidebar";
import HostHeader from "@/app/Components/HostHeader";

export default function HostDashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <HostSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <HostHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
