import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Next from './Next';
import {
  BrowserRouter as Router, Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">App</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/next">Next</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/next">
            <Next />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
