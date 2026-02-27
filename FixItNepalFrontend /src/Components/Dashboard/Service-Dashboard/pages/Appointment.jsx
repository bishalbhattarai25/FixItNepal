import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  Users,
  Search,
  Filter,
  Plus,
  RotateCcw,
  Eye,
  Edit3,
  LayoutGrid,
  List,
} from "lucide-react";
import { stats } from "../HOC/Appointdata";
import { appointments } from "../HOC/Appointdata";

const Appointment = () => {
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'list'

  

  

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header & View Toggle */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            Appointments
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and schedule your appointments effortlessly.
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
          >
            <List size={14} /> List
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "card" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
          >
            <LayoutGrid size={14} /> Card
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${stat.bgColor} p-5 rounded-2xl border border-white flex justify-between items-start shadow-sm`}
          >
            <div>
              <p className="text-gray-500 text-sm font-bold mb-1">
                {stat.label}
              </p>
              <h2 className="text-3xl font-black text-gray-900">
                {stat.value}
              </h2>
            </div>
            <div
              className={`${stat.iconBg} ${stat.iconColor} p-2 rounded-xl shadow-sm`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {["Today", "Upcoming", "Completed", "All"].map((t) => (
            <button
              key={t}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${t === "Today" ? "bg-red-50 text-red-600" : "text-gray-500 hover:bg-gray-100"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search appointments"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-100 outline-none w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-white shadow-sm transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md transition-all">
            <Plus size={16} /> New Appointment
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Conditional Rendering: Grid vs List */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="p-5">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-inner">
                    ST
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">
                      {apt.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-bold">
                      {apt.service} • {apt.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                    {apt.status}
                  </span>
                </div>
                <div className="space-y-2 py-3 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <Calendar size={14} className="text-blue-500" /> {apt.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <Clock size={14} className="text-blue-500" /> {apt.time}
                  </div>
                </div>
              </div>
              <div className="flex border-t border-gray-50">
                <button className="flex-1 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 border-r border-gray-50 transition-colors">
                  <Eye size={14} /> View
                </button>
                <button className="flex-1 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                  <Edit3 size={14} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {apt.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-orange-50 text-orange-500 rounded-lg text-[10px] font-black">
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-500">
                    {apt.date} at {apt.time}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <Eye
                      size={16}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    />
                    <Edit3
                      size={16}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointment;
