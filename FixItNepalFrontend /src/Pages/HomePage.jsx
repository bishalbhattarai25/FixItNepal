import React from 'react';
import TopSection from '../Components/Home/TopSection';
import SecondSec from '../Components/Home/SecondSec';
import ThirdSec from '../Components/Home/ThirdSec';
import FourthSec from '../Components/Home/FourthSec';
import FifthSec from '../Components/Home/FirthSec';
import Footer from '../Components/HOC/Footer';

function HomePage() {
  return (
    <div>
      <TopSection/>
      <SecondSec/>
      <ThirdSec />
      <FourthSec />
      <FifthSec />
      <Footer />
    
    
    </div>
  );
}

export default HomePage;
