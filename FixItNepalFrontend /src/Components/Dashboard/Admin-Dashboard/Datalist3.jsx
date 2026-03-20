import { IoMdHome } from "react-icons/io";
import { FaHand } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
export const Sidebar = [
  {
    title: "Dashboard",
    logo: <IoMdHome />,
    path:"/dashboard"
  },
     {
    title: "Pending Verification",
    logo: <MdPendingActions />,
    path: "/requesthelp"
  },
  {
    title: "Center List",
    logo: <FaHand />,
    path: "/centerlist"
  },
  {
    title: "Mechanic List",
    logo: <FaHand />,
    path: "/mechaniclist"
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
