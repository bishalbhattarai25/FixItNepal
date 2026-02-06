import React from 'react';
import { NavData } from './NavData';

function NavBar() {
  return (
    <div className='h-[60px] bg-white shadow-lg flex justify-between px-10 py-1 items-center '>

    <div className='text-2xl font-semibold drop-shadow-lg'>FixIt<span className='text-primary'>Nepal</span></div>
    <div className='flex gap-10 items-center'>
        {
            NavData.map((val)=> {
                return <div>{val.title}</div>
            })
        }
    </div>
    <div className='flex gap-1 items-center'>
        <button className='bg-primary h-[30px] text-black px-5  text-center font-semibold rounded-full'>Login</button>
        <button className='bg-secondary h-[30px] text-blck px-5  text-center font-semibold rounded-full'>Signup</button>

    </div>
    </div>
  );
}

export default NavBar;
