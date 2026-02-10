import React from "react";
import { ListData } from "./Homedata";
import { TiTick } from "react-icons/ti";

const SecondSec = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <h1 className="font-extrabold text-4xl md:text-5xl text-gray-600">
            Who Is This For?
          </h1>
          <h3 className="font-medium text-lg text-gray-500 mt-3">
            Choose your role and get started
          </h3>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          {ListData.map((data, index) => {
            return (
              <div key={index} className="w-full md:w-1/3">
                <div
                  className={`
                    ${data.bgcolor}
                    rounded-2xl p-7
                    border-2 border-transparent ${data.borderColor}
                    shadow-md hover:shadow-xl
                    transition-all duration-300 ease-out
                    hover:-translate-y-2
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`text-white text-5xl w-fit p-3 shadow-lg ${data.logocolor} rounded-xl`}
                  >
                    {data.logo}
                  </div>

                  {/* Title */}
                  <div className="text-gray-800 font-bold text-2xl mt-5">
                    {data.Topic}
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-3 mt-5 text-gray-700">
                    {[data.title1, data.title2, data.title3].map((t, i) => (
                      <h2 key={i} className="flex items-center gap-2">
                        <TiTick className="text-green-600 text-lg" />
                        {t}
                      </h2>
                    ))}
                  </div>

                  {/* Button */}
                  <button
                    className={`
                      ${data.btncolor}
                      mt-7 w-full text-white
                      py-3 rounded-xl
                      font-semibold
                      transition
                      hover:scale-[1.02]
                      active:scale-95
                    `}
                  >
                    {data.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecondSec;
