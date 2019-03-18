import React, { Component } from 'react';
// import { Button } from 'antd-mobile';
import './App.css';
// import 'antd-mobile/dist/antd-mobile.css'
import RouterCom from './router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterCom />
      </div>
    );
  }
}

export default App;
