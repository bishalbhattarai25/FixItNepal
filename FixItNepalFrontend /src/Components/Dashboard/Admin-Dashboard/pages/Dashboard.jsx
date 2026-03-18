import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import { stateCard } from "../HOC/Dashdata";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <div className="h-5 w-5 text-gray-400" ><CiSearch /></div>
            </span>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 text-gray-500 cursor-pointer" ><CiSettings /></div>

            <div className="w-5 h-5 text-gray-500 cursor-pointer" ><FaBell /></div>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right">
                <p className="text-sm font-bold">Shelly</p>
                <p className="text-xs text-gray-500">Pharmacist</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">DASHBOARD</h2>
              <p className="text-gray-500">Welcome to your dashboard</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <div className="w-4 h-4" ><FaDownload /></div>

              DOWNLOAD REPORTS
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stateCard.map((data, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {data.title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {data.value}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="w-5 h-5 text-blue-600">{data.icon} </div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-green-500 font-semibold">
                    {data.increase}
                  </span>
                  <span className="text-gray-400 ml-2">Since last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tables and Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Recent Transactions</h3>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">User ID</th>
                    <th className="px-6 py-3">Created At</th>
                    <th className="px-6 py-3"># Products</th>
                    <th className="px-6 py-3">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-blue-600 font-medium">
                        63701d74...
                      </td>
                      <td className="px-6 py-4">2026-03-18</td>
                      <td className="px-6 py-4">3</td>
                      <td className="px-6 py-4 font-bold text-gray-700">
                        $1,530.11
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-6">
                Sales By Category
              </h3>
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-lg">
                {/* Replace with a Charting Library like Recharts or Chart.js */}
                <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-700">$65k</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>{" "}
                    Shoes
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>{" "}
                    Clothing
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>{" "}
                    Accessories
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
