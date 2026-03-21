import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Info
} from "lucide-react"; 
import instance from "../../../../Server/Axios";
import { Map } from "../../../HOC/Map";

const ViewDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = type === "centerlist" ? `/api/garage/${id}` : `/api/mechanic/${id}`;
    instance
      .get(url)
      .then((res) => setRecord(res.data))
      .catch((err) => console.error("Error fetching record:", err))
      .finally(() => setLoading(false));
  }, [id, type]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!record)
    return (
      <div className="p-12 text-center">
        <p className="text-xl text-gray-500 font-medium">Record not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold underline">Go Back</button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-500 hover:text-blue-600 transition-all font-semibold"
        >
          <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors mr-2">
            <ArrowLeft className="w-5 h-5" />
          </div>
          Back to Overview
        </button>
        
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
          <ShieldCheck size={14} /> Registered {type}
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden">
        {/* Banner */}
        <div className="h-40 w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="px-6 md:px-12 pb-12">
          {/* Profile Header */}
          <div className="relative -mt-16 flex flex-col md:flex-row md:items-end md:space-x-8">
            <div className="relative group">
              <img
                src={record.logo?.accessUrl || "/placeholder-avatar.png"}
                alt="Profile"
                className="w-40 h-40 rounded-3xl border-8 border-white object-cover bg-gray-50 shadow-xl"
              />
            </div>
            
            <div className="mt-6 md:mt-0 flex-1 pb-2">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {record.userName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600 font-medium">
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" /> 
                  {record.address?.city}, {record.address?.province}
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" /> 
                  Joined {new Date(record.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Description/About */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">Profile Description</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {record.description || `This ${type} provides professional automotive services with a focus on quality and customer satisfaction in ${record.address?.city}.`}
                </p>
              </section>

              {/* Grid of Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Contact Info</h4>
                  <div className="space-y-4">
                    <div className="flex items-center group">
                      <Mail className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-gray-700 font-medium">{record.email}</span>
                    </div>
                    <div className="flex items-center group">
                      <Phone className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-gray-700 font-medium">{record.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Location</h4>
                  <p className="text-gray-700 font-medium leading-snug">
                    {record.address?.tole}, {record.address?.city}<br />
                    {record.address?.province}, {record.address?.postalCode}
                  </p>
                </div>
              </div>

              {/* Documents Section */}
              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Verified Documents</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {record.documents?.map((doc, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 h-40 cursor-zoom-in"
                    >
                      <img
                        src={doc?.accessUrl}
                        alt={`document-${idx}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <span className="text-white text-xs font-bold flex items-center">
                          View Document <ExternalLink size={12} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Sidebar Stats */}
            <div className="space-y-6">
               <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200">
                  <h4 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Profile Status</h4>
                  <div className="flex items-center justify-between py-3 border-b border-slate-800">
                    <span className="text-slate-300">Account Type</span>
                    <span className="capitalize font-bold">{type}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-800">
                    <span className="text-slate-300">Verified</span>
                    <span className="text-emerald-400 font-bold">Yes</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-300">Rating</span>
                    <span className="text-amber-400 font-bold">★ 4.8</span>
                  </div>
                  
               </div>

               {/* Map Placeholder */}
               <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                  <h4 className="text-blue-900 font-bold mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Quick Map View
                  </h4>
                  <div className="bg-white/50 h-32 rounded-2xl border border-dashed border-blue-200 flex items-center justify-center">
                    <div className="text-blue-400 text-xs font-bold"> <Map /></ div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;