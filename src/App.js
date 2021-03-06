import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FilterCandidates from './components/FilterCandidates.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TRTL: The Prototype</h2>
        </div>
        <FilterCandidates />
      </div>
    );
  }
}

export default App;
