import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HomePage from "./routes/home/HomePage";
import Login from './routes/user/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/index" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
