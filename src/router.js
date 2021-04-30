/*
 * @Author: your name
 * @Date: 2021-04-24 16:38:24
 * @LastEditTime: 2021-04-24 20:45:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\router.js
 */
import React from 'react';
import { Router, Switch } from 'dva/router';
import Atuh from './utils/auth'
import routerMap from "./routes/index"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/register" exact component={Login} />
        <Route path="/write" exact component={WriteArticle} />
        <Route path="/" component={HomePage} /> */}
        <Atuh routerConfig={routerMap} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
