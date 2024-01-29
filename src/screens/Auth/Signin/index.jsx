import React, { useEffect } from 'react'
import WelcomeBanner from '../WelcomeBanner'
import LinkedinIcon from '../../../assets/linkedinIcon.png'
import GoogleIcon from '../../../assets/googleIcon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux'
import { useGoogleSignInMutation } from '../../../app/auth/authApiSlice'
import { selectCurrentUserEmail } from '../../../app/auth/authSlice'
import { LinkedinOAuthUrl } from '../../../config'

/**
 * @author
 * @function SignIn
 **/

export const SignIn = (props) => {

    const linkedinOAuthUrl = LinkedinOAuthUrl
    const navigate = useNavigate();
    const [googleSignin, { isGoogleAuthLoading }] = useGoogleSignInMutation();
    const currentUserEmail = useSelector(selectCurrentUserEmail);

    useEffect(() => {
        if (currentUserEmail) {
            navigate("/");
        }
    }, [currentUserEmail, navigate]);

    const GoogleSigninHandler = async ({access_token})=>{
        try {
          const { data } = await googleSignin({
            token:access_token,
            requestFrom:"hrgig"
          });
          console.log(data, "response");
        } catch (error) {
          console.error("Google Signin Error:", error);
        }
      }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: tokenResponse => GoogleSigninHandler(tokenResponse)
    });
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
                                    <div className='flex items-center justify-center border-black border-0.2 px-1 py-4 w-64  rounded-2xl text-xl cursor-pointer'
                                        onClick={() => handleGoogleLogin()}
                                    ><p>Sign in with Google</p><img className='h-7 ml-2' src={GoogleIcon} alt='' /></div>
                                </div>
                                <div className='flex items-center justify-center'><a href={linkedinOAuthUrl}>
                                    <div className=' flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl cursor-pointer'><p>Sign in with LinkedIn</p><img className='h-7 ml-2' src={LinkedinIcon} alt='' /></div>
                                    </a>
                                </div>
                            </div>

                            <div className='flex items-center justify-start'> <div className='flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-10 cursor-pointer '>Sign In</div> </div>

                        </div>
                    </div>
                </div>
        </React.Fragment> 
    )}

  //           <div className="flex items-center justify-start">
  //             {" "}
  //             <div
  //               className="flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-10 cursor-pointer "
  //               onClick={handleSignIn}
  //             >
  //               Sign In
  //             </div>{" "}
  //           </div>
  //         </div>
  //       </div> */}
  //     </div>
  //   </React.Fragment>
  // );
// };
