import React from 'react';
import { FaRegStar, FaMapPin, FaHashtag, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { FaMapPin as FaMapPin6 } from "react-icons/fa6"; 
import { IoIosMail } from "react-icons/io";
import { Centerlist } from '../HOC/Servicecenterlist';

const ServiceTable = () => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-200">
            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID</th>
            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Center Name</th>
            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Location</th>
            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Postal Code</th>
            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Centerlist.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
              {/* ID Column */}
              <td className="px-6 py-4 text-xs font-mono text-gray-400">
                {item.id}
              </td>

              {/* Name & Rating Column */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 capitalize">{item.name}</span>
                  
                </div>
              </td>

              {/* Location Column */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapPin6 className="text-blue-600" size={12} />
                  <span className="capitalize">{item.location}</span>
                </div>
              </td>

              {/* Email & Phone Column */}
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <IoIosMail className="text-blue-500" /> {item.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaPhoneAlt className="text-blue-500" size={10} /> {item.phone}
                  </div>
                </div>
              </td>

              {/* Postal Code Column */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <FaHashtag size={10} /> {item.postalCode}
                </div>
              </td>

              {/* View All Button Column */}
              <td className="px-6 py-4 text-right">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-tighter rounded-lg hover:bg-blue-600 transition-all shadow-sm">
                  View Record
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;