import React, { useState } from "react";
import "./style.css";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import {
  IndexPage,
  AboutPage,
  SignInPage,
  AccountPage,
  CreatePage,
  EditPage,
  SearchPage,
} from "./pages.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/account/:userId" element={<AccountPage />} />
      <Route path="/edit/:userId" element={<EditPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
}
