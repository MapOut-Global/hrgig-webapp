import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../app/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserEmail } from "../../app/auth/authSlice";
import LinkedInOAuth from "./LinkedIn";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [signUp, { isLoading }] = useSignUpMutation();
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  useEffect(() => {
    if (currentUserEmail) {
      navigate("/");
    }
  }, [currentUserEmail, navigate]);

  const handleSignUp = async () => {
    try {
      const { data } = await signUp({
        fullName: name,
        email,
        password,
      });

      console.log(data, "response");
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <br />
        <div>
          <LinkedInOAuth />
        </div>

        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
