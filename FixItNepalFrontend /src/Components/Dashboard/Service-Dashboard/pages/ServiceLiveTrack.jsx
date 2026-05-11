import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, X, Headset, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../Server/Axios";
import LiveTrackMap from "../../../HOC/LiveTrackMap";
import { useServiceProviderHub } from "../../../../LiveHubs/useServiceProviderHub";
import { useLocationSender } from "../../../../LiveHubs/UseLocationSender";
import {
  getEtaMinutes,
  getEtaText,
} from "../../../../MapHelper/EstimationTimeHelper";
import { getDistanceKm } from "../../../../MapHelper/DistanceHelper";

const ServiceLivetrack = () => {
  const navigate = useNavigate();

  const requestId = localStorage.getItem("activeRequestId");
  const serviceProviderId = localStorage.getItem("userId");

  const [request, setRequest] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userLocation, setUserLocation] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);

  const connectionRef = useServiceProviderHub(serviceProviderId, {
    onStatusChange: (data) => {
      if (
        data.requestStatus === "Completed" ||
        data.requestStatus === "Cancelled"
      ) {
        localStorage.removeItem("activeRequestId");
        navigate("/servicecenter");
      }
    },

    onLocationUpdate: (data) => {
      setMechanicLocation([data.latitude, data.longitude]);
    },
  });

  useLocationSender(
    connectionRef,
    requestId,
    serviceProviderId,
    !!requestId
  );

  useEffect(() => {
    const fetchRequest = async () => {
      if (!requestId) {
        setLoading(false);
        return;
      }

      try {
        const res = await instance.get(
          `/api/servicerequest/${requestId}`
        );
        setRequest(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId]);

  useEffect(() => {
    if (!request?.locationCoordinates) return;

    const { latitude, longitude } = request.locationCoordinates;
    setUserLocation([latitude, longitude]);
  }, [request]);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!request?.customerId) return;

      try {
        const res = await instance.get(
          `/api/customer/${request.customerId}`
        );
        setCustomer(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCustomer();
  }, [request]);

  if (!requestId) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Active Request
          </h2>
          <p className="text-gray-500 mb-6">
            You don’t have any active request.
          </p>

          <button
            onClick={() => navigate("/servicecenter")}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  const distanceKm = getDistanceKm(
    userLocation,
    mechanicLocation
  );

  const etaMin = getEtaMinutes(distanceKm);
  const statusText = getEtaText(etaMin);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Live Tracking
        </h1>
        <p className="text-gray-500">
          Track your customer's location in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAP (UNCHANGED) */}
        <div className="lg:col-span-2 relative bg-white rounded-2xl shadow-sm overflow-hidden min-h-[500px]">

          <div className="absolute top-6 left-6 z-10 bg-white p-4 rounded-xl shadow-lg min-w-[200px]">

            <div className="flex justify-between items-center mb-2">
              <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded">
                EN ROUTE
              </span>

              <span className="text-gray-400 text-xs">
                Request #{requestId.slice(0, 6)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {distanceKm
                    ? `${distanceKm} km away`
                    : "Calculating..."}
                </p>
                <p className="text-xs text-gray-500">
                  {statusText}
                </p>
              </div>
            </div>

          </div>

          <LiveTrackMap
            userLocation={userLocation}
            mechanicLocation={mechanicLocation}
            role="ServiceProvider"
          />
        </div>

        {/* SIDEBAR (UNCHANGED) */}
        <div className="flex flex-col gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                {customer?.name?.substring(0, 2).toUpperCase() ||
                  "??"}
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  {customer?.name || "Loading..."}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">4.8</span>
                </div>
              </div>

            </div>

            <div className="space-y-3 mb-6">

              <div className="flex justify-between">
                <span>Distance</span>
                <span>{distanceKm || "--"} km</span>
              </div>

              <div className="flex justify-between">
                <span>ETA</span>
                <span>{etaMin || "--"} min</span>
              </div>

            </div>

            <div className="flex gap-3 mb-3">

              <a
                href={`tel:${customer?.phone}`}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-bold"
              >
                Call
              </a>

              <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold">
                Chat
              </button>

            </div>

            <button
              onClick={async () => {
                await instance.put(
                  `/api/servicerequest/${requestId}/update-status`,
                  { status: "CompletedByGarage" }
                );

                navigate("/servicecenter");
              }}
              className="w-full border border-red-300 text-red-500 py-3 rounded-xl font-bold"
            >
              Complete Request
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceLivetrack;