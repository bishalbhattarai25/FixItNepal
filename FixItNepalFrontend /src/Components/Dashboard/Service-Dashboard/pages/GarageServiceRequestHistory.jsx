import React, { useState, useMemo } from "react";
import { Search, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../../Server/Axios";

/* ---------------- API ---------------- */
const fetchRequestHistory = async ({
  id,
  status,
  requestType,
  date,
  skipCount,
  maxCount,
}) => {
  // Build params dynamically
  const params = {
    SkipCount: skipCount,
    MaxCount: maxCount,
  };

  // only send filters if they exist
  if (status) params.status = status;
  if (requestType) params.requestType = requestType;
  if (date) params.date = date;

  const res = await instance.get(`/api/garage/${id}/request-history`, {
    params: Object.keys(params).length > 2 ? params : {
      SkipCount: skipCount,
      MaxCount: maxCount,
    },
  });

  return res.data;
};

/* ---------------- COMPONENT ---------------- */
const GarageServicehistory = () => {
  const garageId = localStorage.getItem("userId") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [requestType, setRequestType] = useState("");
  const [date, setDate] = useState("");

  const [page, setPage] = useState(0);
  const pageSize = 10;
  const skipCount = page * pageSize;

  /* ---------------- API CALL ---------------- */
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "garage-history",
      garageId,
      status,
      requestType,
      date,
      page,
    ],
    queryFn: () =>
      fetchRequestHistory({
        id: garageId,
        status,
        requestType,
        date,
        skipCount,
        maxCount: pageSize,
      }),
    enabled: !!garageId, // only require garageId
    keepPreviousData: true,
  });

  const items = data?.items || [];

  /* ---------------- SEARCH (CLIENT SIDE) ---------------- */
  const filteredData = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter((x) =>
      `${x.problemDescription} ${x.vehicleModel} ${x.vehicleType}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Service History
        </h1>
        <p className="text-gray-500">
          All garage service requests
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center mb-6">

        {/* SEARCH */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search issues, vehicles..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none"
          />
        </div>

        {/* STATUS */}
        <select
          className="border border-gray-200 px-3 py-2 rounded-lg"
          value={status}
          onChange={(e) => {
            setPage(0);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Accepted">Accepted</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* TYPE */}
        <select
          className="border border-gray-200 px-3 py-2 rounded-lg"
          value={requestType}
          onChange={(e) => {
            setPage(0);
            setRequestType(e.target.value);
          }}
        >
          <option value="">All Types</option>
          <option value="Emergency">Emergency</option>
          <option value="Scheduled">Scheduled</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          className="border border-gray-200 px-3 py-2 rounded-lg"
          value={date}
          onChange={(e) => {
            setPage(0);
            setDate(e.target.value);
          }}
        />

        {/* EXPORT */}
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600 border-b">
            <tr>
              <th className="p-4">Date</th>
              <th>Issue</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Status</th>
              <th>Budget</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan="6">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td className="p-4 text-red-500" colSpan="6">
                  Failed to load data
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan="6">
                  No records found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-red-50 transition"
                >
                  <td className="p-4 text-gray-700">
                    {new Date(item.creationTime).toLocaleString()}
                  </td>

                  <td className="font-medium text-gray-900">
                    {item.problemDescription}
                  </td>

                  <td className="text-gray-600">
                    {item.vehicleModel} ({item.vehicleType})
                  </td>

                  <td className="text-gray-600">
                    {item.requestType}
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="font-semibold text-gray-900">
                    NPR {item.estimatedBudget}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">

        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page + 1}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border border-gray-200 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GarageServicehistory;