import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

import { ToastProvider } from "@providers/ToastProvider.tsx";
import { UserProvider } from "@providers/UserProvider.tsx";

import ToastContainer from "@components/ToastContainer.tsx";
import store from "@stores/index";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <UserProvider>
          <App />
          <ToastContainer />
        </UserProvider>
      </ToastProvider>
    </Provider>
  </StrictMode>
);
