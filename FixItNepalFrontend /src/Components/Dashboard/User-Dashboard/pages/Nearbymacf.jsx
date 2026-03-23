import React from "react";
import { useLocation } from "react-router-dom";
import { Search, MapPin, Star, Clock, Zap } from "lucide-react";
import { Map } from "../../../HOC/Map";

const Nearbymecf = () => {
  const location = useLocation();

  // 1. Get the full response object from navigation state
  const apiResponse = location.state?.activeRequest;

  // 2. Destructure
  const requestInfo = apiResponse?.request;
  const garages = apiResponse?.nearbyGarages || [];
  const mechanics = apiResponse?.nearbyMechanics || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* ACTIVE REQUEST HEADER */}
      {requestInfo && (
        <div className="mb-6 bg-red-600 text-white p-5 rounded-2xl shadow-lg animate-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                <Zap className="w-6 h-6 fill-white" />
                {requestInfo.problemType} EMERGENCY
              </h2>
              <p className="text-sm opacity-90">
                Status: <span className="font-bold">{requestInfo.status}</span>{" "}
                • ID: {requestInfo.id.slice(0, 8)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest font-bold opacity-70">
                Nearby Help Found
              </p>
              <p className="text-2xl font-black">
                {garages.length + mechanics.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* RENDER GARAGES */}
          <h3 className="text-lg font-bold text-gray-700 px-2">
            Nearby Service Centers
          </h3>
          {garages.length > 0 ? (
            garages.map((garage) => (
              <ServiceCard key={garage.id} data={garage} type="Garage" />
            ))
          ) : (
            <p className="text-gray-400 italic px-2">
              No garages found in this area.
            </p>
          )}

          {/* MECHANICS */}
          <h3 className="text-lg font-bold text-gray-700 px-2 mt-8">
            {" "}
            Mechanics
          </h3>
          {mechanics.length > 0 ? (
            mechanics.map((mech) => (
              <ServiceCard key={mech.id} data={mech} type="Mechanic" />
            ))
          ) : (
            <p className="text-gray-400 italic px-2">
              No independent mechanics nearby.
            </p>
          )}
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-[600px]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Sub-component to keep code clean
const ServiceCard = ({ data, type }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-[1.01]">
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        {/* Use the accessUrl from the API logo object */}
        <img
          src={
            data.logo?.accessUrl ||
            "https://ui-avatars.com/api/?name=" + data.name
          }
          className="w-16 h-16 rounded-xl object-cover border border-gray-100"
          alt={data.name}
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">
              {type}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {data.address.city},{" "}
            {data.address.tole}
          </p>
        </div>
      </div>
      <button className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 shadow-md shadow-red-100 transition-all">
        Hire Now
      </button>
    </div>
  </div>
);

export default Nearbymecf;
