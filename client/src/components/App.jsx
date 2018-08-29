import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SideNav from './common/Sidenav/Sidenav';
import Login from './Login/Login';
import Orders from './Order/Orders';
import OrderHistory from './OrderHistory/OrderHistory';
import EditOrder from './EditOrder/EditOrder';
import Admin from './Admin/Admin/Admin';


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
          <Route exact path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </SideNav>
    </Switch>
  </Router>
);

export default Root;
