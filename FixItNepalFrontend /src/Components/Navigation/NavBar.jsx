import React from "react";
import { NavData } from "./NavData";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 h-[60px] bg-white border-b border-gray-100 shadow-sm flex justify-between px-6 md:px-10 items-center">

      {/* Brand */}
      <div onClick={()=> {
        navigate('/')
      }} className='text-2xl font-semibold drop-shadow-lg cursor-pointer'>
        FixIt<span className='text-red-500'>Nepal</span>
      </div>

      {/* Nav links */}
      <div className="flex gap-8 items-center">
        {NavData.map((val, index) => {
          if (val.role && val.role !== userRole) return null;
          return (
            <NavLink
              key={index}
              to={val.path}
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 font-semibold text-sm border-b-2 border-red-500 pb-0.5"
                  : "text-gray-500 hover:text-gray-900 text-sm transition-colors"
              }
            >
              {val.title}
            </NavLink>
          );
        })}
      </div>

      {/* Auth */}
      <div className="flex gap-2 items-center">
        {!token ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Register
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full capitalize">
              {userRole}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
