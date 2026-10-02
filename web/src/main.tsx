import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppStateProvider } from "./state/AppState";
import { TrialDataProvider } from "./state/TrialData";
import { PilotServiceProvider } from "./state/PilotService";
import { WorkflowProvider } from "./state/WorkflowState";
import { router } from "./router";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Trial Loop root element is missing");

createRoot(root).render(
  <StrictMode>
    <TrialDataProvider>
      <PilotServiceProvider>
        <AppStateProvider>
          <WorkflowProvider><RouterProvider router={router} /></WorkflowProvider>
        </AppStateProvider>
      </PilotServiceProvider>
    </TrialDataProvider>
  </StrictMode>,
);
