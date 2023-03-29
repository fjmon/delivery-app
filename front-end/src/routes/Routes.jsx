import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

function Router() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default Router;
