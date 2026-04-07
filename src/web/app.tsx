import { Route, Switch } from "wouter";
import Index from "./pages/index";
import DiagnosticForm from "./pages/diagnostic";

function App() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/diagnostic" component={DiagnosticForm} />
    </Switch>
  );
}

export default App;
