import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Products from '../Pages/Products';
import Orders from '../Pages/Orders';

function Router() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/orders" component={ Orders } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default Router;
