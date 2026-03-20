import React, { useEffect, useState } from 'react';
import { FaHashtag, FaPhoneAlt, FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import instance from '../../../../Server/Axios';
import FetchLoader from '../../../../Loader/FetchLoader';

const MechanicList = () => {
  const [datavalue, setDatavalue] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    instance.get("/api/mechanic",{
      params:{
        ApproalStatus : 'Approved'
      }
    })
      .then((res) => setDatavalue(res.data.items || []))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (isloading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <FetchLoader />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Garage Details</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Postal Code</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {datavalue.length > 0 ? (
              datavalue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* ID & Name Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.logo?.accessUrl ? (
                        <img 
                          src={item.logo.accessUrl} 
                          alt="Logo" 
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {item.name?.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 capitalize">{item.userName || 'N/A'}</span>
                        <span className="text-[10px] font-mono text-gray-400">ID: {item.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <FaMapMarkerAlt className="text-red-400" size={12} />
                        <span className="capitalize">{item.address?.city}, {item.address?.province}</span>
                      </div>
                      <span className="text-xs text-gray-400 ml-4">{item.address?.tole}</span>
                    </div>
                  </td>

                  {/* Contact Info Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 cursor-pointer">
                        <IoIosMail className="text-gray-400" size={14} /> {item.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FaPhoneAlt className="text-gray-400" size={10} /> {item.phoneNumber || 'No phone'}
                      </div>
                    </div>
                  </td>

                  {/* Postal Code */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                      <FaHashtag size={10} /> {item.address?.postalCode || '---'}
                    </span>
                  </td>

                  {/* Action Column */}
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95">
                      View Record <FaExternalLinkAlt size={10} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">
                  No service centers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MechanicList;