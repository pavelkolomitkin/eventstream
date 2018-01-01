import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store/configureStore';

import App from './App';
import './index.css';

const store = configureStore();


ReactDOM.render(

  <MuiThemeProvider>
      <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
