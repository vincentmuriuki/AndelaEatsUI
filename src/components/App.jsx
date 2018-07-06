import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Orders from './Order/Orders';

/**
 * Application
 */

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/ordermeal" component={Orders} />
    </Switch>
  </Router>
);

export default App;