import { Route, Switch } from "wouter";
import Index from "./pages/index";
import DiagnosticForm from "./pages/diagnostic";
import TermsPage from "./pages/terms";

function App() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/diagnostic" component={DiagnosticForm} />
      <Route path="/terms" component={TermsPage} />
    </Switch>
  );
}

export default App;
