import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  RotateCcw,
  Eye,
  Edit3,
  LayoutGrid,
  List,
  Calendar,
  Clock,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import instance from "../../../../Server/Axios";
import { stats as staticStats } from "../HOC/Appointdata.jsx";

/* ---------------- UTC helper ---------------- */
const toUTCDate = (dateStr) => {
  if (!dateStr) return undefined;

  const date = new Date(dateStr);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
};

/* ---------------- initials helper ---------------- */
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

/* ---------------- APIs ---------------- */
const fetchAppointments = async (garageId, status, date) => {
  const res = await instance.get(`/api/garage/${garageId}/appointments`, {
    params: {
      status: status !== "All" ? status : undefined,
      date: date ? toUTCDate(date) : undefined,
    },
  });

  return res.data;
};

const fetchAnalytics = async (garageId) => {
  const res = await instance.get(
    `/api/garage/${garageId}/appointment-analytics`
  );
  return res.data;
};

const Appointment = () => {
  const [viewMode, setViewMode] = useState("card");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const garageId = localStorage.getItem("userId");

  /* ---------------- appointments ---------------- */
  const {
    data: apiData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["appointments", garageId, statusFilter, dateFilter],
    queryFn: () => fetchAppointments(garageId, statusFilter, dateFilter),
  });

  /* ---------------- analytics ---------------- */
  const { data: analytics } = useQuery({
    queryKey: ["analytics", garageId],
    queryFn: () => fetchAnalytics(garageId),
  });

  const appointments = apiData.map((item) => ({
    name: item.customer?.name,
    service: item.request?.problemType,
    type: item.request?.vehicleType,
    status: item.request?.status,
    date: item.request?.scheduledDate?.split("T")[0],
    time: item.request?.scheduledTime,
  }));

  /* ---------------- ONLY DATA FIX (NO UI CHANGE) ---------------- */
  const stats = staticStats.map((s) => {
    if (s.label === "Today") {
      return { ...s, value: analytics?.today ?? 0 };
    }
    if (s.label === "Upcoming") {
      return { ...s, value: analytics?.upcoming ?? 0 };
    }
    if (s.label === "Completed") {
      return { ...s, value: analytics?.completed ?? 0 };
    }
    if (s.label === "All Appointments") {
      return { ...s, value: analytics?.total ?? 0 };
    }
    return s;
  });

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-500">
        Failed to load appointments.
        <button onClick={refetch} className="ml-2 underline">
          Retry
        </button>
      </div>
    );

  return (
    <div className="animate-in fade-in duration-500">

      {/* HEADER (UNCHANGED) */}
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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
              viewMode === "list"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-400"
            }`}
          >
            <List size={14} /> List
          </button>

          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
              viewMode === "card"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-400"
            }`}
          >
            <LayoutGrid size={14} /> Card
          </button>
        </div>
      </div>

      {/* STATS) */}
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

      {/* FILTERS*/}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

        <div className="flex gap-2">
          {["Completed", "All"].map((t) => (
            <button
              key={t}
              onClick={() => setStatusFilter(t)}
              className={`px-4 py-2 text-xs font-bold rounded-xl ${
                statusFilter === t
                  ? "bg-red-50 text-red-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-64"
            />
          </div>

          <button
            onClick={refetch}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* CARD VIEW (UNCHANGED) */}
      {viewMode === "card" ? (
        appointments.length === 0 ? (
          <div className="text-center text-gray-400 font-bold py-10">
            No data
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {appointments.map((apt, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                <div className="p-5">

                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-inner">
                      {getInitials(apt.name)}
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
                      <Calendar size={14} className="text-blue-500" />
                      {apt.date}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                      <Clock size={14} className="text-blue-500" />
                      {apt.time}
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
        )
      ) : (
        /* LIST VIEW (UNCHANGED) */
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
                    <Eye size={16} className="text-gray-400" />
                    <Edit3 size={16} className="text-gray-400" />
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