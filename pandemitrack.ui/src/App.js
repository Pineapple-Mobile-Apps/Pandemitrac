import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Launch from './Launch';
import Home from './Home';
import Creation from './Creation';
import Import from './Import';

import {
  BrowserRouter as Router, Switch,
  Route,
  Link
} from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import CaseDetails from './CaseDetails';
import Recover from './Importer/Recover';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Router >
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/launch" >Kontaktverfolgung</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>            <NavItem>
            <NavLink href="/home">Übersicht</NavLink>
          </NavItem>
            <NavItem>
              <NavLink href="/case/new">Erfassung</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/import">Massenimport</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>rku.it GmbH</NavbarText>
        </Collapse>
      </Navbar>

      <div className="mt-3">
        <Switch>
          <Route path="/launch">
            <Launch />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/case/:id" exact >
            <Creation />
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
