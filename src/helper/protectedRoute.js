// routes which user don't have access unless logged in is handled here
import PropTypes from "prop-types";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoutes({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      //   location comes from Route
      render={({ location }) => {
        //   if user is present return the children which is the route we are protecting
        if (user) {
          return React.cloneElement(children, { user });
        }
        // if not, redirect to login page
        if (!user) {
          return (
            <Redirect
              // redirect to login route
              to={{ pathname: ROUTES.LOGIN, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    ></Route>
  );
}

ProtectedRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
