import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";

export function EditBody() {
  let navigate = useNavigate();

  const setData = async () => {
    if (localStorage.getItem("IsAuth")) {
      const currentUser = auth.currentUser;
      const docRef = doc(db, currentUser.uid, "user");
      const docSnap = await getDoc(docRef);
      while (!docSnap.exists()) {}
      if (docSnap.exists()) {
        document.getElementById("welcomeNameText").innerHTML = "Edit Profile";
      }
    }
  };

  const setUpPage = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const blurClassName = " blur-on-load";
        const blurredElements = [
          "edit-container blur-on-load",
          "account-settings-container blur-on-load",
        ];
        const blurredElementsID = ["editContainer", "accountSettingContainer"];
        setData();
        document.getElementById("welcomeNameText").style.animation =
          "1s cubic-bezier(0.56,-0.39, 0.4, 1.65) 0s 1 slideInFromLeft";

        document.getElementById("loadingDots").style.display = "none";

        for (let index in blurredElements) {
          const element = blurredElements[index];
          const id = blurredElementsID[index];
          console.log(element);
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
    <section className="edit-section">
      <div className="edit-container blur-on-load" id="editContainer">
        <h1 className="edit-container__header " id="welcomeNameText">
          &nbsp;
        </h1>
      </div>
      <div
        className="account-settings-container blur-on-load"
        id="accountSettingContainer"
      >
        <h2 className="account-settings-container--header">Edit Profile</h2>
      </div>
    </section>
  );
}
