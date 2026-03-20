import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"; // Optional: lucide-react for icons
import instance from "../../../../Server/Axios";

const ViewRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    instance
      .get(`/api/mechanic/${id}`)
      .then((res) => setRecord(res.data))
      .catch((err) => console.error("Error fetching record:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async (statusValue) => {
    setIsProcessing(true);
    try {
      
      await instance.patch(`/api/mechanic/${id}/approval-status?approvalStatus=${statusValue}`)

      setRecord((prev) => ({ ...prev, status: statusValue }));
alert(`Mechanic ${statusValue} successfully!`);
    } catch (err) {
      console.error("Verification failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!record)
    return <p className="p-6 text-center text-gray-500">No data found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
        </button>

        <div className="flex gap-4">
          {/* Only show buttons if not already processed */}
          {record.approvalStatus !== "Approved" && record.approvalStatus !== "Rejected" && (
            <>
              <button
                onClick={() => handleStatusUpdate("Rejected")}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl border border-red-100 text-red-500 font-bold text-xs uppercase hover:bg-red-50 transition-all disabled:opacity-50"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate("Approved")}
                disabled={isProcessing}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? "Updating..." : "Approve Mechanic"}
              </button>
            </>
          )}

          {/* Success State */}
          {record.status === "Approved" && (
            <div className="flex items-center gap-2 px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs border border-emerald-100 uppercase tracking-widest">
              <CheckCircle size={16} /> Verified & Active
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-xl shadow-gray-100/50 rounded-2xl overflow-hidden">
        {/* Top Banner/Profile Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 h-32 w-full relative"></div>

        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex flex-col md:flex-row md:items-end md:space-x-5">
            <img
              src={record.logo?.accessUrl}
              alt="logo"
              className="w-32 h-32 rounded-2xl border-4 border-white object-cover bg-white shadow-sm"
            />
            <div className="mt-4 md:mt-0 flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {record.userName}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    record.status === "Verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {record.status || "Pending"}
                </span>
              </div>
              <p className="text-gray-500 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" /> {record.address?.city},{" "}
                {record.address?.province}
              </p>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">
                      Email
                    </p>
                    <p className="font-medium">{record.email}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">
                      Phone
                    </p>
                    <p className="font-medium">{record.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Address Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {record.address?.tole}
                  <br />
                  {record.address?.city}, {record.address?.province}
                  <br />
                  <span className="text-gray-400">Postal Code:</span>{" "}
                  {record.address?.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Verification Documents
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {record.documents?.map((doc, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={doc?.accessUrl}
                    alt={`document-${idx}`}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white text-xs font-bold underline">
                      View Full
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecord;
