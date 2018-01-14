import React, { Component } from 'react';

import Header from './containers/common/Header';
import Routing from './Routing';

import SessionManager from './services/SessionManager';

class App extends Component {



    render() {

        const isAuthorized = !!SessionManager.isTokenValid();

        return (
          <div>
              <Header history={ this.props.history }/>
              <Routing isAuthorized={isAuthorized}/>
          </div>
        );
    }
}

export default App;
