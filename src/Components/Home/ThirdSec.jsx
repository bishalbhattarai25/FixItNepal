import React from "react";
import { WorkData } from "./Homedata";

const ThirdSec = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Help in 3 Simple Steps
          </h2>
          <p className="text-gray-400 mt-3 text-base">Fast, reliable, and built for Nepal.</p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">

          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-gray-200 z-0" />

          {WorkData.map((data, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">

              {/* Step circle */}
              <div className={`w-20 h-20 ${data.logobg} rounded-full flex items-center justify-center text-white text-3xl shadow-md mb-5 group-hover:scale-105 transition-transform`}>
                {data.logo}
              </div>

              <span className={`text-xs font-bold uppercase tracking-widest ${data.stepColor} mb-2`}>
                Step {index + 1}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{data.Topic}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{data.subbody}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThirdSec;
