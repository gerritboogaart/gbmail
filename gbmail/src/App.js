import React from 'react';

import './App.css';
import { Home } from './components/Home/Home';

const connecToServer = ()  =>    fetch('/emails').then(x => console.log('x', x));

function App() {

  connecToServer();
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
