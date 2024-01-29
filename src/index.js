import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./screens/Auth/Signup";
import Home from "./screens/Home";
import { store } from "./app/store/store";
import { Provider } from "react-redux";
import { SignIn } from "./screens/Auth/Signin";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LinkedinCallback } from "./screens/Auth/LinkedinCallback";
import { GoogleClientId } from "./config";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GoogleClientId}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/linkedin" element={<LinkedinCallback/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
    </GoogleOAuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
