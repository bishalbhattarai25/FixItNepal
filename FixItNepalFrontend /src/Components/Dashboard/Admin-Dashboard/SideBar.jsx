import React, { useState } from "react";
import { Sidebar } from "./Datalist3";
import Dashboard from "./pages/Dashboard";
import ServiceTable from "./pages/Servicecenterlist";
import { HelpCircle, Bell } from "lucide-react"; // Matching icons from UI
import PendingVerification from "./pages/PendingVerification";
// import Appoint from "./pages/Appointment";


const SideBar4 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-screen w-screen bg-[#F9FAFB] overflow-hidden">
      
      {/* Sidebar Container */}
      <div className="flex flex-col w-72 bg-white border-r border-gray-100 py-6 px-4 shrink-0 shadow-sm">
        
        {/* Brand Logo - As seen in your screenshot */}
        <div className="flex items-center gap-3 px-3 mb-10">
          
          <span className="font-black text-xl tracking-tight text-gray-900 uppercase">
            Fix-It Nepal
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {Sidebar.map((list, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-red-50 text-red-500 rounded-xl"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl"
                  }
                `}
              >
                <span className={`text-xl transition-colors ${isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {list.logo}
                </span>
                {list.title}
                
                {/* Visual indicator for active state */}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Support Section - Matches Screenshot Footer */}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-400" />
            Help & Support
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Modern Top Header - Matches your UI screenshot */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <input 
              type="text" 
              placeholder="Search location..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">📍</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Ram Sharma</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">User</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100" 
                className="w-10 h-10 rounded-full border-2 border-gray-100" 
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Viewport for Pages */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            {activeIndex === 0 && <Dashboard />}
            {activeIndex == 1 && <PendingVerification/>}
            {activeIndex === 2 && <ServiceTable />}
            {activeIndex === 3 && <ServiceTable />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SideBar4;