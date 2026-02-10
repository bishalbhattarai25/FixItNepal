import React from "react";
import { WhyFeatures } from "./Homedata";

const FifthSec = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-red-500 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Why FIX-IT NEPAL?
          </h1>
          <p className="mt-3 text-xl text-red-100">
            Built specifically for Nepal's unique challenges
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {WhyFeatures.map((item, i) => (
            <div
              key={i}
              className="text-center"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="mt-2 text-base text-red-100">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FifthSec;
