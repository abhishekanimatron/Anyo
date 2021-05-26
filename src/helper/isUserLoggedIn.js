// routes user who is already logged in to dashboard if they access login route
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function IsUserLoggedIn({
  user,
  //   the path where we want the user to go if they are already logged in
  loggedInPath,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      //   location comes from Route
      render={({ location }) => {
        //   if user is absent return the children which is the login route
        if (!user) {
          return children;
        }
        // if not, redirect to login page
        if (!user) {
          return (
            <Redirect
              // redirect to the passed route
              to={{ pathname: loggedInPath, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    ></Route>
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
