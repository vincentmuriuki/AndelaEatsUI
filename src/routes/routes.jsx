import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginComponent from '../pages/Login/Login';


const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={LoginComponent} />
    </Switch>
  </Router>
);

export default Root;
