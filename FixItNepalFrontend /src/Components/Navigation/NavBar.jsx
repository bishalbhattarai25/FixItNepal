import React from 'react';
import { NavData } from './NavData';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className='h-[60px] bg-white shadow-lg flex justify-between px-10 py-1 items-center '>

    <div className='text-2xl font-semibold drop-shadow-lg'>FixIt<span className='text-primary'>Nepal</span></div>
    <div className='flex gap-10 items-center'>
        {
            NavData.map((val)=> {
                return(<div>

                    <NavLink
                 to={val.path}
                 >
                    {val.title}
                </NavLink>
                </div>)
                    
            })
        }
    </div>
    <div className='flex gap-1 items-center'>
        <NavLink to={'/login'}>
                    <button  className='bg-primary h-[30px] text-black px-5  text-center font-semibold rounded-full'>Login</button>

        </NavLink>
        <button className='bg-secondary h-[30px] text-blck px-5  text-center font-semibold rounded-full'>Register</button>

    </div>
    </div>
  );
}

export default NavBar;
