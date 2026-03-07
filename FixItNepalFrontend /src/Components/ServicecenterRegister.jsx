import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ServiceCenterRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    logoId: " 3fa85f64-5717-4562-b3fc-2c963f66afa6", 
    phoneNumber: "",
    emailAddress: "",
    passWord: "",
    address: {
      tole: "",
      city: "",
      province: "",
      country: "Nepal",
      postalCode: "",
      locationCoordinatePoint: {
        latitude: "",
        longitude: ""
      },
    },
    documentMediaFiles: [
      { imageId: "" }
    ],
  });

  // 1. Improved Change Handler for DEEP nesting
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      let updated = { ...prev };
      let temp = updated;

      // Traverse the keys to reach the target nested object
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] }; // Shallow clone each level
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value; // Set the value
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Note: Changed from APP_API_URL to REACT_APP_API_URL or VITE_API_URL depending on your setup
      // eslint-disable-next-line no-undef
      // const apiUrl = process.env.APP_API_URL ;
      const response = await fetch(`https://fixitnepal.onrender.com/api/garage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        const error = await response.json();
        alert(error.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-10 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl w-full max-w-3xl border border-zinc-200">
        
        <header className="text-center mb-10">
          <h2 className="text-3xl font-black text-zinc-800 tracking-tight">
            Register <span className="text-blue-600">Service Center</span>
          </h2>
          <p className="text-zinc-500 mt-2">Become a part of the MOTO-RESCUE network</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Basic Information --- */}
          <div className="md:col-span-2 flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-widest border-b pb-2">
            <span>01</span> Basic Information
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-zinc-500 ml-1">Center Name</label>
            <input name="name" placeholder="Workshop Name" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-zinc-500 ml-1">Email Address</label>
            <input name="emailAddress" type="email" placeholder="contact@garage.com" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-zinc-500 ml-1">Phone Number</label>
            <input name="phoneNumber" placeholder="98XXXXXXXX" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-zinc-500 ml-1">Password</label>
            <input name="passWord" type="password" placeholder="••••••••" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} required />
          </div>

          {/* --- Address Section --- */}
          <div className="md:col-span-2 flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-widest border-b pb-2 mt-4">
            <span>02</span> Physical Location
          </div>

          <input name="address.tole" placeholder="Tole/Street" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl outline-none" onChange={handleChange} />
          <input name="address.city" placeholder="City" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl outline-none" onChange={handleChange} />
          <input name="address.province" placeholder="Province" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl outline-none" onChange={handleChange} />
          <input name="address.postalCode" placeholder="Postal Code" className="bg-zinc-50 border border-zinc-200 p-3 rounded-xl outline-none" onChange={handleChange} />

          {/* --- GPS Coordinates Placeholder --- */}
          <div className="md:col-span-2 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <h4 className="font-bold text-blue-800">GPS Coordinates</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <input name="address.locationCoordinatePoint.latitude" placeholder="Latitude" className="bg-white p-2 rounded-lg border border-blue-100 text-sm" onChange={handleChange} />
                <input name="address.locationCoordinatePoint.longitude" placeholder="Longitude" className="bg-white p-2 rounded-lg border border-blue-100 text-sm" onChange={handleChange} />
             </div>
          </div>

          {/* --- Documents Placeholder --- */}
          <div className="md:col-span-2 mt-4">
             <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer">
                <span className="text-2xl mb-2">📄</span>
                <p className="text-sm font-bold text-zinc-600">Upload Registration Document</p>
                <p className="text-xs text-zinc-400">PDF or Images accepted</p>
             </div>
          </div>
        </div>

        <button type="submit" className="w-full mt-10 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
        onClick={handleSubmit}
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};