import React from "react";
import { useNavigate } from "react-router-dom";
import { ListData } from "./Homedata";
import { CheckCircle2 } from "lucide-react";

const SecondSec = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Who Is This For</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Choose Your Role
          </h2>
          <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
            Whether you're a rider, mechanic, or partner — we have a place for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ListData.map((data, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${data.accentBorder} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${data.iconBg} rounded-full flex items-center justify-center text-xl ${data.iconColor} mb-5`}>
                  {data.logo}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{data.Topic}</h3>

                <ul className="space-y-2 mt-4 mb-6">
                  {[data.title1, data.title2, data.title3].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(data.path)}
                  className={`w-full py-2.5 ${data.btncolor} text-white text-sm font-semibold rounded-xl transition-colors`}
                >
                  {data.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondSec;
