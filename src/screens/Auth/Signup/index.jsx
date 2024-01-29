import React, { useEffect, useState } from 'react'
import WelcomeBanner from '../WelcomeBanner'
import { QuickSignup } from './quick-signup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUserEmail } from '../../../app/auth/authSlice';
import { SignupComponent } from '../Common/SignupComponent';

const SignUp = (props) => {
  const [isEmail, setIsEmail] = useState(false);

  const navigate = useNavigate();
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  useEffect(() => {
    if (currentUserEmail) {
      navigate("/");
    }
  }, [currentUserEmail, navigate]);

  const updateSignUpMethod = (value)=>{
    setIsEmail(value)
  }

  return (
    <React.Fragment>
      <div className="flex h-screen w-full">
        <WelcomeBanner/>
        { isEmail ? <SignupComponent isSignUp={true}/> : <QuickSignup changeToEmailForm={updateSignUpMethod}  />}
      </div>
    </React.Fragment>
  );
}; 

export default SignUp