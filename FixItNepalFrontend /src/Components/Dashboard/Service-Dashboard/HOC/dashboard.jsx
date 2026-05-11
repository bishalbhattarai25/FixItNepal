import {
  ClipboardList,
  Wrench,
  Users,
  Wallet,
  
} from "lucide-react";
// 1. Data arrays keep the JSX clean and easy to read
  export const  stats = [
    { label: "Total Requests", value: "124", color: "text-red-500", icon: <ClipboardList size={20} /> },
    { label: "Active Jobs", value: "8", color: "text-blue-500", icon: <Wrench size={20} /> },
    { label: "Available", value: "14/22", color: "text-green-500", icon: <Users size={20} /> },
  ];