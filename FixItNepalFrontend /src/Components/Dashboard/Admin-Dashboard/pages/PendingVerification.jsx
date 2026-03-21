import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaChevronRight,
  FaRegIdBadge,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import instance from "../../../../Server/Axios";

const PendingVerification = () => {
  const [activeType, setActiveType] = useState("mechanic");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = activeType === "mechanic" ? `/api/mechanic` : `/api/garage`;
    instance
      .get(url, {
        params: {
          ApprovalStatus: "Pending",
        },
      })
      .then((res) => setData(res.data.items || []))
      .catch((err) => console.error("Error fetching mechanics:", err))
      .finally(() => setLoading(false));
  }, [activeType]);

  // Professional Loading State
  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-400 animate-pulse">
          Fetching verification requests...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex p-1 bg-gray-100 rounded-xl w-fit mb-6 shadow-inner">
        <button
          onClick={() => setActiveType("mechanic")}
          className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
            activeType === "mechanic"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Mechanics
        </button>
        <button
          onClick={() => setActiveType("garage")}
          className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
            activeType === "garage"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Garages
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200">
            
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Mechanic Profile
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
                Verification Status
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-all duration-200 group"
                >
                  {/* Mechanic Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {item.logo?.accessUrl ? (
                          <img
                            src={item.logo.accessUrl}
                            alt="logo"
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-50 group-hover:ring-blue-100 transition-all"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                            <FaRegIdBadge size={20} />
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 leading-none mb-1 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono tracking-tighter">
                          REF: {item.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                        <FaMapMarkerAlt className="text-blue-500" size={12} />
                        {item.address?.city}
                      </div>
                      <span className="text-xs text-gray-400 ml-4">
                        {item.address?.province}
                      </span>
                    </div>
                  </td>

                  {/* Contact Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-5 h-5 rounded bg-gray-50 flex items-center justify-center">
                          <IoIosMail className="text-gray-400" />
                        </div>
                        {item.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-5 h-5 rounded bg-gray-50 flex items-center justify-center">
                          <FaPhoneAlt className="text-gray-400" size={9} />
                        </div>
                        {item.phoneNumber}
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-200/50 shadow-sm">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mr-1.5 animate-pulse"></span>
                        {item.approvalStatus}
                      </span>
                    </div>
                  </td>

                  {/* Action Column */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/superadmin/record/${activeType}/${item.id}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-[11px] font-bold uppercase rounded-xl hover:bg-blue-600 active:scale-95 transition-all shadow-md shadow-gray-200 hover:shadow-blue-200"
                    >
                      Review <FaChevronRight size={10} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-20 text-center">
                  <p className="text-gray-400 text-sm italic">
                    No pending verifications at the moment.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingVerification;
