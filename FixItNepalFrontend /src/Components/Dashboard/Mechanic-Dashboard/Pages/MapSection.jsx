import React from "react";
import { Map } from "../../../HOC/Map";
import Requesthelp from "./Requesthelp";

const MapSection = () => {
  return (
    <div>

      <Requesthelp />
      
      <div className="flex flex-col h-screen bg-slate-50 p-6">
        {/* Header would go here */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Live Tracking Map Card */}
          <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 flex flex-col shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Live Tracking
              </h3>
              <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Online
              </span>
            </div>

            {/* The Map Area: h-full allows it to stretch to the bottom of the screen */}
            <div className="flex-1 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
              <Map size={48} strokeWidth={1.5} />
              
            </div>
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default MapSection;
