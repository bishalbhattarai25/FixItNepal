import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registrationTypes = [
    {
      title: "User",
      description: "Get instant vehicle help and track nearby mechanics.",
      path: "/register/user",
      icon: "🚗",
      color: "bg-blue-100 text-blue-600",
      hover: "group-hover:text-blue-600"
    },
    {
      title: "Service Center",
      description: "Register your workshop and manage service requests.",
      path: "/register/servicecenter",
      icon: "🏢",
      color: "bg-red-100 text-red-600",
      hover: "group-hover:text-red-600"
    },
    {
      title: "Mechanic",
      description: "Join as an independent mechanic for emergency rescues.",
      path: "/register/machine",
      icon: "🔧",
      color: "bg-blue-100 text-blue-600",
      hover: "group-hover:text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900">
            Join <span className="text-blue-600">FixIt</span>
            <span className="text-red-600"> Nepal</span>
          </h1>

          <p className="text-zinc-500 mt-4 text-lg max-w-lg mx-auto">
            Choose how you want to use Nepal’s smartest roadside assistance platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {registrationTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => navigate(type.path)}
              className="group cursor-pointer bg-white/80 backdrop-blur-xl border border-zinc-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
            >

              {/* Icon */}
              <div
                className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110`}
              >
                {type.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-zinc-800 mb-3">
                {type.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {type.description}
              </p>

              {/* CTA */}
              <div
                className={`flex items-center font-semibold text-zinc-700 ${type.hover} transition`}
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center mt-14 text-zinc-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;