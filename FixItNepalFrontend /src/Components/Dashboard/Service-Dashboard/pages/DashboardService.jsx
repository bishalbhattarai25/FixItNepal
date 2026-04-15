import React from "react";
import { Map } from "../../../HOC/Map";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoIosLocate } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";

export const Dashboard = () => {
  return (
    <div className="w-full px-6 pt-2 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-500">Your moto rescue command center</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl text-blue-700 bg-blue-200 w-fit p-3 rounded-2xl">
            <FaTools />
          </div>
          <div className="text-3xl font-bold text-zinc-600 mt-2">2</div>
          <div className="text-sm text-zinc-500">Active Requests</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl text-green-700 bg-green-200 w-fit p-3 rounded-2xl">
            <FaCheckCircle />
          </div>
          <div className="text-3xl font-bold text-zinc-600 mt-2">47</div>
          <div className="text-sm text-zinc-500">Total Services Used</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl text-red-700 bg-red-200 w-fit p-3 rounded-2xl">
            <FaExclamationCircle />
          </div>
          <div className="text-3xl font-bold text-zinc-600 mt-2">Emergency</div>
          <div className="text-sm text-zinc-500">Fast Response</div>
        </div>

      </div>

      {/* MAIN GRID (FIXED ALIGNMENT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">

          {/* NEARBY BAR */}
          <div className="flex items-center justify-between bg-white shadow-sm rounded-xl px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
              <span className="font-semibold text-zinc-700">
                12 Mechanics Nearby
              </span>
            </div>

            <button className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm">
              View List
            </button>
          </div>

          {/* MAP (FIXED - NO OVERLAP) */}
          <div className="h-[360px] rounded-2xl overflow-hidden shadow-sm relative bg-white">

            {/* MAP LAYER */}
            <div className="w-full h-full">
              <Map />
            </div>

            {/* OVERLAY (SAFE POSITIONED) */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">

              <div className="flex items-center gap-3">
                <div className="bg-red-500 text-white p-2 rounded-full">
                  <FaLocationDot />
                </div>

                <div>
                  <p className="text-sm font-bold">Your Location</p>
                  <p className="text-xs text-zinc-500">Thamel, Kathmandu</p>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                <IoIosLocate />
                Recenter
              </button>

            </div>
          </div>

        </div>

        {/* RIGHT PANEL (FIXED HEIGHT ALIGNMENT) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 h-[520px]">

          {/* QUICK ACTION */}
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Actions</h3>

            <button className="w-full bg-red-500 text-white py-4 rounded-xl font-bold">
              REQUEST EMERGENCY HELP
            </button>
          </div>

          {/* FORM */}
          <div>
            <label className="text-sm text-zinc-500">Problem Type</label>

            <select className="w-full mt-2 border rounded-lg px-4 py-2">
              <option>Breakdown</option>
              <option>Accident</option>
              <option>Out of fuel</option>
              <option>Battery Issue</option>
              <option>Puncture</option>
            </select>

            <button className="w-full mt-3 bg-zinc-800 text-white py-2 rounded-lg">
              CONFIRM REQUEST
            </button>
          </div>

          <div className="border" />

          {/* ACTIVITY */}
          <div>
            <h4 className="font-semibold mb-3">Recent Activity</h4>

            <div className="flex items-center gap-3 mb-3">
              <AiOutlineCheck className="text-green-500" />
              <div>
                <p className="text-sm">Service completed</p>
                <p className="text-xs text-zinc-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaRegClock className="text-yellow-500" />
              <div>
                <p className="text-sm">Maintenance due</p>
                <p className="text-xs text-zinc-500">In 5 days</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;