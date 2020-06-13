import React from "react";
import { BrowserRouter, Switch, Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { useSelector } from "react-redux";

import theme from "./theme";

import Home from "./pages/Home";
import Page from "./pages/Page";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leagues from "./pages/Leagues";
import { AppStoreState } from "./lib/reducer";
import LeaguesNew from "./pages/LeaguesNew";

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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/leagues/new" component={LeaguesNew} exact />
          <PrivateRoute path="/leagues" component={Leagues} exact />
          <Route path="/page" component={Page} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/" component={Home} exact />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
