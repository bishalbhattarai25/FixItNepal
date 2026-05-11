import { NavLink, useNavigate } from "react-router-dom";
import { SideBar as SidebarData } from "./Data";

const SideBar = () => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action === "logout") {
      // clear storage
      localStorage.clear();

      navigate("/login");
    }
  };

  return (
    <nav className="space-y-1">
      {SidebarData.map((item, index) => {
        
        // ACTION ITEM (Logout)
        if (item.action) {
          return (
            <button
              key={index}
              onClick={() => handleAction(item.action)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <span className="text-lg">{item.logo}</span>
              {item.title}
            </button>
          );
        }

        return (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/servicecenter"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all relative
              ${
                isActive
                  ? "bg-red-50 text-red-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full" />
            <span className="text-lg">{item.logo}</span>
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default SideBar;