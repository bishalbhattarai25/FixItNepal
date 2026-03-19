import React, { useEffect, useState } from 'react';
import { PendingVerificationData } from '../HOC/PendingVerificationData';
import { FaRegStar, FaMapPin, FaHashtag, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { FaMapPin as FaMapPin6 } from "react-icons/fa6"; 
import { IoIosMail } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import instance from '../../../../Server/Axios';

const PendingVerification = () => {

const navigate = useNavigate();

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true)

useEffect(() => {
  instance.get("/api/mechanic")
  .then((res) => {
    setData(res.data.items)
  })      .catch((err) => {
        console.error("Error fetching mechanics:", err);
      })
      .finally(() => {
        setLoading(false);
      });
}, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
       <div className="w-full overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Logo</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    {/* ID Column */}
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">
                        <img
                        src={item.logo?.accessUrl}
                        alt="logo"
                        className="w-10 h-10 rounded-full object-cover border"
                        />
                    </td>
      
                    {/* Name & Rating Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 capitalize">{item.userName}</span>
                        
                      </div>
                    </td>
      
                    {/* Location Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaMapPin6 className="text-blue-600" size={12} />
                        <span className="capitalize">{item.address?.city}, {item.address?.province}</span>
                      </div>
                    </td>
      
                    {/* Email & Phone Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <IoIosMail className="text-blue-500" /> {item.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FaPhoneAlt className="text-blue-500" size={10} /> {item.phoneNumber}
                        </div>
                      </div>
                    </td>
      
                    {/* Status Code Column */}
                  <td className="px-6 py-4">
                                <div
                                    className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full w-fit
                                    ${
                                        item.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : item.status === "Verified"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    <FaHashtag size={10} /> Pending
                                </div>
                                </td>
      
                    {/* View All Button Column */}
                    <td className="px-6 py-4 text-right">
                      <button
                      onClick={() => navigate(`/record/${item.id}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-tighter rounded-lg hover:bg-blue-600 transition-all shadow-sm">
                        View Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  );
}

export default PendingVerification;
