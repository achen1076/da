import React, { Component, useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

export function GoogleAuth({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("IsAuth", true);
      const user = auth.currentUser;
      const uid = user.uid;
      const docRef = doc(db, uid, "user");
      setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
      });
      const path = "/account/" + uid;
      navigate(path);
    });
  };

  const setData = async (user) => {
    if (localStorage.getItem("IsAuth")) {
      const currentUser = await user;
      const docRef = doc(db, currentUser.uid, "user");
      const docSnap = await getDoc(docRef);
      while (!docSnap.exists()) {}
      if (docSnap.exists()) {
        auth.currentUser.displayName = docSnap.data().name;
      }
      const path = "/account/" + currentUser.uid;
      navigate(path);
    }
  };

  const signInWithEmail = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let errorDisplay = document.getElementById("loginError");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        localStorage.setItem("IsAuth", true);
        errorDisplay.innerHTML = "";
        const user = userCredential.user;

        setData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorDisplay.innerHTML = "Email or password is incorrect";
      });
  };

  const switchTab = (newTab) => {
    navigate(newTab);
  };
  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-signin-header">Sign In</h2>
        <div className="field profile-input-box">
          <label for="email" className="ha-screen-reader">
            E-mail
          </label>
          <input
            id="email"
            className="profile-user-input"
            placeholder="Enter your email..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">E-mail</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="password" className="ha-screen-reader">
            Password
          </label>
          <input
            id="password"
            className="profile-user-input"
            placeholder=" "
            autoComplete="none"
            type="password"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Password</span>
          </span>
        </div>
        <p id="loginError" className="login-error-txt"></p>
        <span className="signup-signin-span">
          <button
            className="button signup-signin-btn"
            onClick={() => switchTab("/create")}
          >
            Create Account
          </button>
          <button className="button login-signin-btn" onClick={signInWithEmail}>
            Sign In
          </button>
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
