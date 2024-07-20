import React from "react";
import ReactDOM from "react-dom/client";
import Trip from "./Trip";
import "./Trip.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Trip />
  </React.StrictMode>
);
