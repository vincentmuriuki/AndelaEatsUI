import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './store/store';
import './styles/main.scss';
import './assets/images/favicon.ico';
import { config } from './config';

const store = configureStore();


// eslint-disable-next-line
Raven.config(config.SENTRY_URL).install();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);
