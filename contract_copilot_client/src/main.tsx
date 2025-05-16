import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ToastProvider } from "@providers/ToastProvider.tsx";
import { UserProvider } from "@providers/UserProvider.tsx";

import App from "./App.tsx";
import ToastContainer from "@components/ToastContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <UserProvider>
        <App />
      </UserProvider>
      <ToastContainer />
    </ToastProvider>
  </StrictMode>
);
