import React, { useState, useEffect } from "react";
import { MapPin, Zap } from "lucide-react";
import instance from "../../../../Server/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestHub } from "../../../../LiveHubs/UseRequestHub";
import { NearbyMap } from "../../../HOC/NearbyMap"; // ✅ ONLY CHANGE

const Nearbymecf = () => {
  const { requestId: paramRequestId } = useParams();
  const requestId = paramRequestId || localStorage.getItem("activeRequestId");

  const navigate = useNavigate();

  const [apiResponse, setApiResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loadingAssign, setLoadingAssign] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const fetchNearby = async () => {
      if (!requestId) return;

      try {
        const res = await instance.get(
          `/api/servicerequest/${requestId}/nearby-service-provider`
        );

        setApiResponse(res.data);
        setStatus(res.data?.request?.status);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNearby();
  }, [requestId]);

  const requestInfo = apiResponse?.request;

  // ✅ NORMALIZED DATA FOR MAP (IMPORTANT)
  const garages =
    apiResponse?.nearbyGarages?.map((g) => ({
      id: g.id,
      name: g.name,
      city: g.address?.city,
      latitude: g.address?.locationCoordinatePoint?.latitude,
      longitude: g.address?.locationCoordinatePoint?.longitude,
    })) || [];

  const mechanics =
    apiResponse?.nearbyMechanics?.map((m) => ({
      id: m.id,
      name: m.name,
      city: m.address?.city,
      latitude: m.address?.locationCoordinatePoint?.latitude,
      longitude: m.address?.locationCoordinatePoint?.longitude,
    })) || [];

  // SIGNALR
  useRequestHub(requestId, {
    onStatusChange: (data) => {
      setStatus(data.requestStatus);

      if (data.requestStatus === "Accepted" || data.liveUpdateType === 1) {
        setAccepted(true);

        setTimeout(() => {
          navigate(`/userdashboard/livetracking/${requestId}`);
        }, 1500);
      }

      if (
        data.requestStatus === "Completed" ||
        data.requestStatus === "Cancelled"
      ) {
        localStorage.removeItem("activeRequestId");
        navigate("/userdashboard");
      }
    },
  });

  // HIRE HANDLER
  const handleHireNow = async (providerId, providerType, providerData) => {
    if (!requestId) return;

    setSelectedProvider({
      id: providerId,
      type: providerType,
      ...providerData,
    });

    setLoadingAssign(true);

    try {
      await instance.put(`/api/servicerequest/${requestId}/assign`, {
        serviceProviderId: providerId,
        serviceProviderType: providerType,
      });

      alert("Assigned successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to hire");
    } finally {
      setLoadingAssign(false);
    }
  };

  // NO REQUEST STATE
  if (!requestId) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold mb-2">No Active Request</h2>
          <p className="text-gray-500 mb-6">
            You haven't submitted a service request yet.
          </p>
          <button
            onClick={() => navigate("/userdashboard/requesthelp")}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
          >
            Request Help Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      {requestInfo && (
        <div className="mb-6 bg-red-600 text-white p-5 rounded-2xl shadow-lg">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Zap className="w-6 h-6" />
            {requestInfo.problemType} EMERGENCY
          </h2>
          <p className="text-sm">
            Status: <span className="font-bold">{status}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LIST */}
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-lg font-bold">Nearby Service Centers</h3>

          {apiResponse?.nearbyGarages?.map((garage) => (
            <ServiceCard
              key={garage.id}
              data={garage}
              type="Garage"
              selected={selectedProvider?.id === garage.id}
              loading={loadingAssign}
              onHire={() =>
                handleHireNow(garage.id, "Garage", garage)
              }
            />
          ))}

          <h3 className="text-lg font-bold mt-6">Mechanics</h3>

          {apiResponse?.nearbyMechanics?.map((mech) => (
            <ServiceCard
              key={mech.id}
              data={mech}
              type="Mechanic"
              selected={selectedProvider?.id === mech.id}
              loading={loadingAssign}
              onHire={() =>
                handleHireNow(mech.id, "Mechanic", mech)
              }
            />
          ))}
        </div>

        {/* MAP (INJECTED HERE) */}
        <div className="xl:col-span-1">
          <div className="sticky top-6 bg-white p-2 rounded-2xl h-[600px]">
            <NearbyMap
              garages={garages}
              mechanics={mechanics}
              selectedProvider={selectedProvider}
              onSelectProvider={setSelectedProvider}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SERVICE CARD ================= */

const ServiceCard = ({ data, type, onHire, selected, loading }) => (
  <div
    className={`bg-white p-6 rounded-2xl border transition-all duration-200 ${
      selected ? "border-red-500 shadow-lg scale-[1.01]" : "border-gray-200"
    }`}
  >
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${data.name}`}
          className="w-16 h-16 rounded-xl"
        />
        <div>
          <h3 className="font-bold">{data.name}</h3>
          <p className="text-sm flex items-center gap-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            {data.address?.city}
          </p>
          <p className="text-xs text-gray-400">{type}</p>
        </div>
      </div>

      <button
        onClick={onHire}
        disabled={loading}
        className={`px-4 py-2 rounded-xl text-white transition ${
          loading
            ? "bg-gray-400"
            : selected
            ? "bg-green-600"
            : "bg-red-500"
        }`}
      >
        {loading ? "Assigning..." : selected ? "Selected" : "Hire Now"}
      </button>
    </div>
  </div>
);

export default Nearbymecf;