import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './routes/routes';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, 
  document.getElementById('app')
);
