import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ProgressProvider } from "./context/ProgressContext";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OnboardingProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </OnboardingProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
