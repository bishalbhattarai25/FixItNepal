import { IoPeople } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";





export const stateCard = [
  {
    titl: "Total Customers",
    value: "5,251",
    increase: "+14%",
    icon: <IoPeople />,
  },
  {
    title: "Active User",
    value: "7,916",
    increase: "+21%",
    icon: <FaUser />,
  },
  {
    title: "Inactive User",
    value: "59,525",
    increase: "+5%",
    icon: <FaUserClock />,
  },
  {
    title: "Yearly service",
    value: "65,152",
    increase: "+43%",
    icon: <FaScrewdriverWrench />
,
  },
];
