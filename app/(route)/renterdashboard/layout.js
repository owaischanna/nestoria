"use client";
import Sidebar from "@/app/Components/Sidebar";


export default function RenterDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Page content on the right */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
