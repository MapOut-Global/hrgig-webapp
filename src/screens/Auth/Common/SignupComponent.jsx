import React, { useEffect, useState } from "react";
import LinkedinIcon from "../../../assets/linkedinIcon.png";
import GoogleIcon from "../../../assets/googleIcon.png";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { LinkedinOAuthUrl } from "../../../config";
import {
  useGoogleSignInMutation,
  useSignInMutation,
  useSignUpMutation,
} from "../../../app/auth/authApiSlice";
import { toastAlert } from "../../../utils/alert";

export const SignupComponent = ({ isSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const linkedinOAuthUrl = LinkedinOAuthUrl;
  const [
    signUp,
    {
      isSuccess: isSignUpSuccess,
      isLoading: isSignUpLodaing,
      isError: isSignUpError,
      error: signUpError,
    },
  ] = useSignUpMutation();
  const [
    signIn,
    {
      isSuccess: isSignInSuccess,
      isLoading: isSignInLodaing,
      isError: isSignInError,
      error: signInError,
    },
  ] = useSignInMutation();
  const [
    googleSignin,
    { isError: isGoogleError, error: googleError, isLoading: isGoogleLoading },
  ] = useGoogleSignInMutation();

  useEffect(() => {
    console.log('ERRORRORO',signInError)
    if (isSignUpSuccess || isSignInSuccess) { 
      setName("");
      setEmail("");
      setPassword("");
    }
    if (isSignUpError) {
      if (signUpError.status === 409) setEmailError(signUpError?.data?.message);
      toastAlert(signUpError?.data?.message, "error");
    }
    if (isSignInError) {
      if (signInError.status === 404) setEmailError(signInError?.data?.message);
      if (signInError.status === 401)
        setPasswordError(signInError?.data?.message);
      toastAlert(signInError?.data?.message, "error");
    }
  }, [isSignUpError, isSignInError, isSignInSuccess, isSignUpSuccess]);

  useEffect(() => {
    if (isGoogleError) {
      toastAlert(googleError?.data?.message, "error");
    }
  }, [isGoogleError]);

  const handleSubmit = async () => {
    console.log("Submit")
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
      ? signUp({
          fullName: name,
          email,
          password,
        })
      : signIn({
          email,
          password,
        });
  };

  const GoogleSigninHandler = async ({ access_token }) => {
    if (access_token) {
      googleSignin({
        token: access_token,
        requestFrom: "hrgig",
      });
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => GoogleSigninHandler(tokenResponse),
  });

  return (
    <React.Fragment>
      <div className=" flex h-screen w-full items-center justify-center  ">
        <div className={`${isSignUp && 'mt-24'}`}>
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
            <button
              className={`flex items-center justify-center bg-Grey-Blue text-white py-4 px-20 rounded-40 mt-4 mb-4 ${isSignUpLodaing || isSignInLodaing ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={
                !isSignUpLodaing && !isSignInLodaing && !isGoogleLoading
                  ? handleSubmit
                  : null
              }
              disabled={isSignUpLodaing || isSignInLodaing || isGoogleLoading}
            >
              {isSignUpLodaing || isSignInLodaing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="flex items-center justify-between gap-7">
            <h3 className="text-2xl font-medium ">Or Choose</h3>
            <div className="flex items-center justify-center">
              <button
                className={`flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl ${
                  isSignUpLodaing || isSignInLodaing
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={!isGoogleLoading ? handleGoogleLogin : null}
                disabled={isSignUpLodaing || isSignInLodaing}
              >
                <p>
                  {isGoogleLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  ) : isSignUp ? (
                    "Sign up with Google"
                  ) : (
                    "Sign in with Google"
                  )}
                </p>
                <img className="h-7 ml-2" src={GoogleIcon} alt="" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button
                className={`flex items-center justify-center ${
                  isGoogleLoading || isSignUpLodaing || isSignInLodaing
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isGoogleLoading || isSignUpLodaing || isSignInLodaing}
              >
                <a href={linkedinOAuthUrl}>
                  <div className="flex items-center justify-center border-black border-0.2 px-1 py-4 w-64 rounded-2xl text-xl">
                    <p>
                      {isSignUp
                        ? "Sign up with LinkedIn"
                        : "Sign in with LinkedIn"}
                    </p>
                    <img className="h-7 ml-2" src={LinkedinIcon} alt="" />
                  </div>
                </a>
              </button>
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
