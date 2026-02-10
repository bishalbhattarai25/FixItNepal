import React from 'react';
import{ Login }  from '../Components/Navigation/login';
import { UserRegister } from '../Components/UserRegister';
import TopSection from '../Components/Home/TopSection';
import SecondSec from '../Components/Home/SecondSec';
import ThirdSec from '../Components/Home/ThirdSec';
import FourthSec from '../Components/Home/FourthSec';
import FifthSec from '../Components/Home/FirthSec';

function HomePage() {
  return (
    <div>
      <TopSection/>
      <SecondSec/>
      <ThirdSec />
      <FourthSec />
      <FifthSec />
    
    
    </div>
  );
}

export default HomePage;
