import React from 'react'
import { Map } from '../../../HOC/Map'
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { AiOutlineCheck } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import { IoIosLocate } from "react-icons/io";

export const Dashboard = () => {
  return (
    <div className="w-full px-6 pt-2">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mb-4 text-zinc-500">
        Your moto rescue command center!
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="col-span-2 grid grid-cols-2 gap-6">

          {/* CARD 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-3xl text-blue-700 bg-blue-300 w-fit p-3 rounded-2xl">
                <FaTools />
              </div>
              <div className="text-3xl font-bold text-zinc-600 mt-2">2</div>
              <div className="text-sm text-zinc-500">Active Requests</div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-3xl bg-green-300 text-green-700 w-fit p-3 rounded-2xl">
                <FaCheckCircle />
              </div>
              <div className="text-3xl font-bold text-zinc-600 mt-2">47</div>
              <div className="text-sm text-zinc-500">Total Services Used</div>
            </div>
          </div>

          {/* MAP + NEARBY */}
          <div className="col-span-2 space-y-3">

            {/* NEARBY BAR */}
            <div className="flex items-center justify-between bg-white shadow-md rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
                <span className="font-semibold text-zinc-700">
                  12 Mechanics Nearby
                </span>
              </div>

              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm">
                View List
              </button>
            </div>

            {/* MAP */}
            <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-sm">

              {/* MAP LAYER */}
              <div className="absolute inset-0 z-0">
                <Map />
              </div>

              {/* LOCATION OVERLAY */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 text-white p-2 rounded-full">
                    <FaLocationDot />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-700">
                      Your Location
                    </span>
                    <span className="text-xs text-zinc-500">
                      Thamel, Kathmandu
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  <IoIosLocate />
                  Recenter
                </button>

              </div>

            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6">

          {/* QUICK ACTION */}
          <div>
            <h3 className="font-bold text-xl mb-5">Quick Actions</h3>

            <button className="w-full flex items-center gap-3 font-bold bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl shadow">
              <FaExclamationCircle className="text-2xl" />
              REQUEST EMERGENCY HELP
            </button>
          </div>

          {/* FORM */}
          <div>
            <label className="text-sm text-zinc-500">Problem Type</label>

            <select className="w-full mt-2 border rounded-lg px-4 py-2">
              <option>Select issue type</option>
              <option>Breakdown</option>
              <option>Accident</option>
              <option>Out Of fuel</option>
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

            <div className="flex items-center gap-3 mb-4">
              <span className="text-green-500 bg-green-200 p-2 rounded-full">
                <AiOutlineCheck />
              </span>
              <div>
                <div className="text-sm font-medium">Service completed</div>
                <div className="text-xs text-zinc-500">2 hours ago</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-500 bg-orange-200 p-2 rounded-full">
                <FaRegClock />
              </span>
              <div>
                <div className="text-sm font-medium">Maintenance due</div>
                <div className="text-xs text-zinc-500">In 5 days</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}