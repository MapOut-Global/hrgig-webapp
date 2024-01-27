import React from 'react';
import WelcomeImage from '../../../assets/signupwelcomeimg.jpg'

const WelcomeSection = () => {
  return (
    <div className="w-3/4 h-screen flex items-center justify-center bg-[url('https://s3.ap-south-1.amazonaws.com/s3.mapout.com/background1.jpg')] bg-cover bg-center">
    <img className='h-3/5 w-88 ' src={WelcomeImage} alt='Signup welcome' />
  </div>
  );
};

export default WelcomeSection;
