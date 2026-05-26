import React, { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  AlertCircle,
  Clock,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { stats } from "../HOC/dashboard";
import { Map } from "../../../HOC/Map";
import instance from "../../../../Server/Axios";
import { useServiceProviderHub } from "../../../../LiveHubs/useServiceProviderHub";
import { useLocationSender } from "../../../../LiveHubs/UseLocationSender";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState(null);

  const navigate = useNavigate();
  const serviceProviderId = localStorage.getItem("userId");

  const connectionRef = useServiceProviderHub(serviceProviderId, {
    onStatusChange: async (data) => {
      console.log("FULL HUB DATA:", data);

      if (data.liveUpdateType === "RequestAssigned") {
        await fetchRequests();
      } else if (data.liveUpdateType === "RequestStatusUpdated") {
        setRequests((prev) => prev.filter((r) => r.id !== data.requestId));
        setSelectedReq((prev) => (prev?.id === data.requestId ? null : prev));
      }
    },
  });

  useLocationSender(
    connectionRef,
    activeRequestId,
    serviceProviderId,
    isTracking,
  );

  const fetchRequests = async () => {
    try {
      const garageId = localStorage.getItem("userId");
      const res = await instance.get(`/api/garage/${garageId}/todays-request`);

      const emergencies = (res.data || []).filter(
        (r) => r.requestType === "Emergency" && r.status === "Assigned",
      );

      setRequests(emergencies);
      if (emergencies.length > 0) setSelectedReq(emergencies[0]);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdate = async (id, status) => {
    setLoading(true);

    try {
      await instance.put(`/api/servicerequest/${id}/update-status`, {
        serviceProviderId: serviceProviderId,
        status: status,
      });

      if (status === "Accepted") {
        setActiveRequestId(id);
        setIsTracking(true);

        // ✅ IMPORTANT FIX (persist request on refresh)
        localStorage.setItem("activeRequestId", id);

        navigate("/servicecenter/livetracking");
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
      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                {s.label}
              </p>
              <h2 className="text-xl font-black">{s.value}</h2>
            </div>
            <div className={`p-2 rounded-lg bg-gray-50 ${s.color}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* EMERGENCY REQUESTS */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 rounded-xl">
              <AlertCircle size={16} className="text-red-600" />
            </div>
            <h3 className="font-black text-sm text-gray-800">
              Emergency Requests
            </h3>
          </div>

          <span className="bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-bold">
            {requests.length} ACTIVE
          </span>
        </div>

        {requests.length === 0 ? (
          <div className="text-center text-gray-400 py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Clock size={30} className="opacity-40" />
            </div>

            <h3 className="text-sm font-bold text-gray-700">
              No Emergency Requests
            </h3>

            <p className="text-xs mt-1 text-gray-400">
              Everything looks safe right now
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  selectedReq?.id === req.id
                    ? "border-red-500 bg-gradient-to-br from-red-50 to-white"
                    : "border-gray-100 bg-white"
                }`}
              >
                {/* Top Glow */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-red-500" />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Emergency Request
                      </p>

                      <h4 className="text-lg font-black text-gray-800 mt-1">
                        #{req.id.slice(0, 8).toUpperCase()}
                      </h4>
                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center">
                      <AlertTriangle size={20} className="text-red-500" />
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-orange-400 text-white flex items-center justify-center font-bold text-sm">
                        {req.customerId?.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <p className="text-[11px] text-gray-400 font-medium">
                          Customer ID
                        </p>

                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {req.customerId}
                        </p>
                      </div>
                    </div>

                    {/* Optional fields */}
                    {req.createdAt && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Requested At</span>

                        <span className="font-semibold text-gray-700">
                          {new Date(req.createdAt).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {req.status && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Status</span>

                        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                          {req.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      disabled={loading}
                      onClick={() => handleUpdate(req.id, "Accepted")}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white py-3 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50"
                    >
                      <Check size={16} />
                      Accept
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => handleUpdate(req.id, "Rejected")}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="bg-white p-4 rounded-3xl border h-[450px]">
        <Map />
      </div>
    </div>
  );
};

export default Dashboard;
