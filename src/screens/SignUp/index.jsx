import React from 'react'
import WelcomeImage from '../../assets/signupwelcomeimg.jpg'
import LinkedinIcon from '../../assets/linkedinIcon.png'
import GoogleIcon from '../../assets/googleIcon.png'

const SignUp = () => {
  return (
    
    <div className="flex h-screen w-full">

      <div className="w-3/4 h-screen flex items-center justify-center bg-[url('/Users/basitraza/Desktop/Mapout/hrgig-webapp/src/assets/background1.jpg')] bg-cover bg-center">
        <img className='h-3/5 w-88 ' src={WelcomeImage} alt='Signup welcome' />
      </div>

       {/* Signup Main */}
      {/* <div className="flex h-screen w-full  items-center justify-center ">
        <div className="text-center">
          <h1 className='text-4xl font-extrabold p-5 mt-28'>Sign Up</h1>
          <div className='mt-3 mb-10 flex items-center justify-center'>
            <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-72  rounded-2xl text-xl'><p>Sign up with Google</p><img className='h-7 ml-2' src={GoogleIcon} /></div>
          </div>
          <div className='my-7 flex items-center justify-center'>
            <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-72 rounded-2xl text-xl' ><p>Sign up with LinkedIn</p><img className='h-7 ml-2' src={LinkedinIcon} /></div>
          </div>
          <h3 className='text-2xl font-medium mb-2'>or</h3>
          <h3 className='text-2xl font-medium'>Create account with <span className='underline-offset-from-font underline'>email</span></h3>
          <br />
          <br />
          <div className='flex items-center justify-center text-lg font-medium mb-4 mt-10'>
            <p>Already have an account with us? &nbsp; </p>
            <div><p className='underline'>  Sign in</p></div>
          </div>
          <p className='text-xs tracking-tight font-thin '>By Signing Up, you agree with our <span className='underline'>Terms & Conditions</span> and <span className='underline'>Privacy Policy</span></p>
        </div>
      </div> */}

      {/* Signup-email */}
      <div className='  h-screen w-full '>
        <div className='mx-16 mt-24'>
          <div className='flex items-center justify-between '><h1 className='text-4xl font-extrabold '>Sign Up</h1>
            <p className='underline font-medium text-xl'>Sign in</p>
          </div>

          <h3 className='text-2xl font-medium mt-5'>Create account with email</h3>
          <p className='text-xl mt-4 mb-4'>Name*</p>
          <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg'  placeholder='Jane Doe'/>
          <p className='text-xl mt-4 mb-4'>Email*</p>
          <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg'  placeholder='jane@email.com'/>
          <p className='text-xl mt-4 mb-4'>Password*</p>
          <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg'  placeholder='8+ characters'/>

          <div className='flex items-center justify-end'> <div className='flex items-center justify-center bg-authButton text-white py-4 px-14 rounded-40 mt-4 mb-4 '>Sign Up</div> </div>

          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-medium '>Or Choose</h3>
            <div className=' flex items-center justify-center'>
              <div className='flex items-center justify-center border-black border-0.2 px-1 py-4 w-64  rounded-2xl text-xl'><p>Sign up with Google</p><img className='h-7 ml-2' src={GoogleIcon} /></div>
            </div>
            <div className='flex items-center justify-center'>
              <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl' ><p>Sign up with LinkedIn</p><img className='h-7 ml-2' src={LinkedinIcon} /></div>
            </div>
          </div>
          <div className='flex items-center justify-center m-14'>
            <div className='text-xs tracking-tight font-thin '>
            <p>By Signing Up, you agree with our</p>
            <p> <span className='underline'> Terms & Conditions</span>  and <span className='underline'>Privacy Policy</span>.</p>
            </div>
          </div>
        </div>
      </div>
      
     </div>

  );
};

export default SignUp