import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
      <div  style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "5rem",
      }}>
        <span> Home
        </span>
        <span>
          <Link to="/signUp">Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default Home;
