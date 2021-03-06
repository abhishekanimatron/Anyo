import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import ProtectedRoutes from "./helper/protectedRoute";
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/user";

// lazy load imports so we get only what we need, making document size smaller
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const { user } = useAuthListener();
  return (
    // wrapped using user's context provider
    <UserContext.Provider value={{ user }}>
      <Router>
        {/* a fallback when route is loading */}
        <Suspense fallback={<p>Loading...</p>}>
          {/* Routes to specific pages using constant route file & route checks */}
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoutes>
            {/* not found page having no specific path */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
