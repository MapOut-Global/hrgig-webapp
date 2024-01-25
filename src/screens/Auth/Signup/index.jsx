import React, { useState } from 'react'
import WelcomeBanner from '../WelcomeBanner'
import { QuickSignup } from './quick-signup'
import { EmailSignup } from './email-signup'

const SignUp = (props) => {
  const [isEmail, setIsEmail] = useState(false);

  const updateSignUpMethod = (value)=>{
    setIsEmail(value)
  }

  return (
    <React.Fragment>
      <div className="flex h-screen w-full">
        
        <WelcomeBanner/>
        {isEmail ? <EmailSignup/> : <QuickSignup changeToEmailForm={updateSignUpMethod} />}

      </div>
    </React.Fragment>
  );
};

export default SignUp