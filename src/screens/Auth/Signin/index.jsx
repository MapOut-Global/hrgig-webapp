import React, { useEffect } from "react";
import WelcomeBanner from "../WelcomeBanner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserEmail } from "../../../app/auth/authSlice";
import { SignupComponent } from "../Common/SignupComponent";

export const SignIn = (props) => {
  const navigate = useNavigate();
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  useEffect(() => {
    if (currentUserEmail) {
      navigate("/");
    }
  }, [currentUserEmail, navigate]);

  return (
    <React.Fragment>
      <div className="flex h-screen w-full">
        <WelcomeBanner />
        <SignupComponent isSignUp={false} />
      </div>
    </React.Fragment>
  );
};
