import React, { useEffect, useState } from "react";
import './App.css'; // Import your App.css file

// Custom hook for loading OTPless SDK
const useLoadOTPlessSDK = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://otpless.com/auth.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

const OTPlessSignIn = () => {
  const [userData, setUserData] = useState(null);
  const [showSignIn, setShowSignIn] = useState(true);

  useLoadOTPlessSDK(); // Load OTPLESS SDK on component mount

  const handleUserData = (otplessUser) => {
    console.log("User data:", otplessUser);
    setUserData(otplessUser);
    setShowSignIn(false); // Hide sign-in UI when user data is available
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.otpless = handleUserData;
    }
  }, []);

  return (
    <div className="container">
    {showSignIn && (
      <div id="otpless-login-page" className="signin-container">
      </div>
    )}
    {!showSignIn && userData !== null && (
      <div className="user-details">
        <h2>User Details</h2>
        {userData.mobile && userData.mobile.number && (
          <div className="user-data">
            <p>Name: {userData.email.name}</p>
            <p>Number: {userData.mobile.number}</p>
          </div>
        )}
        {userData.email && userData.email.email && (
          <p>Email: {userData.email.email}</p>
        )}
      </div>
    )}
  </div>
  );
};

export default OTPlessSignIn;
