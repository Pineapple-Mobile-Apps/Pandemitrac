import React, { useState } from 'react';
import classnames from 'classnames';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Nav, NavLink, NavItem, TabContent, TabPane, Row, Col } from 'reactstrap';
let Next = () => {
  //Verwaltung der Tabs deren Status
  const [activeTab, setActiveTab] = useState("1");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [housenumber, setHousnumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");

  const submit = async () => {
    let result = await fetch("/api/Visitor/create", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        adress: street + " " + housenumber || "",
        postCode: parseInt(postcode) || 0,
        city: city || "",
        phone: tel || null,
        mail: mail || null
      })
    });
  };

  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            Persönliche Daten
              </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { toggle('2'); }}
            className={classnames({ active: activeTab === '2' })} >
            Besuchte Orte
          </NavLink>
        </NavItem><NavItem>
          <NavLink onClick={() => { toggle('3'); }}
            className={classnames({ active: activeTab === '3' })} >
            Abhängige Personen
          </NavLink>
        </NavItem><NavItem>
          <NavLink onClick={() => { toggle('4'); }}
            className={classnames({ active: activeTab === '4' })} >
            Validierung und Absenden
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" id="name" value={name} onChange={e => setName(e.currentTarget.value)} placeholder="Voller Name" />
                </FormGroup>
                <FormGroup>
                  <Label for="street">Straße</Label>
                  <Input type="text" name="street" id="street" placeholder="Strasse" value={street} onChange={e => setStreet(e.currentTarget.value)} />
                  <Label for="housenumber">Hausnummer</Label>
                  <Input type="text" name="housenumber" id="housenumber" value={housenumber} onChange={e => setHousnumber(e.currentTarget.value)} placeholder="Hausnummer (ggf. Zusatz)" />
                </FormGroup>
                <FormGroup>
                  <Label for="postcode">Postleitzahl</Label>
                  <Input type="number" name="postcode" id="postcode" value={postcode} onChange={e => setPostcode(e.currentTarget.value)} placeholder="Postleitzahl" />
                </FormGroup>
                <FormGroup>
                  <Label for="city">Stadt</Label>
                  <Input type="text" name="city" id="city" value={city} onChange={e => setCity(e.currentTarget.value)} placeholder="Stadt" />
                </FormGroup>
                <FormGroup>
                  <Label for="tel">Telefonnummer</Label>
                  <Input type="tel" name="tel" id="tel" value={tel} onChange={e => setTel(e.currentTarget.value)} placeholder="Telefonnummer" />
                </FormGroup>
                <FormGroup>
                  <Label for="mail">E-Mail</Label>
                  <Input type="mail" name="mail" id="mail" value={mail} onChange={e => setMail(e.currentTarget.value)} placeholder="Mail-Adresse" />
                </FormGroup>

              </Form>

            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4"></Col>
            <Col xs="6" sm="4"></Col>
            <Col sm="4"><Button color="primary" onClick={() => { toggle('2'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Besuchte Orte erfassen</h4>       
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('1'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="4"></Col>
            <Col sm="4">  <Button color="primary" onClick={() => { toggle('3'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h4>Weitere Personen erfassen</h4>
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('2'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="4"></Col>
            <Col sm="4">  <Button color="primary" onClick={() => { toggle('4'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <h4>Validierung</h4>
              
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('3'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="4"></Col>
            <Col sm="4"><Button color="primary" onClick={submit}>Daten sichern</Button></Col>
          </Row>
        </TabPane>
      </TabContent>

    </Container>

  )
}
export default Next