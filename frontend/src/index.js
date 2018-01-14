import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
import * as securityActions from './actions/securityActions';
import SessionManager from './services/SessionManager';

import {configureStore, history} from './store/configureStore';
import firewall from './firewall';

import App from './App';
import './index.css';

const store = configureStore();

const token = SessionManager.getAuthToken();
if (token)
{
    store.dispatch(securityActions.userAuthorized(token));
}

firewall(history, {
    anonymous: [
        '/login',
        '/register'
    ],
    login: '/login',
    redirects: {
        '/': '/event/list/all'
    }
});


ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
  </Provider>
  ,
  document.getElementById('root')
);
