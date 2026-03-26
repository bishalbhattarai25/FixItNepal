import React, { useState,useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  MapPin,
} from "lucide-react";
import instance from "../../../../Server/Axios";

const Requesthelp = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const mechanicId = localStorage.getItem("userId");
        const response = await instance.get(
          `/api/mechanic/${mechanicId}/todays-request`,
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await instance.patch(`/api/mechanic/${requestId}/approval-status`, null, {
        params: { approvalStatus: newStatus },
      });

      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req,
        ),
      );
    } catch (error) {
      alert("Failed to update status", error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-10">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Emergency Requests
            </h2>
            <p className="text-slate-500 mt-1 font-medium">
              Prioritize urgent roadside assistance approvals below.
            </p>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            March 26, 2026
          </div>
        </header>

        {/* STATIC TABLE CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 font-bold text-slate-400 text-xs uppercase tracking-wider">
                  Customer & Car
                </th>
                <th className="px-6 py-5 font-bold text-slate-400 text-xs uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-5 font-bold text-slate-400 text-xs uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-5 font-bold text-slate-400 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-5 font-bold text-slate-400 text-xs uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
            <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-6">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${req.requestType === 'Emergency' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                  <div className="font-bold text-slate-900">{req.requestType}</div>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono uppercase">{req.id.slice(0, 8)}...</div>
              </td>
              
              <td className="px-6 py-6">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {req.locationCoordinates.latitude.toFixed(4)}, {req.locationCoordinates.longitude.toFixed(4)}
                </div>
              </td>

              <td className="px-6 py-6 text-sm text-slate-600">
                <div className="font-semibold text-slate-800">{req.problemType}</div>
                <div className="text-xs text-slate-500 truncate max-w-[200px]">{req.problemDescription}</div>
              </td>

              <td className="px-6 py-6">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-tighter border ${
                  req.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' :
                  req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {req.status}
                </span>
              </td>

              <td className="px-6 py-6">
                <div className="flex justify-end gap-2">
                  {req.status === 'Pending' && (
                    <>
                      <button 
                      disabled={loading}
                        onClick={() => handleStatusUpdate(req.id, 'Approved')}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button 
                      disabled={loading}
                        onClick={() => handleStatusUpdate(req.id, 'Rejected')}
                        className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs transition-all"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </>
                  )}
                  {req.status !== 'Pending' && (
                    <span className="text-xs text-slate-400 italic">Action Completed</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
            </tbody>
          </table>

          {requests.length === 0 && (
        <div className="p-10 text-center border-t border-slate-50 bg-slate-50/30">
          <p className="text-slate-400 text-sm italic">No requests found for today.</p>
        </div>
      )}
    
          
        </div>
      </main>
    </div>
  );
};

export default Requesthelp;
