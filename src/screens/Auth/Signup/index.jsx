import React, { useEffect, useState } from 'react'
import WelcomeBanner from '../WelcomeBanner'
import { QuickSignup } from './quick-signup'
import { EmailSignup } from './email-signup'
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../../app/auth/authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserEmail } from '../../../app/auth/authSlice';
import { SignupComponent } from "../Common/SignupComponent";


const SignUp = (props) => {
  const [isEmail, setIsEmail] = useState(false);
  
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  useEffect(() => {
    if (currentUserEmail) {
      navigate("/");
    }
  }, [currentUserEmail, navigate]);

  const SignupHandler = async ({name,email,password}) => {
    try {
      const { data } = await signUp({
        fullName: name,
        email,
        password,
      });

      console.log(data, "response");
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };

  const updateSignUpMethod = (value)=>{
    setIsEmail(value)
  }

  return (
    <React.Fragment>
      {/* <div className="flex h-screen w-full">
        
        <WelcomeBanner/>
        {isEmail ? <EmailSignup SignupHandler={SignupHandler} /> : <QuickSignup changeToEmailForm={updateSignUpMethod} />}

      </div> */}
      <div className="flex h-screen w-full">
        
        <WelcomeBanner/>
        {isEmail ? <SignupComponent isSignUp={true} /> : <QuickSignup changeToEmailForm={updateSignUpMethod} />}

      </div>
    </React.Fragment>
  );
};

export default SignUp