import React, { Component } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export function PageHeader() {
  var isAuth = localStorage.getItem("IsAuth");
  let image = "/icons/circle-512.png";
  const setData = async () => {
    if (localStorage.getItem("IsAuth")) {
      const currentUser = auth.currentUser;
      const docRef = doc(db, currentUser.uid, "user");
      const docSnap = await getDoc(docRef);
      while (!docSnap.exists()) {}
      if (docSnap.exists()) {
        const uid = currentUser.uid;
        const path = "/account/" + uid;
        if (currentUser.photoURL != null) {
          image = currentUser.photoURL;
        } else {
          image = "/icons/default-avatar.png";
        }
        document.getElementById("avatarLink").href = path;
        document.getElementById("userAvatar").src = image;
      }
    }
  };

  const setAvatar = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setData();
      }
    });
  };

  setAvatar();

  return (
    <React.Fragment>
      <div className="nav-div">
        <Link to="/">
          <img
            src="/media_public/logo_black.png"
            alt="BAJAMAS"
            className="logo"
          />
          <button type="button" className="nav-div__button">
            BAJAMAS
          </button>
        </Link>
      </div>
      <div className="nav main-nav">
        <ul>
          <li>
            <Link to="/" className="main-nav__links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="main-nav__links">
              About
            </Link>
          </li>
          <li>
            <Link to="/search" className="main-nav__links">
              Search
            </Link>
          </li>
          <li>
            {!isAuth ? (
              <Link to="/create" className="main-nav__links">
                Create Account
              </Link>
            ) : (
              <Link to="" className="main-nav__links">
                Nothing
              </Link>
            )}
          </li>
          <li>
            {!isAuth ? (
              <Link to="/login" className="main-nav__links">
                Sign In
              </Link>
            ) : (
              <a
                href="/account/:userId"
                className="avatar-link"
                id="avatarLink"
              >
                <img
                  src={image}
                  alt="Avatar"
                  className="user-avatar"
                  id="userAvatar"
                />
              </a>
            )}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export class PageFooter extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h3 className="footer-text">Connect With Us!</h3>
        <ul>
          <li>
            <a href="https://www.linkedin.com/" target="_blank">
              <img src="/icons/linkd.png" width="40vw" height="35vw" />
            </a>
            <a href="mailto: achen1076@gmail.com">
              <img src="/icons/gmail_icon.png" width="40vw" height="35vw" />
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export function Loading() {
  return <div className="loading-dots" id="loadingDots"></div>;
}
