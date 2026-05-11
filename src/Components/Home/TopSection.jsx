import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineElectricBolt } from "react-icons/md";

const TopSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-[90vh] flex items-center px-6 md:px-16">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">

        {/* Left */}
        <div className="flex-[1.4]">

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full mb-6">
            <MdOutlineElectricBolt />
            Nepal's First Smart Rescue Platform
          </span>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight">
            Roadside Help,<br />
            <span className="text-red-600">When You Need It.</span>
          </h1>

          <p className="text-gray-400 text-base mt-5 leading-relaxed max-w-sm">
            Connect with nearby mechanics instantly. Emergency rescue, appointments, and live tracking — all in one place.
          </p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate("/register/user")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Get Help Now
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Join as Provider
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-0 mt-12 divide-x divide-gray-200">
            {[["5K+", "Active Users"], ["200+", "Service Centers"], ["1K+", "Mechanics"]].map(([val, label]) => (
              <div key={label} className="px-5 first:pl-0">
                <div className="text-xl font-black text-gray-900">{val}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex-[1] flex justify-center">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-red-50 rounded-3xl scale-105" />
            <img
              src="/Untitled design (3)-Photoroom.png"
              alt="Moto Rescue"
              className="relative w-full h-[650px] object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopSection;
