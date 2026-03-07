import React from 'react';
import { NavData } from './NavData';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  
  // Get auth data from localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.clear(); // Clears token, role, and userId
    navigate('/login');
  };

  return (
    <div className='h-[60px] bg-white shadow-lg flex justify-between px-10 py-1 items-center'>
      
      {/* Brand Logo */}
      <div className='text-2xl font-semibold drop-shadow-lg'>
        FixIt<span className='text-red-500'>Nepal</span>
      </div>

      {/* Filtered Navigation Links */}
      <div className='flex gap-10 items-center'>
        {NavData.map((val, index) => {
          // If a role is required and it doesn't match the current user, don't render it
          if (val.role && val.role !== userRole) {
            return null;
          }

          return (
            <div key={index}>
              <NavLink 
                to={val.path}
                className={({ isActive }) => 
                  isActive 
                    ? "text-red-500 font-bold border-b-2 border-red-500" 
                    : "text-gray-600 hover:text-red-400 transition"
                }
              >
                {/* {val.title} */}
              </NavLink>
            </div>
          );
        })}
      </div>

      {/* Auth Buttons: Toggle between Login/Register and Logout */}
      <div className='flex gap-2 items-center'>
        {!token ? (
          <>
            <NavLink to={'/login'}>
              <button className='bg-red-600 h-[35px] text-white px-5 font-semibold rounded-full hover:bg-red-700 transition'>
                Login
              </button>
            </NavLink>
            <NavLink to={'/register'}>
              <button className='bg-blue-600 h-[35px] text-white px-5 font-semibold rounded-full hover:bg-blue-700 transition'>
                Register
              </button>
            </NavLink>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded capitalize">
              {userRole}
            </span>
            <button 
              onClick={handleLogout}
              className='border-2 border-red-600 text-red-600 h-[35px] px-5 font-semibold rounded-full hover:bg-red-600 hover:text-white transition'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;