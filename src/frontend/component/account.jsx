import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import {
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase-config";

export function AccountBody() {
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
    const uid = auth.currentUser.uid;
    const docRef = doc(db, uid, "search");
    deleteDoc(docRef);
  };

  const setData = async () => {
    if (localStorage.getItem("IsAuth")) {
      const currentUser = auth.currentUser;
      const docRef = doc(db, currentUser.uid, "user");
      const docSnap = await getDoc(docRef);
      while (!docSnap.exists()) {}
      if (docSnap.exists()) {
        document.getElementById("welcomeNameText").innerHTML =
          "Hello, " + docSnap.data().name + "!";
      }
    }
  };

  const setUpPage = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const blurClassName = " blur-on-load";
        const blurredElements = [
          "welcome-container blur-on-load",
          "account-settings-container blur-on-load",
        ];
        const blurredElementsID = [
          "welcomeContainer",
          "accountSettingContainer",
        ];
        setData();
        document.getElementById("welcomeNameText").style.animation =
          "1s cubic-bezier(0.56,-0.39, 0.4, 1.65) 0s 1 slideInFromLeft";

        document.getElementById("loadingDots").style.display = "none";

        for (let index in blurredElements) {
          const element = blurredElements[index];
          const id = blurredElementsID[index];
          document.getElementById(id).className = element.replace(
            blurClassName,
            ""
          );
        }
      }
    });
  };

  const changePage = (newTab) => {
    const tab = newTab + "/" + auth.currentUser.uid;
    navigate(tab);
  };

  setUpPage();

  return (
    <section className="account-section">
      <div className="welcome-container blur-on-load" id="welcomeContainer">
        <h1 className="weclome-container__header" id="welcomeNameText">
          &nbsp;
        </h1>
      </div>
      <div
        className="account-settings-container blur-on-load"
        id="accountSettingContainer"
      >
        <h2 className="account-settings-container--header">Account Settings</h2>
        <div className="account-settings-container__personal-information">
          <h3 className="account-settings-container__header">
            Personal Information
          </h3>
          <p className="account-settings-container__body">
            Change your personal information
          </p>
          <button
            className="button account-settings-container__button"
            onClick={() => changePage("/edit")}
          >
            Edit
          </button>
        </div>
        <div className="account-settings-container__personal-preference">
          <h3 className="account-settings-container__header">
            Personal Preferences
          </h3>
          <p className="account-settings-container__body">
            Change your own preferences
          </p>
          <button className="button account-settings-container__button">
            Change
          </button>
        </div>
        <div className="account-settings-container__security">
          <h3 className="account-settings-container__header">
            Change Password
          </h3>
          <p className="account-settings-container__body">
            If you forgot or need to change your password
          </p>
          <button className="button account-settings-container__button">
            Change Password
          </button>
        </div>
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
