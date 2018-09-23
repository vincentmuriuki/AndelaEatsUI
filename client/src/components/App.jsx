/* eslint-disable import/no-named-as-default */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SideNav from './common/Sidenav/Sidenav';
import Login from './Login/Login';
import Orders from './Order/Orders';
import OrderHistory from './OrderHistory/OrderHistory';
import EditOrder from './EditOrder/EditOrder';
import AdminOrders from './Admin/Orders/Orders';
import Vendors from './Admin/Vendors/Vendors';
import Meals from './Admin/Meals/Index';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <SideNav>
        <Switch>
          <Route path="/ordermeal" component={Orders} />
          <Route exact path="/orders" component={OrderHistory} />
          <Route exact path="/orders/edit/:id" component={EditOrder} />
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/admin/vendors" component={Vendors} />
          <Route exact path="/admin/meals" component={Meals} />
          <Route component={NotFound} />
        </Switch>
      </SideNav>
    </Switch>
  </Router>
);

export default Root;
