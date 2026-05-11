import React from "react";
import { WhyFeatures } from "./Homedata";

const FifthSec = () => {
  return (
    <section className="py-24 px-6 bg-red-600 text-white">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-red-200">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 tracking-tight">
            Why FixIt Nepal?
          </h2>
          <p className="mt-3 text-base text-red-200">
            Built specifically for Nepal's unique challenges.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {WhyFeatures.map((item, i) => (
            <div
              key={i}
              className="bg-red-700 border border-red-500 rounded-2xl p-6 text-center hover:bg-red-800 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-red-200 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FifthSec;
