import React, { useState, useEffect } from "react";
import { MapPin, Zap } from "lucide-react";
import { Map } from "../../../HOC/Map";
import instance from "../../../../Server/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestHub } from "../../../../LiveHubs/UseRequestHub";

const Nearbymecf = () => {

  const { requestId: paramRequestId } = useParams();

// Fall back to localStorage
const requestId = paramRequestId || localStorage.getItem('activeRequestId');

  const navigate = useNavigate();

  const [apiResponse, setApiResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [accepted, setAccepted] = useState(false);

  //  FETCH DATA FROM BACKEND
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

  //  SIGNALR
  useRequestHub(requestId, {
    onStatusChange: (data) => {
      setStatus(data.requestStatus);

      if (data.requestStatus === "Accepted" || data.liveUpdateType === 1) {
        setAccepted(true);

        setTimeout(() => {
          navigate(`/userdashboard/livetracking/${requestId}`);
        }, 1500);
      }

        if (data.requestStatus === "Completed" || data.requestStatus === "Cancelled") {
      localStorage.removeItem('activeRequestId');
      navigate('/userdashboard');
    }
    
    },
  });

  const garages = apiResponse?.nearbyGarages || [];
  const mechanics = apiResponse?.nearbyMechanics || [];

  const handleHireNow = async (providerId, providerType) => {
    if (!requestId) return;

    try {
      await instance.put(
        `/api/servicerequest/${requestId}/assign`,
        {
          serviceProviderId: providerId,
          serviceProviderType: providerType,
        }
      );

      alert("Assigned successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to hire");
    }
  };
if (!requestId) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Active Request</h2>
        <p className="text-gray-500 mb-6">You haven't submitted a service request yet.</p>
        <button
          onClick={() => navigate('/userdashboard/requesthelp')}
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
      {requestInfo && (
        <div className="mb-6 bg-red-600 text-white p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                <Zap className="w-6 h-6 fill-white" />
                {requestInfo.problemType} EMERGENCY
              </h2>
              <p className="text-sm">
                Status: <span className="font-bold">{status}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-lg font-bold">Nearby Service Centers</h3>

          {garages.map((garage) => (
            <ServiceCard
              key={garage.id}
              data={garage}
              type="Garage"
              onHire={() => handleHireNow(garage.id, "Garage")}
            />
          ))}

          <h3 className="text-lg font-bold mt-6">Mechanics</h3>

          {mechanics.map((mech) => (
            <ServiceCard
              key={mech.id}
              data={mech}
              type="Mechanic"
              onHire={() => handleHireNow(mech.id, "Mechanic")}
            />
          ))}
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-6 bg-white p-2 rounded-2xl h-[600px]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ data, type, onHire }) => (
  <div className="bg-white p-6 rounded-2xl border">
    <div className="flex justify-between">
      <div className="flex gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${data.name}`}
          className="w-16 h-16 rounded-xl"
        />
        <div>
          <h3 className="font-bold">{data.name}</h3>
          <p className="text-sm flex gap-1">
            <MapPin className="w-3 h-3" />
            {data.address?.city}
          </p>
        </div>
      </div>

      <button
        onClick={onHire}
        className="bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Hire Now
      </button>
    </div>
  </div>
);

export default Nearbymecf;