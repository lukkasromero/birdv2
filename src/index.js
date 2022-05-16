import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import "./style.css";
import App from "./App";
import { BlockchainContextProvider } from "./store/BlockchainContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BlockchainContextProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </BlockchainContextProvider>
  </React.StrictMode>
);
