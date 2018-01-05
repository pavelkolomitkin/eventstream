import React, { Component } from 'react';

import Header from './containers/Header';
import Routing from './Routing';

class App extends Component {
  render() {

    return (
      <div>
          <Header history={ this.props.history }/>
          <Routing/>
      </div>
    );
  }
}

export default App;
