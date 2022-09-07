import React, { useState } from "react";
import "./style.css";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import {
  IndexPage,
  AboutPage,
  SignInPage,
  AccountPage,
  SignUpPage,
  CreatePage,
  FindPage
} from "./pages.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/find" element={<FindPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
}
