import React from "react";
import { RouteProps, useLocation, Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { AppStoreState } from "../lib/reducer";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const location = useLocation();

  const { token, loggedIn } = useSelector((state: AppStoreState) => ({
    token: state.login.token,
    loggedIn: state.login.loggedIn
  }));

  if (!token || !loggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    );
  }

  return <Route {...props} />;
};

export default PrivateRoute;
