import React, { useEffect, useState } from "react";
import { MapPin, Star, AlertCircle, Clock, Check, X } from "lucide-react";
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
        setRequests((prev) =>
          prev.filter((r) => r.id !== data.requestId)
        );
        setSelectedReq((prev) =>
          prev?.id === data.requestId ? null : prev
        );
      }
    },
  });

  useLocationSender(
    connectionRef,
    activeRequestId,
    serviceProviderId,
    isTracking
  );

  const fetchRequests = async () => {
    try {
      const garageId = localStorage.getItem("userId");
      const res = await instance.get(
        `/api/garage/${garageId}/todays-request`
      );

      const emergencies = (res.data || []).filter(
        (r) =>
          r.requestType === "Emergency" &&
          r.status === "Assigned"
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
      await instance.put(
        `/api/servicerequest/${id}/update-status`,
        {
          serviceProviderId: serviceProviderId,
          status: status,
        }
      );

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
          <div className="text-center text-gray-400 py-14">
            <Clock size={34} className="mx-auto mb-3 opacity-20" />
            <p className="text-xs font-semibold">
              All clear! No emergencies right now
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {requests.map((req) => (
              <div
                key={req.id}
                className={`relative rounded-2xl border p-5 transition-all duration-200 ${
                  selectedReq?.id === req.id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <h4 className="text-sm font-black">
                  #{req.id.slice(0, 8).toUpperCase()}
                </h4>

                <div className="flex gap-2 mt-4">
                  <button
                    disabled={loading}
                    onClick={() =>
                      handleUpdate(req.id, "Accepted")
                    }
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl text-xs"
                  >
                    <Check size={14} /> Accept
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      handleUpdate(req.id, "Rejected")
                    }
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs"
                  >
                    <X size={14} /> Reject
                  </button>
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