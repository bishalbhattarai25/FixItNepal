import React from 'react';
import { Outlet } from 'react-router-dom';
// Ensure this matches your SideBar.js export style (Default vs Named)
import SideBar from './SideBar'; 

export const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 antialiased overflow-hidden">
      
      <aside className="relative z-20 flex-shrink-0 border-r border-slate-200">
        <SideBar />
      </aside>

      <div className="relative flex flex-1 flex-col overflow-hidden">
        
        <header className="sticky top-0 z-10 flex h-20 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
           <div className="flex items-center gap-4 w-full max-w-xl">
             <div className="relative w-full">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
               <input 
                 type="text" 
                 placeholder="Search for mechanics or services..." 
                 className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-red-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10"
               />
             </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <img 
                  src=" " 
                  alt="avatar" 
                />
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth transition-all">
          <div className="mx-auto w-full max-w-[1440px] p-6 lg:p-10">
            {/* Standard Tailwind transition for compatibility */}
            <div className="opacity-100 transition-opacity duration-500">
              <Outlet /> 
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};