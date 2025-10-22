// "use client";
// import Sidebar from "@/app/Components/RenterSidebar";
// import RenterHeader from "@/app/Components/RenterHeader";

// export default function RenterDashboardLayout({ children }) {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar on the left */}
//       <Sidebar />

//       {/* Page content on the right */}
//       <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
//         {children}
//       </main>


      
//     </div>
//   );
// }


"use client";
import Sidebar from "@/app/Components/RenterSidebar";
import RenterHeader from "@/app/Components/RenterHeader";

export default function RenterDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Page content on the right */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Renter Header at the top */}
        <RenterHeader />

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
