import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppStateProvider } from "./state/AppState";
import { TrialDataProvider } from "./state/TrialData";
import { PilotServiceProvider } from "./state/PilotService";
import { router } from "./router";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Trial Relay root element is missing");

createRoot(root).render(
  <StrictMode>
    <TrialDataProvider>
      <PilotServiceProvider>
        <AppStateProvider>
          <RouterProvider router={router} />
        </AppStateProvider>
      </PilotServiceProvider>
    </TrialDataProvider>
  </StrictMode>,
);
