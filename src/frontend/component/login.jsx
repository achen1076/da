import React, { Component, useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function GoogleAuth({ setIsAuth }) {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("IsAuth", true);
      navigate("/");
    });
  };

  const switchTab = (newTab) => {
    navigate(newTab);
  };
  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-signin-header">Sign In</h2>
        <span className="user-span">
          <h4 className="username-title">Username/Email</h4>
          <input
            className="username-input"
            type="text"
            placeholder="Enter Username..."
          ></input>
        </span>
        <span className="password-span">
          <h4 className="password-title">Password</h4>
          <input
            className="password-input"
            type="password"
            placeholder="Enter Password..."
          ></input>
        </span>
        <p id="loginError" className="login-error-txt"></p>
        <span className="signup-signin-span">
          <button
            className="button signup-signin-btn"
            onClick={() => switchTab("/signup")}
          >
            Sign Up
          </button>
          <button className="button login-signin-btn">Sign In</button>
        </span>
      </div>
      <section className="google-auth-section">
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </section>
    </section>
  );
}
