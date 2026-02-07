import React from 'react';
import{ Login }  from '../Components/Navigation/login';
import { UserRegister } from '../Components/UserRegister';
import TopSection from '../Components/Home/TopSection';
import SecondSec from '../Components/Home/SecondSec';

function HomePage() {
  return (
    <div>
      <TopSection/>
      <SecondSec/>
    
    </div>
  );
}

export default HomePage;
