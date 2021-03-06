import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Launch from './Launch';
import Home from './Home';
import Creation from './Creation';
import Import from './Import';
import Infection from './Infection'

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
      <div >
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/launch" >Kontaktverfolgung</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>            <NavItem>
            <NavLink href="/home">Übersicht</NavLink>
          </NavItem>
            <NavItem>
              <NavLink href="/case">Erfassung</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/import">Massenimport</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/infection">Infektionsgraph</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Gesundheits- und Veterinäramt Münster</NavbarText>
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
        <Route path="/case/:id" exact>
          <CaseDetails />
        </Route>
        <Route path="/launch">
          <Launch />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/infection">
          <Infection />
        </Route>
        <Route path="/case" exact >
          <Creation />
        </Route>
        <Route path="/import" exact>
          <Import />
        </Route>
        <Route path="/import/recover" exact>
          <Recover />
        </Route>
        <Route path="/import/recover/:locationId?/:begin?/:end?" component={Recover}  exact/>

        
      </Switch>
      </div>
    </Router >
  );
}

export default App;
