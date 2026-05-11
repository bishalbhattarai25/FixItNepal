import React from "react";
import { Features } from "./Homedata";

const FourthSec = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Platform Features</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Core Features
          </h2>
          <p className="text-gray-400 mt-3 text-base">Everything you need in one platform.</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Features.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.color} mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourthSec;
