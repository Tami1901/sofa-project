import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import theme from "./theme";

import Home from "./pages/Home";
import Page from "./pages/Page";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <CSSReset />
        <BrowserRouter>
          <Switch>
            <Route path="/page" component={Page} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Home} exact />
            <Route path="/" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
