import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Launch from './Launch';
import Home from './Home';
import Next from './Next';
import Import from './Import';

import {
  BrowserRouter as Router, Switch,
  Route,
  Link
} from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import Recover from './Importer/Recover';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Router >
      <div >
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/launch" >Kontaktverfolgung</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>            <NavItem>
            <NavLink href="/home">Übersicht der Daten</NavLink>
          </NavItem>
            <NavItem>
              <NavLink href="/next">Erfassung neuer Daten</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/import">Datenimport</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>rku.it GmbH</NavbarText>
        </Collapse>
      </Navbar>

      <hr />

      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
      <Switch>
        <Route path="/launch">
          <Launch />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/next">
          <Next />
        </Route>
        <Route path="/import" exact>
          <Import />
        </Route>
        <Route path="/import/recover" exact>
          <Recover />
        </Route>
      </Switch>
      </div>
    </Router >
  );
}

export default App;
