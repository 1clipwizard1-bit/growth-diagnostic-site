import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import Index from "./pages/index";

// Lazy load non-homepage routes for code splitting
const DiagnosticForm = React.lazy(() => import("./pages/diagnostic"));
const TermsPage = React.lazy(() => import("./pages/terms"));
const PrivacyPage = React.lazy(() => import("./pages/privacy"));
const ContactPage = React.lazy(() => import("./pages/contact"));
const ReportPage = React.lazy(() => import("./pages/report"));

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="w-8 h-8 rounded-full border-2 border-t-orange-500 border-neutral-800 animate-spin" />
        </div>
      }
    >
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/diagnostic" component={DiagnosticForm} />
        <Route path="/report/:token" component={ReportPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
    </Suspense>
  );
}

export default App;

