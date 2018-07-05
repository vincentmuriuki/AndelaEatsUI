import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './routes/routes';
import configureStore from './store/store';
import './styles/main.scss';
import './assets/images/favicon.ico';
import { config } from './config';

const store = configureStore({});


// eslint-disable-next-line
Raven.config(config.SENTRY_URL)
  .install();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, 
  document.getElementById('app')
);
