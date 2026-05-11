import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoShieldCheck } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import  AuthLoader from "../Loader/LoginLoader";





export const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    phonenumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!loginForm.phonenumber || !loginForm.password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setMainLoader(true);

    try {
      const response = await fetch(`https://fixitnepal.onrender.com/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);

        if (rememberMe) {
          localStorage.setItem("rememberedUser", loginForm.phonenumber);
        }

        navigate(
          data.role === "Customer" ? "/userdashboard" : 
          data.role === "Garage" ? "/servicecenter" : 
          data.role === "Mechanic" ? "/mechanic" :
          data.role === "SuperAdmin" ? "/superadmin" :
          alert("Unspecified Role")
        );
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Network error. Please try again.",error);
    } finally {
      setIsLoading(false);
      setMainLoader(false);
    }
  };
  

  return (
    mainLoader ? (
      <AuthLoader />
    ) : (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 transform transition-all duration-300 hover:shadow-3xl">
          
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-2xl text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <GoShieldCheck />
              </svg>
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FIXIT
              </span>
              <span className="text-gray-800"> Nepal</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Secure roadside assistance at your fingertips</p>
          </div>

          {/* Welcome Back Message */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-800">Welcome Back! 👋</h2>
            <p className="text-sm text-gray-600 mt-1">Please enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handlelogin} className="space-y-5">
            
            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-2xl text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <FaPhoneAlt />
                </svg>
                Phone Number
              </label>
              <div className="relative">
                <input
                  name="phonenumber"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-300 text-gray-700"
                  onChange={handleChange}
                  value={loginForm.phonenumber}
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <FaCheck />

                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-2xl text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <RiLockPasswordLine />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white transition-all duration-300 pr-12"
                  onChange={handleChange}
                  value={loginForm.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
            
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              New to FixIt Nepal?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold hover:text-purple-600 transition-colors relative group"
              >
                Create an account
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </button>
            </p>
          </div>

          
        </div>
      </div>

      
    </div>
    )
            
  );
};