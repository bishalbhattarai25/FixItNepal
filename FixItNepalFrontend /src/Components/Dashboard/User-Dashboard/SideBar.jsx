import React, { useState } from "react";

import { Sidebar } from "./Datalist";
import { Dashboard } from "./pages/Dashboard";
import { Nearbymacf } from "./pages/Nearbymacf";
import Requesthelp from "./pages/Requesthelp";
import { Livetrack } from "./pages/Livetrack";
import { Servicehistory } from "./pages/Servicehistory";
import { Wallet } from "lucide-react";
import { Maintence } from "./pages/Maintence";
import { Profile } from "./pages/Profile";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [select, click] = useState(0)

  return (
  <div className="flex h-screen">
    
    {/* Sidebar */}
    <div className="flex flex-col p-3 gap-4 shadow-2xl rounded-2xl w-64 bg-white">
      {Sidebar.map((list, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(index);
              click(index);
            }}
            className={`
              flex gap-2 items-center text-xl font-light p-3 cursor-pointer transition-all duration-200
              ${
                isActive
                  ? "bg-red-200 text-red-500 shadow-xl rounded-2xl"
                  : "text-gray-700 hover:bg-gray-200 hover:shadow-xl hover:rounded-2xl"
              }
            `}
          >
            <span className="text-2xl">{list.logo}</span>
            {list.title}
          </div>
        );
      })}
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6 bg-gray-50 w-screen">
      {select === 0 && <Dashboard />}
      {select === 1 && <Nearbymacf />}
      {select === 2 && <Requesthelp />}
      {select === 3 && <Livetrack />}
      {select === 4 && <Servicehistory />}
      {select === 5 && <Wallet />}
      {select === 6 && <Maintence />}
      {select === 7 && <Profile />}



    </div>

  </div>
);

};

export default SideBar;
