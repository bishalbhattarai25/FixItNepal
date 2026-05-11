import React from "react";
import { useNavigate } from "react-router-dom";
import { Car, Building2, Wrench, Users, Store, Wrench as MechanicIcon, CheckCircle2, ArrowRight, ChevronLeft, Rocket, Shield } from "lucide-react";

const registrationTypes = [
  {
    title: "User",
    description: "Get instant vehicle help and track nearby mechanics in real-time.",
    path: "/register/user",
    Icon: Car,
    accent: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    badge: "bg-blue-50 text-blue-600 border border-blue-100",
    btnBg: "bg-blue-500 hover:bg-blue-600",
    hoverShadow: "hover:shadow-blue-100",
    features: ["24/7 roadside assistance", "Real-time tracking", "Emergency SOS"],
  },
  {
    title: "Service Center",
    description: "Register your workshop and manage service requests efficiently.",
    path: "/register/servicecenter",
    Icon: Building2,
    accent: "border-l-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    badge: "bg-orange-50 text-orange-600 border border-orange-100",
    btnBg: "bg-orange-500 hover:bg-orange-600",
    hoverShadow: "hover:shadow-orange-100",
    features: ["Business dashboard", "Customer management", "Service analytics"],
  },
  {
    title: "Mechanic",
    description: "Join as an independent mechanic for emergency rescues and earn.",
    path: "/register/mechanic",
    Icon: Wrench,
    accent: "border-l-purple-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    badge: "bg-purple-50 text-purple-600 border border-purple-100",
    btnBg: "bg-purple-500 hover:bg-purple-600",
    hoverShadow: "hover:shadow-purple-100",
    features: ["Flexible schedule", "Instant job alerts", "Direct payments"],
  },
];

const stats = [
  { value: "5,000+", label: "Active Users", Icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { value: "200+", label: "Service Centers", Icon: Store, color: "text-orange-500", bg: "bg-orange-50" },
  { value: "1,000+", label: "Mechanics", Icon: MechanicIcon, color: "text-purple-500", bg: "bg-purple-50" },
];

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-gray-400 border border-gray-200 px-3 py-1.5 rounded-lg hover:text-gray-700 hover:border-gray-300 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6">
            <Rocket className="w-3.5 h-3.5" />
            Nepal's #1 Roadside Assistance Platform
          </span>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-none">
            Fix<span className="text-blue-500">It</span>
            <span className="text-orange-500">Nepal</span>
          </h1>

          <p className="text-gray-400 mt-4 text-base max-w-md mx-auto leading-relaxed">
            Choose your role and join thousands already on the platform.
          </p>

          <div className="mt-8 w-16 h-px bg-gray-200 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {registrationTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => navigate(type.path)}
              className={`group bg-white rounded-2xl border border-gray-100 border-l-4 ${type.accent} shadow-sm hover:shadow-xl ${type.hoverShadow} transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-slideUp`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">

                {/* Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 ${type.iconBg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <type.Icon className={`w-5 h-5 ${type.iconColor}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${type.badge}`}>
                    Step {index + 1}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">{type.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{type.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {type.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-2.5 ${type.btnBg} text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
              <div className={`w-9 h-9 ${s.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <s.Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-2xl font-black text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield className="w-3.5 h-3.5" />
          Trusted by thousands across Nepal
        </div>

        {/* Login link */}
        <div className="text-center mt-8 pb-2">
          <span className="text-gray-400 text-sm">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-blue-500 hover:text-blue-600 hover:underline underline-offset-2 transition-colors"
          >
            Log in
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out both; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default RegisterPage;
