import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Unified State (Matching standard API naming)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 2. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const apiUrl = process.env.APP_API_URL 
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullname,
          emailAddress: formData.email,
          phoneNumber: formData.phoneNumber,
          passWord: formData.password,
          role: "User" // Explicitly setting the role
        }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        const error = await response.json();
        alert(error.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server is sleeping. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="shadow-2xl rounded-[2rem] p-10 w-full max-w-[400px] bg-white border border-zinc-100">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-orange-500">FIX</span>
            <span className="text-zinc-900">IT</span>
            <span className="text-green-500"> Nepal</span>
          </h1>
          <p className="text-zinc-500 font-medium mt-1">Create your user account</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Ayush Khatri"
              required
              className="w-full p-3 rounded-xl bg-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              required
              className="w-full p-3 rounded-xl bg-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="98XXXXXXXX"
              required
              className="w-full p-3 rounded-xl bg-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full p-3 rounded-xl bg-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                required
                className={`w-full p-3 rounded-xl bg-zinc-100 focus:ring-2 outline-none transition ${
                  formData.confirmPassword && formData.password !== formData.confirmPassword 
                  ? "ring-2 ring-red-400" : "focus:ring-blue-500"
                }`}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};