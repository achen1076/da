import React, { useState } from "react";
import "./style.css";
import { PageHeader, PageFooter } from "./component/pageFormat";
import {
  IndexTitleContainer,
  IndexBarContainer,
  IndexDataContainter,
} from "./component/index";
import { AboutContainer } from "./component/about";
import { GoogleAuth } from "./component/login";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { AccountHeader } from "./component/account";
import { CreateHeader, CreateBody } from "./component/create";

export function IndexPage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
        <section id="indexTitle">
          <IndexTitleContainer />
        </section>
      </header>
      <section className="index-bar-container">
        <IndexBarContainer />
      </section>
      <IndexDataContainter />
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}

export function AboutPage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
      </header>
      <section>
        <AboutContainer />
      </section>
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}

export function SignInPage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
      </header>
      <GoogleAuth />
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}

export function AccountPage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
      </header>
      <AccountHeader />
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}

export function SignUpPage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
      </header>
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}

export function CreatePage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
        <CreateHeader />
      </header>
      <CreateBody />
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}

export function FindPage() {
  return (
    <React.Fragment>
      <header class="main-header">
        <section id="navHeader">
          <PageHeader />
        </section>
      </header>
      <footer id="footer" class="footer main-footer">
        <PageFooter />
      </footer>
    </React.Fragment>
  );
}
