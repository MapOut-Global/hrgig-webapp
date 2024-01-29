import React from 'react'
import LinkedinIcon from '../../../assets/linkedinIcon.png'
import GoogleIcon from '../../../assets/googleIcon.png'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { LinkedinOAuthUrl } from '../../../config';
/**
* @author
* @function QuickSignup
**/

export const QuickSignup = (props) => {

  const linkedinOAuthUrl = LinkedinOAuthUrl

  const signUpMethodHandler = ()=>{
    props.changeToEmailForm(true)
  }
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => props.GoogleSigninHandler(tokenResponse)
  });

  return(
    <React.Fragment>
       <div className="flex h-screen w-full  items-center justify-center ">
        <div className="text-center">
          <h1 className='text-4xl font-extrabold p-5 mt-28'>Sign Up</h1>
          <div className='mt-3 mb-10 flex items-center justify-center'>
            <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-72  rounded-2xl text-xl cursor-pointer'
                 onClick={() => handleGoogleLogin()} 
            >
              <p>Sign up with Google</p><img className='h-7 ml-2' src={GoogleIcon} alt='' />
            </div>
          </div>
          <div className='my-7 flex items-center justify-center'><a href={linkedinOAuthUrl}>
            <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-72 rounded-2xl text-xl cursor-pointer' 
            ><p>Sign up with LinkedIn</p><img className='h-7 ml-2' src={LinkedinIcon} alt='' /></div></a>
          </div>
          <h3 className='text-2xl font-medium mb-2'>or</h3>
          <h3 className='text-2xl font-medium'>Create account with <span onClick={signUpMethodHandler} className='underline cursor-pointer'>email</span></h3>
          <br />
          <br />
          <div className='flex items-center justify-center text-lg font-medium mb-4 mt-10'>
            <p>Already have an account with us? &nbsp; </p>
            <Link className='underline' to="/signin">Sign in</Link>
          </div>
          <p className='text-xs tracking-tight font-thin '>By Signing Up, you agree with our <span className='underline'>Terms & Conditions</span> and <span className='underline'>Privacy Policy</span></p>
        </div>
      </div> 
    </React.Fragment> 
   )

 }