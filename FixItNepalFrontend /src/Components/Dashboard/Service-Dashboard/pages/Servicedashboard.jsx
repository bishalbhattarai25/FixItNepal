import React, { useEffect, useState } from "react";
import { MapPin, Star, AlertCircle, Clock, Check, X } from 'lucide-react';
import { stats } from "../HOC/dashboard";
import { Map } from "../../../HOC/Map";
import instance from "../../../../Server/Axios";

const Servicedashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const fetchRequests = async () => {
    try {
      const garageId = localStorage.getItem("userId");
      const res = await instance.get(`/api/garage/${garageId}/todays-request`);
      // Filter for Emergency & Pending only
      const emergencies = (res.data || []).filter(r => r.requestType === "Emergency" && r.status === "Pending");
      setRequests(emergencies);
      if (emergencies.length > 0) setSelectedReq(emergencies[0]);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  
  const handleUpdate = async (id, status) => {
    setLoading(true);
    try {
      await instance.patch(`/api/garage/${id}/approval-status`, null, {
        params: { approvalStatus: status }
      });
      // Refresh list after update
      fetchRequests();
      setSelectedReq(null);
    } catch (err) {
      console.error("Update error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* 1. Statistics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">{s.label}</p>
              <h2 className="text-xl font-black">{s.value}</h2>
            </div>
            <div className={`p-2 rounded-lg bg-gray-50 ${s.color}`}>{s.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Map View */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-gray-100 h-[450px] flex flex-col shadow-sm">
          <h3 className="font-black text-sm mb-4 flex items-center gap-2">🔴 Live Assistance Map</h3>
          <div className="flex-1 bg-slate-50 rounded-2xl overflow-hidden border border-gray-100">
            <Map />
          </div>
        </div>

        {/* 3. Emergency Inbox */}
        <div className="bg-white rounded-3xl border border-gray-100 flex flex-col h-[450px] shadow-sm overflow-hidden">
          <div className="p-4 bg-red-50/50 border-b flex justify-between items-center">
            <h3 className="font-black text-sm text-red-600 flex items-center gap-2">
              <AlertCircle size={16} /> Emergency Requests
            </h3>
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{requests.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {requests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                <Clock size={32} className="mb-2 opacity-20" />
                <p className="text-xs font-bold">All clear! No pending emergencies.</p>
              </div>
            ) : (
              requests.map((req) => (
                <div 
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`p-4 border-b transition-colors cursor-pointer ${selectedReq?.id === req.id ? 'bg-red-50/30' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                    <span className="text-red-600">{req.problemType}</span>
                    <span className="text-gray-400">{new Date(req.creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">ID: {req.id.slice(0, 8)}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                    <MapPin size={10} /> {req.locationCoordinates.latitude.toFixed(2)}, {req.locationCoordinates.longitude.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Area */}
          {selectedReq && (
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Note: {selectedReq.problemDescription || 'No details'}</p>
              <div className="flex gap-2">
                <button 
                  disabled={loading}
                  onClick={() => handleUpdate(selectedReq.id, 'Approved')}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Check size={14} /> Accept
                </button>
                <button 
                  disabled={loading}
                  onClick={() => handleUpdate(selectedReq.id, 'Rejected')}
                  className="px-4 bg-white border border-gray-200 text-gray-400 py-2.5 rounded-xl hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Mechanic Status */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-black text-sm mb-4">Available Mechanics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Bikash T.", "Anjali M.", "Priya S."].map((name, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-gray-50 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black">{name[0]}</div>
              <div>
                <p className="text-xs font-black">{name}</p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Star size={8} className="text-yellow-400 fill-yellow-400" /> 4.8 Rating
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