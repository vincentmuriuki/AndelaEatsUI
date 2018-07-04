import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginComponent from '../pages/Login/Login';
import OrderComponent from '../pages/Order/order';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginComponent} />
      <Route path="/ordermeal" component={OrderComponent} />
    </Switch>
  </Router>
);

export default Root;
