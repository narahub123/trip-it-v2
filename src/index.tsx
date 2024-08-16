import React from "react";
import ReactDOM from "react-dom/client";
import Trip from "./Trip";
import "./Trip.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Trip />
  </BrowserRouter>
  // </React.StrictMode>
);
