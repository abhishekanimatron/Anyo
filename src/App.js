import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <Router>
      {/* a fallback when route is loading */}
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          {/* Routes to login page using constant route file */}
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
