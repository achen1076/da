import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export function PageHeader() {
  var isAuth = localStorage.getItem("IsAuth");

  return (
    <React.Fragment>
      <div className="nav-div">
        <Link to="/">
          <img
            src="./media_public/logo_black.png"
            alt="BAJAMAS"
            className="logo"
          />
          <button type="button" className="title-button">
            BAJAMAS
          </button>
        </Link>
      </div>
      <div className="nav main-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/find">Find</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            {!isAuth ? (
              <Link to="/login">Sign In</Link>
            ) : (
              <Link to="/account">Account</Link>
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
              <img src="./icons/linkd.png" width="40" height="35" />
            </a>
            <a href="mailto: achen1076@gmail.com">
              <img src="./icons/gmail_icon.png" width="40" height="35" />
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
