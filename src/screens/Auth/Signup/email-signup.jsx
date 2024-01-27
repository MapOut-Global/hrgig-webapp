import React, { useState } from 'react'
import LinkedinIcon from '../../../assets/linkedinIcon.png'
import GoogleIcon from '../../../assets/googleIcon.png'
import { Link } from 'react-router-dom'

/**
* @author
* @function EmailSignup
**/

export const EmailSignup = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () =>{
    props.SignupHandler({name,email,password})
    // setEmail("")
    // setName("")
    // setPassword("")
  }


  return(
    <React.Fragment>
      <div className=' flex h-screen w-full items-center justify-center  '>
        <div className=' mt-24'>
          <div className='flex items-center justify-between '><h1 className='text-4xl font-extrabold '>Sign Up</h1>
            <Link to="/signin" className='underline font-medium text-2xl'>Sign in</Link>
          </div>
          <h3 className='text-2xl font-medium mt-5'>Create account with email</h3>

          <p className='text-xl mt-4 mb-4'>Name*</p>
          <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg'
            placeholder='Jane Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className='text-xl mt-4 mb-4'>Email*</p>
          <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg'
            placeholder='jane@email.com'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='text-xl mt-4 mb-4'>Password*</p>
          <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg'
            placeholder='8+ characters'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex items-center justify-end'>
            <div className='flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-4 mb-4 cursor-pointer '
              onClick={handleSignUp}
            >Sign Up</div>
          </div>

          <div className='flex items-center justify-between gap-7'>
            <h3 className='text-2xl font-medium '>Or Choose</h3>
            <div className=' flex items-center justify-center'>
              <div className='flex items-center justify-center border-black border-0.2 px-1 py-4 w-64  rounded-2xl text-xl'><p>Sign up with Google</p><img className='h-7 ml-2' src={GoogleIcon} alt='' /></div>
            </div>
            <div className='flex items-center justify-center'>
              <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl'><p>Sign up with LinkedIn</p><img className='h-7 ml-2' src={LinkedinIcon} alt='' /></div>
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
    </React.Fragment>
   )

 }