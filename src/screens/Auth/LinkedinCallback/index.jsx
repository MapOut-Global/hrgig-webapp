import React from "react";
import { useNavigate } from "react-router-dom";
import { useLinkedinSignInMutation } from "../../../app/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserEmail } from "../../../app/auth/authSlice";

function handleQuery() {
  return new URLSearchParams(window.location.search);
}

export const LinkedinCallback = (props) => {
  const navigate = useNavigate();
  const [linkedinSignIn, { isLinkedinAuthLoading }] =
    useLinkedinSignInMutation();
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  const linkedinSignInHandler = async ({ code }) => {
    const { data } = await linkedinSignIn({
      uri: `${window.location.protocol}//${window.location.host}`,
      code: code,
      requestFrom: "hrgig",
    });
    if (data) {
      if (currentUserEmail) {
        navigate("/");
      }
    } else {
      if (!currentUserEmail) {
        navigate(-1);
      }
    }
  };

  const query = handleQuery();

  React.useEffect(() => {
    const code = query.get("code");
    if (code) {
      linkedinSignInHandler({ code });
    }
  }, []);

  React.useEffect(() => {
    if (currentUserEmail) {
      navigate("/");
    }
  }, [currentUserEmail, navigate]);

  return (
    <div className=" flex items-center justify-center mt-20">
      {" "}
      Please wait....
    </div>
  );
};
