/*
 * @Author: your name
 * @Date: 2021-04-24 16:38:24
 * @LastEditTime: 2021-04-24 20:45:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\router.js
 */
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HomePage from "./routes/home/HomePage";
import Login from './routes/user/Login';
import WriteArticle from "./routes/article/WriteArticle"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/write" exact component={WriteArticle} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
