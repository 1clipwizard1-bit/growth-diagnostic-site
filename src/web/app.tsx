import { Route, Switch } from "wouter";
import Index from "./pages/index";
import DiagnosticForm from "./pages/diagnostic";
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/privacy";
import ContactPage from "./pages/contact";

function App() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/diagnostic" component={DiagnosticForm} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/contact" component={ContactPage} />
    </Switch>
  );
}

export default App;
