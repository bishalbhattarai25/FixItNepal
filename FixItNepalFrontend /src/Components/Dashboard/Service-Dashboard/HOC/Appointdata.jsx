import {
  Calendar,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";


export  const stats = [
    {
      label: "Today",
      value: 1,
      icon: <Calendar size={18} />,
      bgColor: "bg-blue-50",
      iconBg: "bg-white",
      iconColor: "text-blue-500",
    },
    {
      label: "Upcoming",
      value: 1,
      icon: <Clock size={18} />,
      bgColor: "bg-orange-50",
      iconBg: "bg-white",
      iconColor: "text-orange-500",
    },
    {
      label: "Completed",
      value: 1,
      icon: <CheckCircle size={18} />,
      bgColor: "bg-green-50",
      iconBg: "bg-white",
      iconColor: "text-green-500",
    },
    {
      label: "All Appointments",
      value: 5,
      icon: <Users size={18} />,
      bgColor: "bg-purple-50",
      iconBg: "bg-white",
      iconColor: "text-purple-500",
    },
  ];


  export const appointments = Array(6).fill({
    name: "Sandiya Thapa",
    service: "Dental Cleaning",
    type: "Physical",
    date: "Jun 05, 2025",
    time: "10:00 AM (30 min)",
    status: "Scheduled",
  });