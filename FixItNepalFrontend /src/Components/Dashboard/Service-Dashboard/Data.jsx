import { IoMdHome } from "react-icons/io";
import { FaHand } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

export const SideBar = [
  {
    title: "Dashboard",
    logo: <IoMdHome />,
    path:"/servicecenter"
  },
  {
    title: "LiveTracking",
    logo: <FaLocationCrosshairs />,
    path: "/servicecenter/livetracking"
  },
  {
    title: "Appointment",
    logo: <FaHand />,
    path: "/servicecenter/appointment"
  },
   {
    title: "Profile",
    logo: <FaHand />,
    path: "/servicecenter/profile"
  },
   {
    title: "Request History",
    logo: <FaHand />,
    path: "/servicecenter/requesthistory"
  },
     {
    title: "Logout",
    logo: <IoPersonSharp />,
    action: "logout", 
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

];
