import React from "react";
import {
  Camera,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  LogOut,
  Plus,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import instance from "../../../../Server/Axios";

/* ---------------- API ---------------- */
const fetchGarageProfile = async (id) => {
  const res = await instance.get(`/api/garage/${id}`);
  return res.data;
};

const GarageProfile = () => {
  const garageId = localStorage.getItem("userId");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["garage-profile", garageId],
    queryFn: () => fetchGarageProfile(garageId),
  });

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;

  if (isError || !data)
    return <div className="p-6 text-red-500">Failed to load profile</div>;

  const contacts = [{ name: "Emergency Contact", phone: data.phoneNumber }];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Garage Profile & Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your garage account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PROFILE CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <img
              src={
                data.logo?.accessUrl ||
                "https://images.unsplash.com/photo-1566492031773-4f4e44671857"
              }
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>

          {/* Username badge */}
          <span className="mt-1 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            @{data.userName}
          </span>

          {/* Contact */}
          <div className="text-gray-500 space-y-1 mt-3 text-sm text-center">
            <p className="flex items-center justify-center gap-1.5">
              <Mail className="w-4 h-4" /> {data.email}
            </p>
            <p className="flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4" /> {data.phoneNumber}
            </p>
          </div>

          {/* ADDRESS BLOCK (NEW VALUE ADD) */}
          <div className="mt-6 w-full bg-gray-50 rounded-xl p-4 text-left">
            <p className="text-xs font-bold text-gray-500 mb-2">LOCATION</p>

            <p className="text-sm font-semibold text-gray-900">
              {data.address?.tole}, {data.address?.city}
            </p>

            <p className="text-xs text-gray-500">
              {data.address?.province}, {data.address?.country}
            </p>
          </div>

          {/* SYSTEM INFO */}
          <div className="w-full mt-4 border-t border-gray-100 pt-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Garage ID</span>
              <span className="font-semibold text-gray-700">
                {data.id?.slice(0, 8)}...
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Username</span>
              <span className="font-semibold text-gray-700">
                {data.userName}
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {data.approvalStatus}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          {/* CONTACTS */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Emergency Contacts</h3>

            {contacts.map((c, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 mb-3"
              >
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone}</p>
                </div>
                <button className="text-red-500 text-sm font-semibold">
                  Edit
                </button>
              </div>
            ))}
          </div>

          {/* DOCUMENTS SECTION (NEW — ADDED ONLY) */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Documents</h3>

            {data.documents?.filter(Boolean)?.length ? (
              <div className="space-y-3">
                {data.documents.filter(Boolean).map((doc, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {doc?.originalFileName || "Unnamed Document"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc?.fileType || "File"}
                      </p>
                    </div>

                    {doc?.accessUrl ? (
                      <a
                        href={doc.accessUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-sm font-semibold hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No file</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No documents uploaded</p>
            )}
          </div>

          {/* SECURITY */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Security</h3>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50">
              <Lock className="w-5 h-5 text-gray-400" />
              Change Password
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              Two-Factor Auth
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageProfile;
