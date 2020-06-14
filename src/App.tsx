import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import theme from "./theme";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Leagues from "./pages/leagues/Leagues";
import LeaguesNew from "./pages/leagues/LeaguesNew";
import League from "./pages/leagues/League";
import EventNew from "./pages/events/EventNew";
import User from "./pages/profile/User";
import LeagueEdit from "./pages/leagues/LeaguesEdit";
import EventEdit from "./pages/events/EventEdit";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import EditProfile from "./pages/profile/Edit";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Header />
        <Switch>
          <PrivateRoute path="/user/edit" component={EditProfile} exact />
          <PrivateRoute path="/user" component={User} exact />
          <PrivateRoute path="/leagues/:id/edit" component={LeagueEdit} />
          <PrivateRoute path="/leagues/:id/event/:eventId" component={EventEdit} />
          <PrivateRoute path="/leagues/:id/new-event" component={EventNew} />
          <PrivateRoute path="/leagues/new" component={LeaguesNew} exact />
          <PrivateRoute path="/leagues/:id" component={League} />
          <PrivateRoute path="/leagues" component={Leagues} exact />
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
