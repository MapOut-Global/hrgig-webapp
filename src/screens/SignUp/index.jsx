import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../app/auth/authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserEmail } from '../../app/auth/authSlice';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL,"API URL: " )
   const [signUp, { isLoading }] = useSignUpMutation();
  const currentUserEmail = useSelector(selectCurrentUserEmail);

  console.log('current USER: ' + currentUserEmail)
  useEffect(() => {
    if (currentUserEmail) {
      navigate('/');
    }
  }, [currentUserEmail, navigate]);
  const handleSignUp = async () => {
    try {

      const response = await signUp({
        fullName:name,
        organisationName:'abc',
        email,
        password,
      });

console.log(response, "response");
      // Store the token in your authentication state (Redux, context, etc.)
      // For example, dispatch an action to update the auth state
      // dispatch(updateAuthState({ token, email }));

      // Redirect to the home page or dashboard after successful sign up
      // navigate('/');
    } catch (error) {
      console.error('SignUp Error:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
