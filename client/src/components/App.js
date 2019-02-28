import React, { Component } from 'react';
import FlatsList from './FlatsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Exercice scrapper - Se loger</h1>
        </header>
        <main>
          <FlatsList />
        </main>
      </div>
    );
  }
}

export default App;
