import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      
      <div className='nav'>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/next">Next</NavLink></li>
        </ul>
      </div>

      <div className="App-intro">
        <Route path='/home' exact component={Home} />
        <Route path='/next' component={Next} />
        <Redirect to='/home' />
      </div>

    </div>
  );
}

export default App;
