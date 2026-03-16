import { IoMdHome } from "react-icons/io";
import { FaHand } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

export const Sidebar = [
  {
    title: "Dashboard",
    logo: <IoMdHome />,
    path:"/dashboard"
  },
  {
    title: "Map",
    logo: <FaHand />,
    path: "/requesthelp"
  }
//   {
//     title: "Nearby Mechanics",
//     logo: <GiAutoRepair />,
//     path: "/nearbymechanics"
//   },
//   {
//     title: "Live Tracking",
//     logo: <FaLocationCrosshairs />,
//     path:"/livetarcking"
//   },
//   {
//     title: "Service History",
//     logo: <FaHistory />,
//     path:"/servoceHistory"
//   },
//   {
//     title: "Wallet/Payments",
//     logo: <FaWallet />,
//     path: "/payments"
//   },
//   {
//     title: "Maintence Alert",
//     logo: <HiMiniBellAlert />,
//     path: "/maintence"
//   },
//   {
//     title: "Profile/Setting",
//     logo: <IoPersonSharp />,
//     path:"/profile"
//   },
];
