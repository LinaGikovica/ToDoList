import React, { Component } from 'react';
import logo from './logo.svg';

import Header from './Header.jsx'
import Main from './Main.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
