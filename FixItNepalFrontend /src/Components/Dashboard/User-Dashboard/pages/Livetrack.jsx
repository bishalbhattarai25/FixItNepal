import React, {useState, useEffect} from 'react';
import { Phone, MessageSquare, X, Headset, Star } from 'lucide-react';
import { Map } from '../../../HOC/Map';
import { useLocation } from 'react-router-dom';
import instance from "../../../../Server/Axios";
import LiveTrackMap from '../../../HOC/LiveTrackMap';
import { useRequestHub } from '../../../../LiveHubs/UseRequestHub';
import { useSmoothMarker } from '../../../../MapHelper/SmoothMarker';
import { getDistanceKm } from '../../../../MapHelper/DistanceHelper';
import { getEtaMinutes, getEtaText } from '../../../../MapHelper/EstimationTimeHelper';

const Livetrack = () => {
  const location = useLocation();

  const [request, setRequest] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);

  var requestId = location.state?.requestId;

  // ---------------- FETCH REQUEST ----------------
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
      }
    };

    fetchRequest();
  }, [requestId]);

  // ---------------- SMOOTH MARKER ----------------
  const smoothMove = useSmoothMarker();

  const connectionRef = useRequestHub(requestId, {
    onStatusChange: (data) => {
      console.log("STATUS:", data);
    },

    onLocationUpdate: (data) => {
      console.log("MECHANIC MOVE:", data);

      smoothMove(setMechanicLocation, [
        data.latitude,
        data.longitude
      ]);
    }
  });

  // ---------------- USER LOCATION ----------------
  useEffect(() => {
    if (!request?.locationCoordinates) return;

    const { latitude, longitude } = request.locationCoordinates;

    if (latitude !== 0 && longitude !== 0) {
      setUserLocation([latitude, longitude]);
    }
  }, [request]);

  // ---------------- PROVIDER FETCH ----------------
  useEffect(() => {
    const fetchProvider = async () => {
      if (!request?.serviceProviderId) return;

      try {
        let res;

        if (request.serviceProviderType === "Garage") {
          res = await instance.get(
            `/api/garage/${request.serviceProviderId}`
          );
        } else {
          res = await instance.get(
            `/api/mechanic/${request.serviceProviderId}`
          );
        }

        setProvider(res.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProvider();
  }, [request]);

  const distanceKm = getDistanceKm(userLocation, mechanicLocation);

const etaMin = getEtaMinutes(distanceKm);

const statusText = getEtaText(etaMin);

  // ---------------- LOADING ----------------
  if (!requestId) {
    return (
      <div className="p-10 text-center text-gray-500">
        No active tracking request
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
        <p className="text-gray-500">
          Track your mechanic's location in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAIN MAP */}
        <div className="lg:col-span-2 relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">

          {/* STATUS BADGE */}
          <div className="absolute top-6 left-6 z-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 min-w-[200px]">

            <div className="flex justify-between items-center mb-2">
              <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded">
                EN ROUTE
              </span>
              <span className="text-gray-400 text-xs">
                Request #M2847
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {distanceKm
                    ? `${distanceKm} km away`
                    : "Calculating distance..."}
                </p>

                <p className="text-xs text-gray-500">
                  {statusText}
                </p>
              </div>
            </div>

          </div>

          {/* MAP */}
          <LiveTrackMap
            userLocation={userLocation}
            mechanicLocation={mechanicLocation}
            role="ServiceProvider"
          />
        </div>

        {/* SIDEBAR */}
        <div className="flex flex-col gap-6">

          {/* PROVIDER CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

            <div className="flex items-center gap-4 mb-6">

              {provider?.logo?.accessUrl ? (
                <img
                  src={provider.logo.accessUrl}
                  alt="Logo"
                  className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  {provider?.name?.substring(0, 2).toUpperCase()}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {provider?.name || "Loading..."}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-800">4.8</span>
                  <span className="text-gray-400">(142 reviews)</span>
                </div>
              </div>

            </div>

            {/* STATS */}
            <div className="space-y-3 mb-6">

              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 text-sm">Distance</span>
                <span className="font-bold text-gray-900">
                  {distanceKm ? `${distanceKm} km` : "--"}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 text-sm">ETA</span>
                <span className="font-bold text-blue-600">
                  {etaMin ? `${etaMin} min` : "--"}
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mb-3">

              <a
                href={`tel:${provider?.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>

              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold">
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>

            </div>

            <button className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50">
              <X className="w-4 h-4" />
              Cancel Request
            </button>

          </div>

          {/* SUPPORT */}
          <div className="bg-red-500 p-6 rounded-2xl text-white">

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Headset className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Need Help?</h3>
            </div>

            <p className="text-sm text-red-50 opacity-90 mb-4">
              Our support team is available 24/7
            </p>

            <button className="w-full bg-white text-red-500 py-3 rounded-xl font-bold hover:bg-gray-50">
              Contact Support
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Livetrack;