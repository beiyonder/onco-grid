import { createHashRouter, Link, useRouteError } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { EmptyState } from "./components/Primitives";
import { HomePage } from "./pages/HomePage";
import { EvidenceCoveragePage } from "./pages/EvidenceCoveragePage";
import { InboxPage } from "./pages/InboxPage";
import { PatientTrialReviewPage } from "./pages/PatientTrialReviewPage";
import { PatientWorkspacePage } from "./pages/PatientWorkspacePage";
import { PatientsPage } from "./pages/PatientsPage";
import { TrialDetailPage } from "./pages/TrialDetailPage";
import { TrialRoomPage } from "./pages/TrialRoomPage";
import { TrialsPage } from "./pages/TrialsPage";
import { StudiesPage } from "./pages/StudiesPage";
import { GlobalTrialPage } from "./pages/GlobalTrialPage";
import { ResearchReviewPage } from "./pages/ResearchReviewPage";

function RouteErrorPage() {
  const error = useRouteError();
  console.error(error);
  return <div className="page"><EmptyState icon="warning" title="This view could not be opened">Return to a stable destination and try the workflow again.<br /><Link className="button primary" to="/">Return home</Link></EmptyState></div>;
}

export const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "trials", element: <TrialsPage /> },
      { path: "trials/evidence", element: <EvidenceCoveragePage /> },
      { path: "trials/global/:trialId", element: <GlobalTrialPage /> },
      { path: "studies", element: <StudiesPage /> },
      { path: "trials/:trialId", element: <TrialDetailPage /> },
      { path: "trials/:trialId/room", element: <TrialRoomPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "research/:patientId/reviews/:trialId", element: <ResearchReviewPage /> },
      { path: "patients/:patientId", element: <PatientWorkspacePage /> },
      { path: "patients/:patientId/reviews/:trialId", element: <PatientTrialReviewPage /> },
      { path: "inbox", element: <InboxPage /> },
      { path: "*", element: <div className="page"><EmptyState icon="warning" title="Page not found">Use the four primary destinations to continue.<br /><Link className="button primary" to="/">Return home</Link></EmptyState></div> },
    ],
  },
]);
