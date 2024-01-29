import React, { useState } from "react";
import LinkedinIcon from "../../../assets/linkedinIcon.png";
import GoogleIcon from "../../../assets/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../../app/auth/authApiSlice";

export const SignupComponent = ({ isSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [signUp, { isLoading: isSignUpLodaing, error: isSignUpError }] =
    useSignUpMutation();
  const [signIn, { isLoading: isSignInLodaing, error: isSignInError }] =
    useSignInMutation();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Reset previous errors
      isSignUp && setNameError("");
      setEmailError("");
      setPasswordError("");

      if (isSignUp && !name) {
        setNameError("Name is required");
        return;
      }

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

      const response = isSignUp
        ? await signUp({
            fullName: name,
            email,
            password,
          })
        : await signIn({
            email,
            password,
          });
          console.log(response, "response");
          
      // if (data && data.error === "email_taken") {
      //   setEmailError("This email is already taken");
      //   return;
      // }

      // Clear form on successful sign-in
      isSignUp && setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("SignIn Error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className=" flex h-screen w-full items-center justify-center  ">
        <div >
          <div className="flex items-center justify-between ">
            <h1 className="text-4xl font-extrabold ">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            <Link
              to={isSignUp ? "/signin" : "/signup"}
              className="underline font-medium text-2xl"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </div>
          <h3 className="text-2xl font-medium mt-5">
            {isSignUp ? "Create account with email" : "Continue with email"}
          </h3>

          {isSignUp && (
            <>
              <p className="text-xl mt-4 mb-4">Name*</p>
              <input
                className={`border-black border-0.2 text-xl p-3 w-full rounded-lg ${
                  nameError ? "border-red-500" : ""
                }`}
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">{nameError}</p>
              )}
            </>
          )}

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

          <div className="flex items-center justify-end">
            <div
              className="flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-4 mb-4 cursor-pointer "
              onClick={handleSubmit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </div>
          </div>

          <div className="flex items-center justify-between gap-7">
            <h3 className="text-2xl font-medium ">Or Choose</h3>
            <div className=" flex items-center justify-center">
              <div className="flex items-center justify-center border-black border-0.2 px-1 py-4 w-64  rounded-2xl text-xl">
                <p>
                  {isSignUp ? "Sign up with Google" : "Sign in with Google"}
                </p>
                <img className="h-7 ml-2" src={GoogleIcon} alt="" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className=" flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl">
                <p>
                  {isSignUp ? "Sign up with LinkedIn" : "Sign in with LinkedIn"}
                </p>
                <img className="h-7 ml-2" src={LinkedinIcon} alt="" />
              </div>
            </div>
          </div>

          {isSignUp && (
            <div className="flex items-center justify-center m-14">
              <div className="text-xs tracking-tight font-thin ">
                <p>By Signing Up, you agree with our</p>
                <p>
                  {" "}
                  <span className="underline">
                    {" "}
                    Terms & Conditions
                  </span> and <span className="underline">Privacy Policy</span>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
