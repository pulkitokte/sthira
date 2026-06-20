import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ProgressProvider } from "./context/ProgressContext";
import { RecoveryProgressProvider } from "./context/RecoveryProgressContext";
import { HydrationProvider } from "./context/HydrationContext";
import { EyeRecoveryProgressProvider } from "./context/EyeRecoveryProgressContext";
import { WellnessProvider } from "./context/WellnessContext";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OnboardingProvider>
        <ProgressProvider>
          <RecoveryProgressProvider>
            <HydrationProvider>
              <EyeRecoveryProgressProvider>
                <WellnessProvider>
                  <App />
                </WellnessProvider>
              </EyeRecoveryProgressProvider>
            </HydrationProvider>
          </RecoveryProgressProvider>
        </ProgressProvider>
      </OnboardingProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
