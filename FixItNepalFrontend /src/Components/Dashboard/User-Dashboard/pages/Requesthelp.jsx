import React, { useEffect, useState } from "react";
import { MapPin, AlertTriangle, Zap, Car, Fuel, Send, Clock } from "lucide-react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import instance from "../../../../Server/Axios";
import EmergencyLoader from "../../../../Loader/EmRequest";


export const Requesthelp = () => {
const [isSubmitting, setIsSubmitting] = useState(false);
const[located, setLocated] = useState(false)

  const problemTypes = [
    { name: "Breakdown", icon: AlertTriangle },
    { name: "Puncture", icon: Zap },
    { name: "Accident", icon: Car },
    { name: "Out of Fuel", icon: Fuel },
  ];

  const initialValues = {
    requestType: "Emergency",
    problemType: "",
    scheduledDate: new Date().toISOString(),
    problemDescription: "",
    locationCoordinates: {
      latitude: 0,
      longitude: 0,
    },
    radiusInKm: 50,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const payload = {
          requestType: values.requestType,
          problemType: values.problemType,
          scheduledDate: values.scheduledDate,
          locationCoordinates: {
            latitude: parseFloat(values.locationCoordinates.latitude),
            longitude: parseFloat(values.locationCoordinates.longitude),
          },
          radiusInKm: values.radiusInKm,
        };

        await instance.post("/api/servicerequest", payload);

        toast.success("Emergency Signal Sent! Help is on the way.", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#fff',
            fontWeight: 'bold',
          },
        });


        formik.resetForm();
      } catch (err) {
        toast.error(err.response?.data?.title || "Fail is send");
      } finally {
setIsSubmitting(false); 

     }
    },
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by browser");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        formik.setFieldValue(
          "locationCoordinates.latitude",
          position.coords.latitude,
        );
        formik.setFieldValue(
          "locationCoordinates.longitude",
          position.coords.longitude,
        );
      },
      () => {
        console.log("Unable to retrieve location");
      },
    );
  }, [located]);

  

  return (
    <div className="flex gap-6  bg-gray-50 font-sans">
      <Toaster />

      {isSubmitting && <EmergencyLoader /> }
      {/* Left Section: Form */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Request Help</h2>
        <p className="text-gray-600 mb-6">
          Submit your emergency request and get instant assistance
        </p>
        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Emergency Request Form
          </h3>

          {/* Location */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Location
            </label>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-medium">
                  {formik.values.locationCoordinates.latitude !== 0
                    ? `${formik.values.locationCoordinates.latitude.toFixed(4)}, ${formik.values.locationCoordinates.longitude.toFixed(4)}`
                    : "Detecting location..."}
                </span>
              </div>
              <button onClick={()=>setLocated(true)} type="button" className="text-red-500 font-semibold text-sm hover:text-red-600">
                located
              </button>
            </div>
          </div>

          

          {/* Problem Type */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Problem Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {problemTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formik.values.problemType === type.name;
                return (
                  <button
                  type="button"
                    key={type.name}
                    onClick={() =>
                      formik.setFieldValue("problemType", type.name)
                    }
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-red-400 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isSelected ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span className="font-medium text-gray-900">
                      {type.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Automatic Time Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Request Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                readOnly
                value={new Date(formik.values.scheduledDate).toLocaleString()}
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Additional Notes 
            </label>
            <textarea
            name="problemDescription"
              rows="3"
              value={formik.values.problemDescription}
              onChange={formik.handleChange}
              placeholder="Describe your situation..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none"
            />
          </div>

          {/* Static Emergency Mode Info (Not a Toggle) */}
          <div className="flex items-center justify-between p-4 bg-red-600 rounded-xl mb-6 shadow-md shadow-red-100">
            <div className="flex items-center gap-3 text-white">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <div>
                <p className="font-bold">Emergency Mode Active</p>
                <p className="text-[11px] opacity-90 uppercase tracking-wider">
                  Priority Dispatching Enabled
                </p>
              </div>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/30 uppercase">
              Locked
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
            <Send className="w-5 h-5" />
            SEND REQUEST
          </button>
        </form>
      </div>

      {/* Right Section: Info Cards */}
      <div className="w-80 flex flex-col gap-6">
        {/* Response Time Card */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
          <Zap className="w-8 h-8 mb-4" />
          <p className="text-lg font-medium">Average Response Time</p>
          <h1 className="text-6xl font-extrabold my-2">8 min</h1>
          <p className="text-sm opacity-90">Based on your location</p>
        </div>

        {/* How it Works Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            How It Works
          </h3>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Submit Request",
                desc: "Fill the form with your issue details",
              },
              {
                step: "2",
                title: "Get Matched",
                desc: "Nearest mechanic accepts your request",
              },
              {
                step: "3",
                title: "Track Live",
                desc: "Monitor mechanic's arrival in real-time",
              },
              {
                step: "4",
                title: "Get Fixed",
                desc: "Service completed, pay securely",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Requesthelp;
