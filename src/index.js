import React from "react";
import { createRoot } from "react-dom/client";
import "./frontend/style.css";
import App from "./frontend/App.js";
import { BrowserRouter } from "react-router-dom";

// da entry point!

const root = document.getElementById("root");

const app = createRoot(root);
app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
