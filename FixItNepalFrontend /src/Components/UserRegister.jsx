import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../Server/Axios";

export const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. State strictly matching your requested fields
  const [formData, setFormData] = useState({
    phoneNumber: "",
    passWord: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await instance.post('/api/customer',{...formData})
      
      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans">
      <div className="shadow-2xl rounded-[2.5rem] p-10 w-full max-w-[400px] bg-white border border-zinc-100">
        
        {/* Brand Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter">
            <span className="text-orange-500">FIX</span>
            <span className="text-zinc-900">IT</span>
            <span className="text-green-500"> Nepal</span>
          </h1>
          <p className="text-zinc-400 font-medium mt-2">Create your account</p>
        </div>

        {/* Register Form */}
        
        <form className="flex flex-col gap-6" onSubmit={handleRegister}>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="98XXXXXXXX"
              required
              className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
              Set Password
            </label>
            <input
              type="password"
              name="passWord"
              placeholder="••••••••"
              required
              className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-8">
          Already have an account?{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            log in
          </span>
        </p>
      </div>
    </div>
  );
};