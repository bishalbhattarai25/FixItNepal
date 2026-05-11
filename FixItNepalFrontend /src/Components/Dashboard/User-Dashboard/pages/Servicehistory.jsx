import React, { useMemo, useState } from "react";
import { Search, Download, ChevronDown, Loader2 } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import instance from "../../../../Server/Axios";

const statusOptions = [
  "All",
  "Pending",
  "Assigned",
  "Accepted",
  "Rejected",
  "InProgress",
  "Completed",
  "Cancelled",
];
const requestTypeOptions = ["All", "Emergency", "Scheduled"];

const pageSize = 10;

const Servicehistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [page, setPage] = useState(1);
const [selectedRequestType, setSelectedRequestType] = useState("All");


  // API CALL WITH TANSTACK QUERY
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["service-history", page, selectedStatus, selectedRequestType],

    queryFn: async () => {
      const params = {
        SkipCount: (page - 1) * pageSize,
        MaxCount: pageSize,
      };

      if (selectedStatus !== "All") {
        params.Status = selectedStatus;
      }

      if (selectedRequestType !== "All") {
        params.RequestType = selectedRequestType;
      }

      const response = await instance.get("/api/servicerequest", {
        params,
      });

      return response.data;
    },

    keepPreviousData: true,
  });

  const services = data?.items || [];
  const totalCount = data?.totalCount || 0;

  // SEARCH FILTER
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const search = searchTerm.toLowerCase();

      return (
        service.problemType?.toLowerCase().includes(search) ||
        service.problemDescription?.toLowerCase().includes(search) ||
        service.vehicleModel?.toLowerCase().includes(search) ||
        service.requestType?.toLowerCase().includes(search) ||
        service.status?.toLowerCase().includes(search)
      );
    });
  }, [services, searchTerm]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700";

      case "Pending":
        return "bg-yellow-50 text-yellow-700";

      case "Cancelled":
      case "Rejected":
        return "bg-red-50 text-red-700";

      case "InProgress":
        return "bg-blue-50 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Service History</h1>

        <p className="text-gray-500 mt-1">
          View all your past services and requests
        </p>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
        {/* Search */}
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

        {/* REQUEST TYPE FILTER */}
        <div className="relative">
          <select
            value={selectedRequestType}
            onChange={(e) => {
              setSelectedRequestType(e.target.value);
              setPage(1);
            }}
            className="appearance-none px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-gray-700 bg-white outline-none focus:ring-2 focus:ring-red-200"
          >
            {requestTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* STATUS FILTER */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="appearance-none px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-gray-700 bg-white outline-none focus:ring-2 focus:ring-red-200"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* EXPORT BUTTON */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Date</th>

                <th className="px-6 py-4">Problem</th>

                <th className="px-6 py-4">Vehicle</th>

                <th className="px-6 py-4">Request Type</th>

                <th className="px-6 py-4">Budget</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4">Provider Type</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading services...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-red-500">
                    Failed to load service history
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No service history found
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition">
                    {/* DATE */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {formatDate(service.creationTime)}
                      </p>

                      <p className="text-xs text-gray-500">
                        {formatTime(service.creationTime)}
                      </p>
                    </td>

                    {/* PROBLEM */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {service.problemType}
                      </p>

                      <p className="text-xs text-gray-500 line-clamp-1">
                        {service.problemDescription || "-"}
                      </p>
                    </td>

                    {/* VEHICLE */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {service.vehicleType}
                      </p>

                      <p className="text-xs text-gray-500">
                        {service.vehicleModel || "-"}
                      </p>
                    </td>

                    {/* REQUEST TYPE */}
                    <td className="px-6 py-5 text-gray-700">
                      {service.requestType}
                    </td>

                    {/* BUDGET */}
                    <td className="px-6 py-5 font-semibold text-gray-900">
                      NPR {service.estimatedBudget || 0}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          service.status,
                        )}`}
                      >
                        {service.status}
                      </span>
                    </td>

                    {/* PROVIDER TYPE */}
                    <td className="px-6 py-5 text-gray-700">
                      {service.serviceProviderType || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {(page - 1) * pageSize + 1} -{" "}
            {Math.min(page * pageSize, totalCount)} of {totalCount} services
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>

            <button className="px-3 py-1 bg-red-500 text-white rounded-lg">
              {page}
            </button>

            <button
              disabled={page * pageSize >= totalCount}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicehistory;
