import { LuBike } from "react-icons/lu";
import { FaTools } from "react-icons/fa";
import { TbBuildingCottage } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";
import { FaMountain } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";










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
    borderColor: "hover:border-red-500",
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

export const WorkData = [
  {
    logo: <ImLocation />,
    Topic: "Share GPS Location",
    subbody: "Tap once and your exact location is sent to our system instantly",
    logobg: "bg-red-600",
    textbg: "bg-red-500"
  },
  {
    logo: <IoSearch />,
    Topic: "System Finds Provider",
    subbody: "AI matches you with the nearest verified mechanic or service provider",
    logobg: "bg-[#FF6B4A]",
    textbg: "bg-[#F0A899]"
  },
  {
    logo: <FaTools />,
    Topic: "Get Instant Help",
    subbody: "Your mechanic arrives and resolves your issue on the spot",
    logobg: "bg-indigo-600",
    textbg: "bg-indigo-500"
  }
];


export const Features = [
  {
    icon: <ImLocation />,
    title: "GPS-Based Discovery",
    desc: "Find mechanics and services based on your exact location",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <IoSearch />,
    title: "Proximity Assignment",
    desc: "Smart algorithm assigns nearest available provider instantly",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <MdOutlineEventAvailable />,
    title: "Live Booking System",
    desc: "Book services in real-time with instant confirmation",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <IoNotifications />,
    title: "Push Notifications",
    desc: "Get instant updates on booking status and mechanic arrival",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <MdPayment />,
    title: "Digital Payments",
    desc: "Secure cashless transactions with multiple payment options",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <MdHistory />,
    title: "Service History",
    desc: "Track all your past bookings and service records",
    color: "bg-yellow-100 text-yellow-600",
  },
];


export const WhyFeatures = [
  {
    icon: <BsSpeedometer />,
    title: "50% Faster",
    desc: "Response time compared to traditional methods",
    color: "bg-white/20 text-white",
  },
  {
    icon: <FaShieldAlt />,
    title: "100% Verified",
    desc: "All service providers background checked",
    color: "bg-white/20 text-white",
  },
  {
    icon: <FaMountain />,
    title: "Nepal Roads",
    desc: "Designed for local terrain and conditions",
    color: "bg-white/20 text-white",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Ready",
    desc: "Emergency support available round the clock",
    color: "bg-white/20 text-white",
  },
];
