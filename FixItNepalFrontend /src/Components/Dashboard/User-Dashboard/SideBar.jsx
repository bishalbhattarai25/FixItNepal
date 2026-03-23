import { NavLink } from "react-router-dom";
import { Sidebar as SidebarData } from "./Datalist"; // Your Sidebar array

const SideBar = () => {
  return (
    <nav className="flex-1 space-y-1">
      {SidebarData.map((list, index) => (
        <NavLink
          key={index}
          to={list.path}
          // "end" prevents the Dashboard link from staying red when 
          // you are on other sub-pages like /profile
          end={list.path === "/userdashboard"}
          className={({ isActive }) => `
            w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold transition-all rounded-xl
            ${isActive 
              ? "bg-red-50 text-red-500" 
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
          `}
        >
          <span className="text-xl">{list.logo}</span>
          {list.title}
        </NavLink>
      ))}
    </nav>
  );
}; 
export default SideBar;