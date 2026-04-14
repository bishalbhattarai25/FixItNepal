import React, { useEffect, useState } from "react";
import { MapPin, Star, AlertCircle, Clock, Check, X } from 'lucide-react';
import { stats } from "../HOC/dashboard";
import { Map } from "../../../HOC/Map";
import instance from "../../../../Server/Axios";
import { useServiceProviderHub } from "../../../../LiveHubs/useServiceProviderHub";
import { useLocationSender } from "../../../../LiveHubs/UseLocationSender";
import { useNavigate } from "react-router-dom";

const Servicedashboard = () => {
const [requests, setRequests] = useState([]);
const [selectedReq, setSelectedReq] = useState(null);
const [loading, setLoading] = useState(false);
const [isTracking, setIsTracking] = useState(false);
const [newAlert, setNewAlert] = useState(false); // 

const navigate = useNavigate();

const serviceProviderId = localStorage.getItem("userId");

const connectionRef = useServiceProviderHub(serviceProviderId, {
  onStatusChange: async (data) => {
    console.log("FULL HUB DATA:", data);

    if (data.liveUpdateType === "RequestAssigned") {
      await fetchRequests(); 
    }

    else if (data.liveUpdateType === "RequestStatusUpdated") {
      setRequests(prev => prev.filter(r => r.id !== data.requestId));
      setSelectedReq(prev => prev?.id === data.requestId ? null : prev);
    }
  }
});
// const connectionRef = useServiceProviderHub(serviceProviderId, {
//   onStatusChange: async (data) => {
//     console.log("FULL HUB DATA:", data);

//     if (data.liveUpdateType === "RequestAssigned") {
//       const res = await instance.get(`/api/garage/${serviceProviderId}/todays-request`);
//       const newReq = res.data.find(r => r.id === data.requestId);

//       if (newReq?.requestType === "Emergency" && newReq?.status === "Pending") {
//         setRequests(prev => {
//           if (prev.find(r => r.id === newReq.id)) return prev;
//           return [{ ...newReq, isNew: true }, ...prev];
//         });
//         setNewAlert(true);
//         setTimeout(() => setNewAlert(false), 3000);
//       }

//     } else if (data.liveUpdateType === "RequestStatusUpdated") {
//       setRequests(prev => prev.filter(r => r.id !== data.requestId));
//       setSelectedReq(prev => prev?.id === data.requestId ? null : prev);
//     }
//   }
// });


  // Sends GPS location every 4s when isTracking is true
  useLocationSender(                                           
    connectionRef,
    selectedReq?.id,
    serviceProviderId,
    isTracking
  );

  
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

  var providerId = localStorage.getItem("userId");
const handleUpdate = async (id, status) => {
  setLoading(true);

  try {
    await instance.put( `/api/servicerequest/${id}/update-status`,
      {
        serviceProviderId: providerId,      
        status: status,   
      });

    if (status === "Accepted") {
      setIsTracking(true);

      navigate("/servicecenter/livetracking", {
        state: {
          requestId: id
        }
      });

    } else {
      setIsTracking(false);
    }

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

{/* emergency */}
<div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
  {/* HEADER */}
  <div className="flex justify-between items-center mb-5">
    <div className="flex items-center gap-2">
      <div className="p-2 bg-red-50 rounded-xl">
        <AlertCircle size={16} className="text-red-600" />
      </div>
      <h3 className="font-black text-sm text-gray-800">
        Emergency Requests
      </h3>
    </div>

    <span className="bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-sm">
      {requests.length} ACTIVE
    </span>
  </div>

  {/* EMPTY STATE */}
  {requests.length === 0 ? (
    <div className="text-center text-gray-400 py-14">
      <Clock size={34} className="mx-auto mb-3 opacity-20" />
      <p className="text-xs font-semibold">All clear! No emergencies right now</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {requests.map((req) => (
        <div
          key={req.id}
          className={`relative rounded-2xl border p-5 transition-all duration-200
          hover:shadow-xl hover:-translate-y-1
          ${
            selectedReq?.id === req.id
              ? "border-red-500 bg-red-50 shadow-md"
              : "border-gray-100 bg-white"
          }`}
        >
          {/* TOP BADGE */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-red-100 text-red-600">
              {req.problemType}
            </span>

            <span className="text-[10px] text-gray-400 font-medium">
              {new Date(req.creationTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* REQUEST ID */}
          <h4 className="text-sm font-black text-gray-900 tracking-wide">
            #{req.id.slice(0, 8).toUpperCase()}
          </h4>

          {/* LOCATION */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-2">
            <MapPin size={12} />
            {req.locationCoordinates.latitude.toFixed(2)},{" "}
            {req.locationCoordinates.longitude.toFixed(2)}
          </div>

          {/* STATUS DOT */}
          <div className="flex items-center gap-2 mt-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] text-red-600 font-semibold">
              Urgent Request
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-4">
            <button
              disabled={loading}
              onClick={() => handleUpdate(req.id, "Accepted")}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition"
            >
              <Check size={14} /> Accept
            </button>

            <button
  disabled={loading}
  onClick={() => handleUpdate(req.id, "Rejected")}
  className="flex-1 group relative overflow-hidden bg-white border border-red-200 text-red-500 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 hover:bg-red-50 hover:border-red-400 hover:text-red-600 hover:shadow-sm"
>
  <div className="flex items-center justify-center gap-1">
    <X
      size={14}
      className="transition-transform duration-200 group-hover:rotate-90"
    />
    Reject
  </div>

  {/* subtle red shine effect */}
  <span className="absolute inset-0 bg-red-100 opacity-0 group-hover:opacity-20 transition" />
</button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

   <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-gray-100 h-[450px] flex flex-col shadow-sm">
          <h3 className="font-black text-sm mb-4 flex items-center gap-2">🔴 Live Assistance Map</h3>
          <div className="flex-1 bg-slate-50 rounded-2xl overflow-hidden border border-gray-100">
            <Map />
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