import React from "react";
import { WorkData } from "./Homedata";

const ThirdSec = () => {
  return (
    <section className="w-full py-20 bg-gray-100">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className=" text-gray-600 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            HOW FIX-IT NEPAL WORKS
          </h1>
          <h3 className="text-gray-600 mt-4 text-lg md:text-xl font-medium">
            Get help in 3 simple steps
          </h3>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-20">
          {WorkData.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon + Step */}
                <div className="relative mb-6">
                  <div
                    className={`${data.logobg} text-white text-5xl p-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                  >
                    {data.logo}
                  </div>

                  <span
                    className={`absolute -top-3 -right-5 ${data.textbg} text-white text-xs font-bold px-3 py-1 rounded-full`}
                  >
                    Step {index + 1}
                  </span>
                </div>

                {/* Text */}
                <h2 className="text-xl md:text-3xl font-bold mb-3">
                  {data.Topic}
                </h2>
                <p className="text-gray-600 text-sm md:text-base max-w-sm leading-relaxed">
                  {data.subbody}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ThirdSec;
