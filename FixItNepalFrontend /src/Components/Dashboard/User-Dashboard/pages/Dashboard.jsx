import React from 'react'
import { Map } from '../../../HOC/Map'
import { FaTools } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import { IoIosLocate } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";








export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 w-fit">
      <h1 className='text-3xl font-bold '>Dashboard</h1>
      <div className='mb-4'>
      <span >Your moto rescue command center!</span>

      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* Left Stats */}
  <div className="col-span-2 grid grid-cols-2 gap-6">
    
    <div className="bg-white rounded-2xl p-6 shadow-sm  flex items-center justify-between">
      <div>
      <div className="text-3xl text-blue-700 bg-blue-300 w-fit p-3 rounded-2xl  "><FaTools className=''/></div>
        <div className="text-3xl font-bold text-zinc-600">2</div>
        <div className="text-sm text-zinc-500">Active Requests</div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm  flex items-center justify-between">
      <div>
      <div className="text-3xl bg-green-300 text-green-700 w-fit p-3 rounded-2xl"><FaCheckCircle /></div>
        <div className="text-3xl font-bold text-zinc-600">47</div>
        <div className="text-sm text-zinc-500">Total Services Used</div>
      </div>
    </div>

    {/* Map Section with Organized Controls */}
<div className="col-span-2 space-y-3">

  {/* Nearby Mechanics Card */}
  <div className="flex items-center justify-between bg-white shadow-md rounded-xl px-5 py-3">
    <div className="flex items-center gap-3">
      <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
      <span className="font-semibold text-zinc-700">12 Mechanics Nearby</span>
    </div>
    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-md text-sm">
      View List
    </button>
  </div>
  {/* Map Card */}
  <div className="relative h-[360px] rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 shadow-sm overflow-hidden">
    <div className="h-full w-full rounded-2xl overflow-hidden">
      <Map />
    </div>
  </div>

  {/* Bottom Controls Panel */}
  <div className="absolute flex  gap-110 py-3 rounded-2xl px-3 shadow-xl">

    {/* Your Location */}
    <div className="flex gap-3 ">
      <div className='bg-red-400 text-2xl text-white p-2 rounded-full h-fit '>
      <FaLocationDot />
         </div>
      <div className='flex flex-col'>
      <span className="text-sm font-bold text-zinc-700 "> Your Location</span>
      <span className="text-xs text-zinc-500">Thamel, Kathmandu</span>
      </div>
      
    </div>

    {/* Recenter Button */}
    <button 
      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md text-sm"
      onClick={() => {
        // Add recenter logic here
      }}
    >
      <IoIosLocate />Recenter
    </button>

  </div>



</div>
</div>
  {/* Right Panel */}
  <div className="bg-white rounded-2xl p-6 shadow-sm  flex flex-col gap-6">

    <div>
      <h3 className="font-bold text-xl mb-5">Quick Actions</h3>
      <button className="w-full flex gap-3 font-bold  bg-red-400 hover:bg-red-600 text-white py-4 rounded-xl font-semibold shadow px-3">
        <FaExclamationCircle  className='text-2xl'/>REQUEST EMERGENCY HELP
      </button>
    </div>

    <div>
      <label className="text-sm text-zinc-500">Problem Type</label>
      <select className="w-full mt-2 border rounded-lg px-5 py-2">
        <option>Select issue type</option>
        <option>Breakdown</option>
        <option>Accident</option>
        <option>Out Of fuel</option>
        <option>Battery Issue</option>
        <option>Puncture</option>
        
      </select>
      <button className="w-full mt-3 bg-zinc-800 text-white py-2 px-9 rounded-lg">
        CONFIRM REQUEST
      </button>
    </div>
    <div className='border border-zinc-500'></div>

    <div>
      <h4 className="font-semibold mb-3">Recent Activity</h4>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-green-500 bg-green-200 rounded-full p-2"><AiOutlineCheck /></span>
        <div >
          <div className="text-sm font-medium">Service completed</div>
          <div className="text-xs text-zinc-500">2 hours ago</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-yellow-500 bg-orange-200 rounded-full p-2"><FaRegClock /></span>
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
