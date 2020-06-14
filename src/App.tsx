import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
  useLocation,
  useHistory,
  Link
} from "react-router-dom";
import { ThemeProvider, CSSReset, Button } from "@chakra-ui/core";
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
import League from "./pages/League";
import EventNew from "./pages/EventNew";
import useThunkDispatch from "./hooks/useThunkDispatch";
import { LogoutAction } from "./reducers/login";
import User from "./pages/User";
import LeagueEdit from "./pages/LeaguesEdit";
import EventEdit from "./pages/EventEdit";

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

const Logout: React.FC = () => {
  const history = useHistory();
  const dispatch = useThunkDispatch();
  const { loggedIn } = useSelector((store: AppStoreState) => ({ loggedIn: store.login.loggedIn }));

  const logout = (): void => {
    localStorage.removeItem("token");
    dispatch(LogoutAction());
    history.push("/");
  };

  if (loggedIn) {
    return (
      <>
        <Button onClick={logout}>Logout</Button>
        <Link to="/user">Profile</Link>
        <Link to="/leagues">Home</Link>
      </>
    );
  }

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Logout />
        <Switch>
          <PrivateRoute path="/user" component={User} exact />
          <PrivateRoute path="/leagues/:id/edit" component={LeagueEdit} />
          <PrivateRoute path="/leagues/:id/event/:eventId" component={EventEdit} />
          <PrivateRoute path="/leagues/:id/new-event" component={EventNew} />
          <PrivateRoute path="/leagues/new" component={LeaguesNew} exact />
          <PrivateRoute path="/leagues/:id" component={League} />
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
