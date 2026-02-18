import React, { useState } from "react";
import {
  Search,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

// data based on the provided screenshot
const serviceHistoryData = [
  {
    id: 1,
    date: "Feb 10, 2024",
    time: "2:30 PM",
    issue: "Engine Breakdown",
    type: "Emergency service",
    mechanic: "Ramesh Thapa",
    rating: 4.8,
    location: "Thamel, Kathmandu",
    cost: "NPR 1,450",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=50",
  },
  {
    id: 2,
    date: "Feb 5, 2024",
    time: "11:15 AM",
    issue: "Flat Tire",
    type: "Standard service",
    mechanic: "Bikash Auto",
    rating: 4.9,
    location: "Baneshwor",
    cost: "NPR 650",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=50",
  },
  {
    id: 3,
    date: "Jan 28, 2024",
    time: "4:45 PM",
    issue: "Oil Change",
    type: "Maintenance",
    mechanic: "Suresh Moto",
    rating: 4.7,
    location: "Koteshwor",
    cost: "NPR 800",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=50",
  },
  {
    id: 4,
    date: "Jan 20, 2024",
    time: "9:20 AM",
    issue: "Battery Issue",
    type: "Emergency service",
    mechanic: "Rapid Rescue",
    rating: 4.8,
    location: "Pulchowk",
    cost: "NPR 1,200",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50",
  },
  {
    id: 5,
    date: "Jan 12, 2024",
    time: "3:00 PM",
    issue: "Accident Repair",
    type: "Cancelled by user",
    mechanic: "Not assigned",
    rating: null,
    location: "Kalimati",
    cost: "-",
    status: "Cancelled",
    image: null,
  },
];

const Servicehistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Service History</h1>
        <p className="text-gray-500 mt-1">
          View all your past services and requests
        </p>
      </div>

      {/* Action Bar: Search, Filter, Export */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
            <span>All Status</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
            <span>Last 30 days</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Issue</th>
                <th className="px-6 py-4">Mechanic</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {serviceHistoryData.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-5 text-gray-700">
                    <p className="font-medium text-gray-900">{service.date}</p>
                    <p className="text-xs text-gray-500">{service.time}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-medium text-gray-900">{service.issue}</p>
                    <p className="text-xs text-gray-500">{service.type}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.mechanic}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {service.mechanic}
                        </p>
                        {service.rating && (
                          <div className="flex items-center gap-1 text-xs text-yellow-600">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {service.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-600">
                    {service.location}
                  </td>
                  <td className="px-6 py-5 font-semibold text-gray-900">
                    {service.cost}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button className="text-red-500 font-semibold hover:text-red-600">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
          <span>Showing 1-5 of 47 services</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicehistory;
