import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import Login from '../Pages/Login';
import Register from '../Pages/Register';

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
