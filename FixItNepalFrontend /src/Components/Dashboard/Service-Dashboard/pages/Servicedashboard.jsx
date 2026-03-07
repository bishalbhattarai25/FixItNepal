import React from "react";

import { MapPin,Star, TrendingUp} from 'lucide-react'

import { stats } from "../HOC/dashboard";
import { Map } from "../../../HOC/Map";

const Servicedashboard = () => {
  return (
    <div className="space-y-6">
      {/* 2. Simplified Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {s.label}
              </p>
              <h2 className="text-2xl font-black text-gray-900">{s.value}</h2>
            </div>
            <div className={`p-2 bg-gray-50 rounded-xl ${s.color}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Live Tracking Map Placeholder */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-gray-100 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black flex items-center gap-2">
              🔴 Live Tracking
            </h3>
            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-lg font-bold">
              Online
            </span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 font-bold">
            <Map />
          </div>
        </div>

        {/* 4. Minimal Emergency Card */}
        <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex flex-col">
          <div className="flex justify-between text-red-500 font-black text-[10px] mb-4">
            <span>🚨 EMERGENCY</span>
            <span className="bg-white px-2 rounded-md">02:45</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden">
              <img src="https://i.pravatar.cc/100?u=9" alt="User" />
            </div>
            <div>
              <h4 className="font-black text-gray-900">Rabin Shrestha</h4>
              <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                <MapPin size={10} /> 2.4 km away • Thamel
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs border-b border-red-100 pb-2">
              <span className="text-gray-500">Bike Model</span>
              <span className="font-bold">Pulsar 220F</span>
            </div>
            <div className="flex justify-between text-xs border-b border-red-100 pb-2">
              <span className="text-gray-500">Issue</span>
              <span className="font-bold text-red-600">Flat Tyre</span>
            </div>
          </div>

          <div className="mt-auto flex gap-2">
            <button className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-red-100">
              Accept
            </button>
            <button className="flex-1 bg-white text-gray-400 py-3 rounded-xl font-bold text-xs border border-gray-200">
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Mechanic Availability */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 mb-4">Mechanics Availability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Bikash T.", jobs: 46, rating: 4.8, img: "https://i.pravatar.cc/150?u=1" },
                { name: "Anjali M.", jobs: 12, rating: 4.9, img: "https://i.pravatar.cc/150?u=2" },
                { name: "Priya S.", jobs: 82, rating: 4.7, img: "https://i.pravatar.cc/150?u=3" }
              ].map((mech, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors">
                  <img src={mech.img} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div>
                    <p className="text-sm font-black text-gray-900">{mech.name}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" /> {mech.rating} • {mech.jobs} Jobs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



         { /* Right Col: Requests & Revenue */}
        <div className="space-y-6">
          {/* Emergency Request Card */}
          

          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-900">Revenue Trend</h3>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <div className="h-24 flex items-end gap-1 mb-4">
              {/* {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-red-50 rounded-t-md relative group">
                  <div style={{ height: `${h}%` }} className="bg-red-500 rounded-t-md transition-all group-hover:bg-red-600" />
                </div>
              ))} */}
            </div>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <p className="text-[10px] font-bold text-gray-400">Customer Satisfaction</p>
                 <p className="text-[10px] font-black text-gray-900">92%</p>
               </div>
               <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-green-500 h-full w-[92%]" />
               </div>
            </div>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <p className="text-[10px] font-bold text-gray-400">Avg Response Time</p>
                 <p className="text-[10px] font-black text-gray-900">14 min</p>
               </div>
               <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-green-500 h-full w-[92%]" />
               </div>
            </div>
          </div>
        </div>

        </div>
    
  );
};

export default Servicedashboard;
