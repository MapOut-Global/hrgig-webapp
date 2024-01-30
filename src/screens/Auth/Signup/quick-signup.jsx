import React, { useEffect } from "react";
import LinkedinIcon from "../../../assets/linkedinIcon.png";
import GoogleIcon from "../../../assets/googleIcon.png";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { LinkedinOAuthUrl } from "../../../config";
import { useGoogleSignInMutation } from "../../../app/auth/authApiSlice";
import { toastAlert } from "../../../utils/alert";

export const QuickSignup = (props) => {
  const linkedinOAuthUrl = LinkedinOAuthUrl;
  const [googleSignin, { isError, error, isLoading }] =
    useGoogleSignInMutation();

  const signUpMethodHandler = () => {
    props.changeToEmailForm(true);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => GoogleSigninHandler(tokenResponse),
  });
  const GoogleSigninHandler = async ({ access_token }) => {
    if (access_token) {
      googleSignin({
        token: access_token,
        requestFrom: "hrgig",
      });
    }
  };

  useEffect(() => {
    if (isError) {
      toastAlert(error?.data?.message, "error");
    }
  }, [isError]);

  return (
    <React.Fragment>
      <div className="flex h-screen w-full  items-center justify-center ">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold p-5 mt-28">Sign Up</h1>
          <div className="mt-3 mb-10 flex items-center justify-center">
            <button
              className=" flex items-center justify-center border-black border-0.2 px-1 py-4 w-72  rounded-2xl text-xl"
              onClick={!isLoading ? handleGoogleLogin : null}
            >
              <p>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  "Sign up with Google"
                )}
              </p>

              <img className="h-7 ml-2" src={GoogleIcon} alt="" />
            </button>
          </div>

          <div className="mt-3 mb-10 flex items-center justify-center">
            <button
              className="flex items-center justify-center"
              disabled={isLoading}
            >
              <a href={linkedinOAuthUrl}>
                <div className=" flex items-center justify-center border-black border-0.2 px-1 py-4 w-72 rounded-2xl text-xl cursor-pointer">
                  <p>Sign up with LinkedIn</p>
                  <img className="h-7 ml-2" src={LinkedinIcon} alt="" />
                </div>
              </a>
            </button>
          </div>

          <h3 className="text-2xl font-medium mb-2">or</h3>
          <h3 className="text-2xl font-medium">
            Create account with{" "}
            <button
              onClick={signUpMethodHandler}
              className="underline cursor-pointer"
              disabled={isLoading}
            >
              email
            </button>
          </h3>
          <br />
          <br />
          <div className="flex items-center justify-center text-lg font-medium mb-4 mt-10">
            <p>Already have an account with us? &nbsp; </p>
            <button disabled={isLoading}>
              {" "}
              <Link className="underline" to="/signin">
                Sign in
              </Link>
            </button>
          </div>
          <p className="text-xs tracking-tight font-thin ">
            By Signing Up, you agree with our{" "}
            <span className="underline">Terms & Conditions</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
