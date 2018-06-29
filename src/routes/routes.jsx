import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginComponent from '../pages/Login/Login';
import DashboardContainer from '../pages/DashboardContainer/DashboardContainer';
import Dashboard from '../pages/Dashboard/Dashboard';


const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginComponent} />
      <Route path="/" component={DashboardContainer} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </Router>
);

export default Root;