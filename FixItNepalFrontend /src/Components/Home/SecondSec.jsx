import React from "react";
import { ListData } from "./Homedata";
import { TiTick } from "react-icons/ti";

const SecondSec = () => {
  return (
    <div className="m-4 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-semibold text-5xl text-gray-700">
            Who Is This For?
          </h1>
          <h3 className="font-light text-xl text-gray-500 mt-2">
            Choose your role and get started
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-10 justify-center">
          {ListData.map((data, index) => {
            return (
              <div key={index} className="w-full md:w-1/3">
                <div
                  className={`${data.bgcolor} rounded-2xl p-6 
                  shadow-lg hover:shadow-2xl 
                  transition-all duration-300 
                  hover:-translate-y-2  hover:border-2 ${data.borderColor}`}
                >
                  <div className={`text-white text-5xl w-fit h-fit p-2 shadow-2xl ${data.logocolor}  rounded-2xl `}>{data.logo}</div>

                  <div className="text-gray-800 font-bold text-2xl mt-4">
                    {data.Topic}
                  </div>

                  <div className="flex flex-col gap-3 mt-4 text-gray-700">
                    <h2 className="flex items-center gap-2">
                      <TiTick className="text-green-600" />
                      {data.title1}
                    </h2>
                    <h2 className="flex items-center gap-2">
                      <TiTick className="text-green-600" />
                      {data.title2}
                    </h2>
                    <h2 className="flex items-center gap-2">
                      <TiTick className="text-green-600" />
                      {data.title3}
                    </h2>
                  </div>

                  <button
                    className={`${data.btncolor} 
                    mt-6 w-full text-white 
                    py-3 rounded-xl 
                    font-semibold 
                    hover:opacity-90 transition`}
                  >
                    {data.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecondSec;
