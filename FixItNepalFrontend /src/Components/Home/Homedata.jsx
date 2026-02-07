import { LuBike } from "react-icons/lu";
import { FaTools } from "react-icons/fa";
import { TbBuildingCottage } from "react-icons/tb";


export const ListData = [
  {
    logo: <LuBike />,
    logocolor: "bg-red-600",
    Topic: "Rider",
    title1: "Breakdown rescue on-demand",
    title2: "Live GPS tracking",
    title3: "Secure digital payment",
    button: "I'm a Rider",
    bgcolor: "bg-red-200",
    btncolor: "bg-red-500",
    borderColor: "hover:border-red-500"
  },
  {
    logo: <FaTools />,
    logocolor: "bg-[#FF6B4A]",
    Topic: "Mechanics & Garages",
    title1: "Get nearby job requests",
    title2: "Real-time booking alert",
    title3: "Performance dashboard",
    button: "I'm a Mechanic",
    bgcolor: "bg-[#FFE8E3]",
    btncolor: "bg-[#FF6B4A]",
    borderColor: "hover:border-[#FF6B4A]"
  },
  {
    logo: <TbBuildingCottage />,
    logocolor: "bg-[#4F46E5]",
    Topic: "Emergency Partners",
    title1: "Accident response coordination",
    title2: "Real-time location sharing",
    title3: "Central command dashboard",
    button: "I'm a Partner",
    bgcolor: "bg-[#B8B9FF]",
    btncolor: "bg-[#4F46E5]",
    borderColor: "hover:border-[#4F46E5]"
  }
];
