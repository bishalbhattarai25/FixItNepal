import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //for the navigation
  const navigate = useNavigate();

  //for form
  const [loginForm, setLoginForm] = useState({
    phonenumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { number, value } = e.target;

    setLoginForm({ ...loginForm, [number]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="shadow-2xl rounded-2xl p-8 w-[350px] bg-white">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold text-orange-400">FIX</span>
          <span className="text-2xl font-bold">IT</span>
          <span className="text-3xl font-extrabold text-green-400 ">
            {" "}
            Nepal
          </span>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Phone Number</label>
            <input
             name="phonenumber"
              type="number"
              placeholder="Enter your username"
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={loginForm?.phonenumber}
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={loginForm?.password}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-red-400 text-white py-2 rounded-xl hover:bg-green-400 transition"
          >
            Login
          </button>
        </form>

        {/* Extra */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
