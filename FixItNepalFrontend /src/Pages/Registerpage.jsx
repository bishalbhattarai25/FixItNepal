import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registrationTypes = [
    {
      title: "User",
      description: "Get instant vehicle help and track nearby mechanics in real-time.",
      path: "/register/user",
      icon: "🚗",
      gradient: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50",
      features: ["24/7 roadside assistance", "Real-time tracking", "Emergency SOS"]
    },
    {
      title: "Service Center",
      description: "Register your workshop and manage service requests efficiently.",
      path: "/register/servicecenter",
      icon: "🏢",
      gradient: "from-red-500 to-orange-500",
      lightBg: "bg-red-50",
      features: ["Business dashboard", "Customer management", "Service analytics"]
    },
    {
      title: "Mechanic",
      description: "Join as an independent mechanic for emergency rescues and earn.",
      path: "/register/mechanic",
      icon: "🔧",
      gradient: "from-purple-500 to-pink-500",
      lightBg: "bg-purple-50",
      features: ["Flexible schedule", "Instant job alerts", "Direct payments"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">

        {/* Animated Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              🚀 Join the Future of Roadside Assistance
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Join FixIt
            </span>
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              {" "}Nepal
            </span>
          </h1>

          <p className="text-gray-600 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
            Choose your path and become part of Nepal's most trusted roadside 
            assistance network. Quick registration, instant benefits.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

          {registrationTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => navigate(type.path)}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden animate-slideUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >

              {/* Gradient Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${type.gradient}`} />

              {/* Content */}
              <div className="p-8">

                {/* Icon Circle */}
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-r ${type.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity`} />
                  <div className={`relative w-20 h-20 ${type.lightBg} rounded-2xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {type.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {type.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {type.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-8">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${type.gradient} text-white font-semibold rounded-xl transform group-hover:translate-x-2 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  Get Started
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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

              {/* Decorative Background Pattern */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                <div className={`w-full h-full bg-gradient-to-r ${type.gradient} rounded-full filter blur-3xl`} />
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">5000+</div>
            <div className="text-sm text-gray-500 mt-1">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">200+</div>
            <div className="text-sm text-gray-500 mt-1">Service Centers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">1000+</div>
            <div className="text-sm text-gray-500 mt-1">Registered Mechanics</div>
          </div>
        </div>

        {/* Footer with Login */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white rounded-full shadow-md px-8 py-3">
            <span className="text-gray-600">Already have an account?</span>
            <button
              onClick={() => navigate("/login")}
              className="ml-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors relative group"
            >
              Login here
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;