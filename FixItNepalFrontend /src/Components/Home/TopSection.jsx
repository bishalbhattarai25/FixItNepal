import React from "react";
import { MdOutlineElectricBolt } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";

const TopSection = () => {
  return (
    <div className="bg-[#FFE8E3] ">
      <div className="p-5 m-5 ">
        <div className="border-non w-fit p-2 rounded-2xl bg-red-200 text-red-600 font-semibold anime animate-pulse
">
          <h6 className="flex">
            {" "}
            <MdOutlineElectricBolt className="text-2xl" /> Nepal's First Smart
            Rescue Platform{" "}
          </h6>
        </div>
        <div className="flex justify-around gap-6 ">
          <div>
            <div className="text-8xl font-bold">
              <h1>Nepal's First</h1>
              <h1>Smart</h1>
              <h1 className="text-red-700">Moto Rescue</h1>
              <h1>Platform</h1>
            </div>
            <div>
              <h4 className="font-light text-2xl p-2 text-zinc-500 mt-1">
                Instant roadside assistance, nearby mechanics,
                <br />
                and emergency support — all in one system.
              </h4>
            </div>
            <div className=" flex">
              <div className="m-2 p-5 bg-red-700 text-white rounded-2xl border-2  font-semibold hover:bg-white hover:text-red-700 transition delay-150 duration-300 ease-in-out  ">
                <h4 className="flex items-center gap-1">
                  <FaHandHoldingHeart />
                  Get Help Now
                </h4>
              </div>
              <div className="m-2 p-5 bg-white border-2 rounded-2xl font-semibold flex items-center gap-1 hover:text-white hover:bg-black transition delay-150 duration-300 ease-in-out">
                <IoPersonAddSharp /> Join Service Provider
              </div>
            </div>
          </div>
          <div className="right-0 w-3xl">
            <img
              src="/public/Untitled design (3)-Photoroom.png"
              className="bg-"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
