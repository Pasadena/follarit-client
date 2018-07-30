import React, { Component } from 'react';
import logo from './../logo.svg';
import './App.css';
import RackList from './RackList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RackList />
      </div>
    );
  }
}

export default App;
