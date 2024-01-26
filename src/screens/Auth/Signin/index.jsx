import React from 'react'
import WelcomeBanner from '../WelcomeBanner'
import LinkedinIcon from '../../../assets/linkedinIcon.png'
import GoogleIcon from '../../../assets/googleIcon.png'
import { Link } from 'react-router-dom'

/**
* @author
* @function SignIn
**/

export const SignIn = (props) => {
    return (
        <React.Fragment>
            <div className="flex h-screen w-full">
                <WelcomeBanner />
                <div className=' flex h-screen w-full items-center justify-center  '>
                    <div className=' mt-20'>
                        <div className='flex items-center justify-between '><h1 className='text-4xl font-extrabold '>Sign In</h1>
                            <Link to="/signup" className='underline font-medium text-2xl'>Sign up</Link>
                        </div>

                        <h3 className='text-2xl font-medium mt-5 mb-16'>Continue with email</h3>
                        <p className='text-xl mt-4 mb-4'>Email*</p>
                        <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg' placeholder='jane@email.com' type='email' />
                        <p className='text-xl mt-4 mb-4'>Password*</p>
                        <input className='border-black border-0.2 text-xl p-3 w-full rounded-lg' placeholder='8+ characters' type='password' />

                        <div className='flex items-center justify-between gap-7 mt-16' >
                            <h3 className='text-2xl font-medium '>Or Choose</h3>
                            <div className=' flex items-center justify-center'>
                                <div className='flex items-center justify-center border-black border-0.2 px-1 py-4 w-64  rounded-2xl text-xl'><p>Sign in with Google</p><img className='h-7 ml-2' src={GoogleIcon} alt='' /></div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl'><p>Sign in with LinkedIn</p><img className='h-7 ml-2' src={LinkedinIcon} alt='' /></div>
                            </div>
                        </div>

                        <div className='flex items-center justify-start'> <div className='flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-10 cursor-pointer '>Sign In</div> </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}