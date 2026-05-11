import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export const Layout = () => {
  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-72 flex-shrink-0 border-r border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="h-full flex flex-col">

          {/* BRAND */}
          <div className="px-6 py-5 border-b border-slate-100">
            <h1 className="text-lg font-black tracking-wide text-red-500">
              FixItNepal
            </h1>
            <p className="text-xs text-slate-400">User Dashboard</p>
          </div>

          {/* SIDEBAR CONTENT */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <SideBar />
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-slate-100 text-xs text-slate-400">
            © 2026 FixItNepal
          </div>

        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER (same style as Layout2) */}
        <header className="h-16 flex items-center justify-between px-8 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">

          {/* SEARCH */}
          <div className="w-full max-w-xl">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search mechanics or services..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition"
              />
            </div>
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold">User</p>
              <p className="text-[10px] text-slate-400">Online</p>
            </div>

            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-red-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
              U
            </div>
          </div>

        </header>

        {/* CONTENT (EXACT Layout2 STYLE) */}
<main className="flex-1 overflow-y-auto pt-6 px-2">
  <div className="w-full h-full bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-sm min-h-[calc(100vh-64px)]">
    <Outlet />
  </div>
</main>

      </div>
    </div>
  );
};