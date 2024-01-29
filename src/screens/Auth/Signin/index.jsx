import React, { useState } from "react";
import WelcomeBanner from "../WelcomeBanner";
import LinkedinIcon from "../../../assets/linkedinIcon.png";
import GoogleIcon from "../../../assets/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../../app/auth/authApiSlice";
import { SignupComponent } from "../Common/SignupComponent";

/**
 * @author
 * @function SignIn
 **/

export const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const [signIn, { isLoading, error }] = useSignInMutation();
  
    const handleSignIn = async () => {
      try {
        // Reset previous errors
        setEmailError("");
        setPasswordError("");
  
        // Validation
        if (!email) {
          setEmailError("Email is required");
          return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          setEmailError("Invalid email format");
          return;
        }
  
        if (!password) {
          setPasswordError("Password is required");
          return;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
          }
  
        const { data } = await signIn({
          email,
          password,
        });
  
        console.log(data, "response");
  
        if (data && data.error === "email_taken") {
          setEmailError("This email is already taken");
          return;
        }
  
        // Clear form on successful sign-in
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error("SignIn Error:", error);
      }
    };
    
  return (
    <React.Fragment>
    <div className="flex h-screen w-full">
      <WelcomeBanner />
      <SignupComponent isSignUp={false} />
      {/* <div className=" flex h-screen w-full items-center justify-center  ">
        <div className=" mt-20">
          <div className="flex items-center justify-between ">
            <h1 className="text-4xl font-extrabold ">Sign In</h1>
            <Link to="/signup" className="underline font-medium text-2xl">
              Sign up
            </Link>
          </div>

          <h3 className="text-2xl font-medium mt-5 mb-16">
            Continue with email
          </h3>
          <p className="text-xl mt-4 mb-4">Email*</p>
          <input
            className={`border-black border-0.2 text-xl p-3 w-full rounded-lg ${
              emailError ? "border-red-500" : ""
            }`}
            placeholder="jane@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
          <p className="text-xl mt-4 mb-4">Password*</p>
          <input
            className={`border-black border-0.2 text-xl p-3 w-full rounded-lg ${
              passwordError ? "border-red-500" : ""
            }`}
            placeholder="8+ characters"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
            <div className="flex items-center justify-between gap-7 mt-16">
              <h3 className="text-2xl font-medium ">Or Choose</h3>
              <div className=" flex items-center justify-center">
                <div className="flex items-center justify-center border-black border-0.2 px-1 py-4 w-64  rounded-2xl text-xl">
                  <p>Sign in with Google</p>
                  <img className="h-7 ml-2" src={GoogleIcon} alt="" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl">
                  <p>Sign in with LinkedIn</p>
                  <img className="h-7 ml-2" src={LinkedinIcon} alt="" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start">
              {" "}
              <div
                className="flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-10 cursor-pointer "
                onClick={handleSignIn}
              >
                Sign In
              </div>{" "}
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};
