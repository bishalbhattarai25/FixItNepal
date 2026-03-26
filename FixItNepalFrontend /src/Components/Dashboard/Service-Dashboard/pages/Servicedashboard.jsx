import React, { useEffect, useState } from "react";
import { MapPin, Star, TrendingUp, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { stats } from "../HOC/dashboard";
import { Map } from "../../../HOC/Map";
import instance from "../../../../Server/Axios";

const Servicedashboard = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const garageId = localStorage.getItem("userId");
        const response = await instance.get(`/api/garage/${garageId}/todays-request`);
        
        const data = response.data || [];
        
        const pendingEmergencies = data.filter(req => 
          req.requestType === "Emergency" && req.status === "Pending"
        );
        
        setEmergencyRequests(pendingEmergencies);
        if (pendingEmergencies.length > 0) setSelectedRequest(pendingEmergencies[0]);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{s.label}</p>
              <h2 className="text-2xl font-black text-gray-900">{s.value}</h2>
            </div>
            <div className={`p-2 bg-gray-50 rounded-xl ${s.color}`}>{s.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Map Section */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-gray-100 h-[500px] flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black flex items-center gap-2">🔴 Live Tracking</h3>
            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-lg font-bold">Online</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden">
            <Map />
          </div>
        </div>

        {/* 3. Dynamic Emergency List & Detail Section */}
        <div className="bg-white border border-gray-100 rounded-3xl flex flex-col h-[500px] overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-50 bg-red-50/30 flex justify-between items-center">
            <h3 className="font-black text-gray-900 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" /> 
              Emergency Inbox
            </h3>
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full">
              {emergencyRequests.length} New
            </span>
          </div>

          {emergencyRequests.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <Clock size={40} className="mb-2 opacity-20" />
              <p className="text-sm font-bold">No active emergencies</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {emergencyRequests.map((req) => (
                <div 
                  key={req.id}
                  onMouseEnter={() => setSelectedRequest(req)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-all relative group
                    ${selectedRequest?.id === req.id ? 'bg-red-50/50' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{req.problemType}</span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      {new Date(req.creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm truncate pr-4">User: {req.id.slice(0, 8)}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                    <MapPin size={10} /> Location: {req.locationCoordinates.latitude.toFixed(2)}, {req.locationCoordinates.longitude.toFixed(2)}
                  </div>
                  
                  {/* Hover Detail Overlay (Simple version) */}
                  <ChevronRight size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 text-red-300 transition-transform ${selectedRequest?.id === req.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`} />
                </div>
              ))}
            </div>
          )}

          {/* Action Area for Selected Request */}
          {selectedRequest && (
            <div className="p-5 bg-gray-50 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2">
              <div className="mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Problem Description</p>
                <p className="text-xs text-gray-700 italic font-medium leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                  "{selectedRequest.problemDescription || 'No description provided'}"
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-xs hover:bg-red-700 transition-colors shadow-lg shadow-red-100">
                  Accept
                </button>
                <button className="px-4 bg-white text-gray-400 py-3 rounded-xl font-black text-xs border border-gray-200 hover:bg-gray-100 transition-colors">
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Mechanic Availability */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4">Mechanics Availability</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Bikash T.", jobs: 46, rating: 4.8, img: "https://i.pravatar.cc/150?u=1" },
            { name: "Anjali M.", jobs: 12, rating: 4.9, img: "https://i.pravatar.cc/150?u=2" },
            { name: "Priya S.", jobs: 82, rating: 4.7, img: "https://i.pravatar.cc/150?u=3" }
          ].map((mech, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors">
              <img src={mech.img} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="" />
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
    </div>
  );
};

export default Servicedashboard;