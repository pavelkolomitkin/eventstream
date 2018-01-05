import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import * as securityActions from './actions/securityActions';
import SessionManager from './services/SessionManager';

import {configureStore, history} from './store/configureStore';

import App from './App';
import './index.css';

const store = configureStore();

const token = SessionManager.getAuthToken();
if (token)
{
    store.dispatch(securityActions.userAuthorized(token));
}


ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
  </Provider>
  ,
  document.getElementById('root')
);
