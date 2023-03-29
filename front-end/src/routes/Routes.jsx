import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';

function Router() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default Router;
