import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTools,
  FaMotorcycle,
} from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";

import { FaRegClock } from "react-icons/fa6";

import { IoIosLocate } from "react-icons/io";

import { AiOutlineCheck } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import {
  MdEmergency,
} from "react-icons/md";

import {
  useQuery,
} from "@tanstack/react-query";

import instance from "../../../../Server/Axios";


export const Dashboard = () => {

  const navigate = useNavigate();
  const [location, setLocation] = useState({
  latitude: 27.7172,
  longitude: 85.324,
});

  /* ================= USER LOCATION ================= */
  useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      setLocation({ latitude, longitude });

      // optional: persist
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
    },
    (error) => {
      console.error("Location error:", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
}, []);

  /* ================= FETCH NEARBY SERVICES ================= */

  const {
    data: nearbyData,
    isLoading,
  } = useQuery({
    queryKey: [
      "nearby-services",
      location.latitude,
      location.longitude,
    ],

    queryFn: async () => {
      const response = await instance.post(
        "/nearby-services?radiusInKm=50",
        {
           latitude: location.latitude,
      longitude: location.longitude,
        }
      );

      return response.data;
    },
  });

  const garages =
    nearbyData?.nearbyGarages || [];

  const mechanics =
    nearbyData?.nearbyMechanics || [];

    const normalizedGarages = garages.map((g) => ({
  id: g.id,
  name: g.name,
  latitude: g?.address?.locationCoordinatePoint?.latitude,
  longitude: g?.address?.locationCoordinatePoint?.longitude,
}));
const normalizedMechanics = mechanics.map((m) => ({
  id: m.id,
  name: m.name,
  latitude: m?.address?.locationCoordinatePoint?.latitude,
  longitude: m?.address?.locationCoordinatePoint?.longitude,
}));

  /* ================= STATS ================= */

  const stats = [
    {
      title: "Active Requests",
      value: "2",
      icon: <FaTools />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    {
      title: "Completed Services",
      value: "47",
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-600",
    },

    {
      title: "Saved Vehicles",
      value: "3",
      icon: <FaMotorcycle />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Nearby Providers",
      value:
        garages.length + mechanics.length,
      icon: <FaLocationDot />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  const activities = [
    {
      title: "Service completed",
      time: "2 hours ago",
      icon: <AiOutlineCheck />,
      bg: "bg-green-100",
      text: "text-green-600",
    },

    {
      title: "Emergency request accepted",
      time: "Yesterday",
      icon: <MdEmergency />,
      bg: "bg-red-100",
      text: "text-red-600",
    },

    {
      title: "Maintenance due",
      time: "In 5 days",
      icon: <FaRegClock />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back! Here's your rescue
            overview.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/userdashboard/requesthelp"
            )
          }
          className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
        >
          Request Service
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.bg} ${item.text}`}
            >
              {item.icon}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-5">
              {item.value}
            </h2>

            <p className="text-gray-500 mt-1">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Fast access to your most used
              actions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* EMERGENCY */}
              <button
                onClick={() =>
                  navigate(
                    "/userdashboard/requesthelp"
                  )
                }
                className="bg-red-500 hover:bg-red-600 text-white rounded-2xl p-5 text-left transition shadow-lg"
              >
                <div className="text-3xl mb-4">
                  <FaExclamationCircle />
                </div>

                <h3 className="font-bold text-lg">
                  Emergency Help
                </h3>

                <p className="text-sm text-red-100 mt-1">
                  Request urgent roadside
                  assistance
                </p>
              </button>

              {/* SCHEDULE */}
              <button
                onClick={() =>
                  navigate(
                    "/userdashboard/maintence"
                  )
                }
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-5 text-left transition shadow-lg"
              >
                <div className="text-3xl mb-4">
                  <FaRegClock />
                </div>

                <h3 className="font-bold text-lg">
                  Schedule Service
                </h3>

                <p className="text-sm text-blue-100 mt-1">
                  Book future maintenance
                  service
                </p>
              </button>

              {/* VEHICLES */}
              <button
                onClick={() =>
                  navigate(
                    "/userdashboard/profile"
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 text-left transition shadow-lg"
              >
                <div className="text-3xl mb-4">
                  <FaMotorcycle />
                </div>

                <h3 className="font-bold text-lg">
                  My Vehicles
                </h3>

                <p className="text-sm text-green-100 mt-1">
                  Manage your registered
                  vehicles
                </p>
              </button>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Nearby Services
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Garages and mechanics around
                  your location
                </p>
              </div>

              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

                {garages.length +
                  mechanics.length}{" "}
                Available
              </div>
            </div>

            {/* MAP */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden">
              <NearbyMap
                garages={normalizedGarages}
                mechanics={normalizedMechanics}
                selectedProvider={null}
                onSelectProvider={() => {}}
              />

              {/* LOCATION CARD */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center justify-between z-[1000]">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500 text-white p-3 rounded-2xl text-xl">
                    <FaLocationDot />
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">
                      Your Location
                    </h4>

                    <p className="text-sm text-gray-500">
                      Latitude:{" "}
                      {location.latitude.toFixed(4)}
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  <IoIosLocate />
                  Recenter
                </button>
              </div>
            </div>

            {/* LOADING */}
            {isLoading && (
              <div className="mt-4 text-sm text-gray-500">
                Loading nearby services...
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-6">
          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>

              <button className="text-sm text-red-500 font-medium hover:text-red-600">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {activities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div
                    className={`p-3 rounded-2xl ${item.bg} ${item.text}`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAFETY TIPS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Safety Tips
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <h4 className="font-semibold text-blue-700">
                  Keep Emergency Contacts
                  Updated
                </h4>

                <p className="text-sm text-blue-600 mt-1">
                  Make sure your emergency
                  contacts are current.
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <h4 className="font-semibold text-green-700">
                  Regular Maintenance
                </h4>

                <p className="text-sm text-green-600 mt-1">
                  Schedule timely servicing to
                  avoid breakdowns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};