import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export const Layout = () => {
  return (
    // Added 'antialiased' for smoother font rendering and 'text-slate-900' for better contrast
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 antialiased overflow-hidden">
      
      {/* Sidebar with a subtle border and shadow for depth */}
      <aside className="relative z-20 flex-shrink-0">
        <SideBar />
      </aside>

      <div className="relative flex flex-1 flex-col overflow-hidden">
        
        {/* Header: Added glassmorphism (backdrop-blur) and fixed positioning feel */}
        <header className="sticky top-0 z-10 flex h-20 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
           <div className="flex items-center gap-4 w-full max-w-xl">
             {/* Example Header Content: Search Bar */}
             <div className="relative w-full">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
               <input 
                 type="text" 
                 placeholder="Search for mechanics or services..." 
                 className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-red-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10"
               />
             </div>
           </div>
           
           {/* Profile section logic would go here */}
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User" alt="avatar" />
              </div>
           </div>
        </header>

        {/* Main Content: Improved spacing and smooth scrolling */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth transition-all">
          <div className="mx-auto w-full max-w-[1440px] p-6 lg:p-10">
            {/* Wrapped Outlet in a motion div (if you use Framer Motion) 
               to allow for page transition animations later. 
            */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet /> 
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};