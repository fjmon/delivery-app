import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Products from '../Pages/Products';
import DetailSale from '../Pages/DetailSale';
import Checkout from '../Pages/Checkout';
import Orders from '../Pages/Orders';
import SellerOrders from '../Pages/SellerOrders';
import DetailSaleSeller from '../Pages/DetailSaleSeller';

function Router() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route exact path="/customer/orders/" component={ Orders } />
      <Route exact path="/customer/orders/:id" component={ DetailSale } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ DetailSaleSeller } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default Router;
