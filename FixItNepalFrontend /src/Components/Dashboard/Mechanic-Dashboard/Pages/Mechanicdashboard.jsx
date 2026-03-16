import React from "react";
import { FiFileText } from "react-icons/fi";
import { StatCard, TableRow, NotificationItem } from "../HOC/TopCards";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the main graph
const data = [
  { name: "Jan", cases: 40 },
  { name: "Feb", cases: 30 },
  { name: "Mar", cases: 45 },
  { name: "Apr", cases: 35 },
  { name: "May", cases: 40 },
  { name: "Jun", cases: 30 },
  { name: "Jul", cases: 42 },
  { name: "Aug", cases: 38 },
  { name: "Sep", cases: 60 },
  { name: "Oct", cases: 50 },
  { name: "Nov", cases: 75 },
  { name: "Dec", cases: 85 },
];

const Mechanicdashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-600">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}

        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-400 text-sm">Welcome to your work panel</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-200 transition-all">
            <FiFileText size={18} /> Reports
          </button>
        </div>


         {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {StatCard.map((state, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${state.color} p-5 rounded-2xl text-white shadow-lg`}
            >
              <p className="text-white/80 text-sm mb-1">{state.title}</p>
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-bold">{state.value}</h2>
                <span className="text-xs mb-1 opacity-80">
                  {state.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
              <div className="mt-4 h-8 w-full bg-white/10 rounded-lg overflow-hidden">
                {/* Placeholder for the mini sparkline */}
                <div className="w-full h-full border-b border-white/20 border-dashed transform translate-y-4"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Graph */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Metrics</h3>
            <select className="bg-slate-50 border-none text-sm text-slate-500 rounded-md p-1 focus:ring-0">
              <option>This year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cases"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCases)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Order history</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-50">
                  <th className="pb-3 font-medium">Online store</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Repair date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TableRow.map((state, index)=>(
                    <tr key={index}>
    <td className="py-4 text-purple-600 font-medium">{state.id}</td>
    <td className="py-4 text-slate-700">{state.name}</td>
    <td className="py-4 text-slate-500">{state.date}</td>
    <td className="py-4 text-slate-700 font-semibold">{state.price}</td>
    <td className={`py-4 font-medium ${state.statusColor}`}>{state.status}</td>
  </tr>
                ))}
                
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Notifications</h3>
            <div className="space-y-6">
                {NotificationItem.map((items, index)=>(
                    <div key={index} className="flex gap-3">
    <img
      src={`https://i.pravatar.cc/150?u=${items.name}`}
      className="w-10 h-10 rounded-full"
      alt={items.name}
    />
    <div className="flex-1">
      <p className="text-sm text-slate-600">
        <span className="font-bold text-slate-800">{items.name}</span> {items.action}
      </p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-slate-400">{items.time}</span>
        <button className="text-xs font-bold text-blue-600 hover:underline">
          Accept
        </button>
      </div>
    </div>
  </div>
                ))}
                
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Mechanicdashboard;
