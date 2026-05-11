import React, { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  LogOut,
  Plus,
  Loader2,
  Car,
} from "lucide-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import instance from "../../../../Server/Axios";

const Profile = () => {
  const queryClient = useQueryClient();

  const handleLogout = () => {
  // CLEAR STORAGE
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");

  // REDIRECT
  window.location.href = "/login";
};

  // CUSTOMER ID
  const customerId = localStorage.getItem("userId");

  // VEHICLE FORM
  const [vehicleForm, setVehicleForm] = useState({
    vehicleType: "TwoWheeler",
    vehicleModel: "",
    brand: "",
    vehicleRegistrationNumber: "",
    fuelType: "Petrol",
  });

  // FETCH CUSTOMER PROFILE
  const {
    data: customer,
    isLoading: customerLoading,
    error: customerError,
  } = useQuery({
    queryKey: ["customer-profile", customerId],

    queryFn: async () => {
      const response = await instance.get(
        `/api/customer/${customerId}`
      );

      return response.data;
    },

    enabled: !!customerId,
  });

  // FETCH VEHICLES
  const {
    data: vehiclesData,
    isLoading: vehicleLoading,
  } = useQuery({
    queryKey: ["vehicles", customerId],

    queryFn: async () => {
      const response = await instance.get(
        "/api/vehicle",
        {
          params: {
            CustomerId: customerId,
            SkipCount: 0,
            MaxCount: 20,
          },
        }
      );

      return response.data;
    },

    enabled: !!customerId,
  });

  const vehicles = vehiclesData?.items || [];

  // CREATE VEHICLE
  const createVehicleMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await instance.post(
        "/api/vehicle",
        payload
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles", customerId],
      });

      setVehicleForm({
        vehicleType: "TwoWheeler",
        vehicleModel: "",
        brand: "",
        vehicleRegistrationNumber: "",
        fuelType: "Petrol",
      });
    },

    onError: (error) => {
      console.error(error);
      alert("Failed to add vehicle");
    },
  });

  const handleCreateVehicle = () => {
    createVehicleMutation.mutate({
      customerId,
      ...vehicleForm,
    });
  };

  // LOADING
  if (customerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading profile...
        </div>
      </div>
    );
  }

  // ERROR
  if (customerError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">
          Failed to load profile
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Profile & Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your account and vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PROFILE CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src="https://ui-avatars.com/api/?name=Customer&background=ef4444&color=fff"
              alt="Customer"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <button className="absolute bottom-0 right-0 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {customer?.name || "N/A"}
          </h2>

          <div className="text-gray-500 space-y-1 mt-3 text-sm">
            <p className="flex items-center justify-center gap-1.5">
              <Mail className="w-4 h-4" />
              No email available
            </p>

            <p className="flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4" />
              {customer?.phoneNumber || "N/A"}
            </p>
          </div>

          <div className="w-full mt-8 border-t border-gray-100 pt-6 space-y-4 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                Customer ID
              </span>

              <span className="font-semibold text-gray-900 text-xs">
                {customer?.id?.slice(0, 8)}...
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                Total Vehicles
              </span>

              <span className="font-semibold text-gray-900">
                {vehicles.length}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                Account status
              </span>

              <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* ADD VEHICLE */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Add Vehicle
          </h3>

          <div className="space-y-4">
            {/* VEHICLE TYPE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>

              <select
                value={vehicleForm.vehicleType}
                onChange={(e) =>
                  setVehicleForm({
                    ...vehicleForm,
                    vehicleType: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="TwoWheeler">
                  Two Wheeler
                </option>

                <option value="FourWheeler">
                  Four Wheeler
                </option>
              </select>
            </div>

            {/* MODEL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Model
              </label>

              <input
                type="text"
                value={vehicleForm.vehicleModel}
                onChange={(e) =>
                  setVehicleForm({
                    ...vehicleForm,
                    vehicleModel: e.target.value,
                  })
                }
                placeholder="Enter vehicle model"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            {/* BRAND */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>

              <input
                type="text"
                value={vehicleForm.brand}
                onChange={(e) =>
                  setVehicleForm({
                    ...vehicleForm,
                    brand: e.target.value,
                  })
                }
                placeholder="Enter brand"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            {/* REGISTRATION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>

              <input
                type="text"
                value={
                  vehicleForm.vehicleRegistrationNumber
                }
                onChange={(e) =>
                  setVehicleForm({
                    ...vehicleForm,
                    vehicleRegistrationNumber:
                      e.target.value,
                  })
                }
                placeholder="Enter registration number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            {/* FUEL TYPE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>

              <select
                value={vehicleForm.fuelType}
                onChange={(e) =>
                  setVehicleForm({
                    ...vehicleForm,
                    fuelType: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="Petrol">
                  Petrol
                </option>

                <option value="Diesel">
                  Diesel
                </option>

                <option value="Electric">
                  Electric
                </option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCreateVehicle}
            disabled={
              createVehicleMutation.isPending
            }
            className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {createVehicleMutation.isPending
              ? "Adding Vehicle..."
              : "Add Vehicle"}
          </button>
        </div>

        {/* VEHICLE LIST + SECURITY */}
        <div className="flex flex-col gap-6">
          {/* VEHICLE LIST */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                My Vehicles
              </h3>

              <Car className="w-5 h-5 text-red-500" />
            </div>

            <div className="space-y-4">
              {vehicleLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                </div>
              ) : vehicles.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No vehicles added
                </div>
              ) : (
                vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {vehicle.brand}{" "}
                          {vehicle.vehicleModel}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          {
                            vehicle.vehicleRegistrationNumber
                          }
                        </p>
                      </div>

                      <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
                        {vehicle.vehicleType}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        Fuel:
                      </span>

                      <span className="font-medium text-gray-800">
                        {vehicle.fuelType}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Security
            </h3>

            <div className="space-y-3">
                <button
                            disabled
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                          >
                            <Lock className="w-5 h-5 text-gray-400" />
                            Change Password
                          </button>
              
                          <button
                            disabled
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                          >
                            <ShieldCheck className="w-5 h-5 text-gray-400" />
                            Two-Factor Auth
                          </button>

              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl text-red-600 bg-red-50 hover:bg-red-100">
                <LogOut className="w-5 h-5" />

                <span className="font-medium">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;