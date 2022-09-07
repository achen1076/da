import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";

export function AccountHeader() {
  var isAuth = localStorage.getItem("IsAuth");
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      isAuth = false;
      localStorage.clear();
      navigate("/login");
    });
  };

  const deleteData = () => {
    const dataId = auth.currentUser.uid;
    const docRef = doc(db, "userInput", dataId);
    deleteDoc(docRef);
  };

  const setUpPage = () => {
    // const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById("welcomeNameText").innerHTML =
          "Hello, " + user.displayName + "!";
      }
    });
  };

  setUpPage();

  return (
    <section className="account-section">
      <div className="welcome-div">
        <h1 className="account-welcome-text" id="welcomeNameText">
          Hello
        </h1>
      </div>
      <div className="account-settings-container">
        <h2 className="account-settings-header">Account Settings</h2>
        <button className="button delete-data-button" onClick={deleteData}>
          Clear Cache
        </button>
        <button className="button signout-button" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </section>
  );
}
