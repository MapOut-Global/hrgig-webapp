import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCurrentUserEmail,
  logout as logoutAction,
} from "../../app/auth/authSlice";

const Home = () => {
  const currentUserEmail = useSelector(selectCurrentUserEmail);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: "5rem",
        }}
      >
        <span> {currentUserEmail ? currentUserEmail: "Home"}</span>
        <span>
          <Link to="/signup">Sign Up</Link>
        </span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
