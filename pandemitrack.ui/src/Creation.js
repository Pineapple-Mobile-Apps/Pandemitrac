import React, { useState } from 'react';
import classnames from 'classnames';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Nav, NavLink, NavItem, TabContent, TabPane, Row, Col, Alert } from 'reactstrap';
let Next = () => {
  //Verwaltung der Tabs deren Status
  const [activeTab, setActiveTab] = useState("person");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  //Nutzung des verschachtelten Objektes
  const [caseData, setCaseData] = useState({
    Created: new Date(),
    TestDate: new Date(),
    PositivTestDate: null,
    QuarantineBegin: null,
    QuarantineEnd: null,
    Subject: {
      Name: "",
      Phone: "",
      Mail: "",
      Address: "",
      PostCode: 0,
      Tel: "",
      City: ""
    },
    Visits: [],
    DependentSubjects: []
  });

  //Case
  const [testDate, setTestDate] = useState("");
  const [positivTestDate, setPositivTestDate] = useState("");
  const [quarantineBegin, setQuarantineBegin] = useState("");
  const [quarantineEnd, setQuarantineEnd] = useState("");


  //Persönliche Daten -Subject
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [housenumber, setHousnumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");

  //Visit
  const [visitBegin, setVisitBegin] = useState("");
  const [visitEnd, setVisitEnd] = useState("");

  //Locationdaten
  const [locationName, setLocationName] = useState("");
  const [locationContactPerson, setLocationContactPerson] = useState("");
  const [locationPhone, setLocationPhone] = useState("");
  const [locationAdress, setLocationAdress] = useState("");
  const [locationPostCode, setLocationPostCode] = useState("");
  const [locationCity, setLocationCity] = useState("");


  const submit = async () => {
    let dataObject = {
      Created: new Date(),
      TestDate: testDate,
      PositivTestDate: positivTestDate,
      QuarantineBegin: quarantineBegin,
      QuarantineEnd: quarantineEnd,
      Subject: {
        Name: name,
        Mail: mail || null,
        Address: street + " " + housenumber || "",
        PostCode: parseInt(postcode) || 0,
        Phone: tel || null,
        City: city || ""
      },
      Visits: [],
      DependentSubjects: []
    };
    
    let result = await fetch("/odata/visitors", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        Name: name,
        Adress: street + " " + housenumber || "",
        PostCode: parseInt(postcode) || 0,
        City: city || "",
        Phone: tel || null,
        Mail: mail || null
      })
    });
  };

  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === 'person' })}
            onClick={() => { toggle('person'); }}>
            Persönliche Daten
              </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { toggle('info'); }}
            className={classnames({ active: activeTab === 'info' })} >
            Information zur Infektion
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { toggle('visits'); }}
            className={classnames({ active: activeTab === 'visits' })} >
            Besuchte Orte
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { toggle('dependents'); }}
            className={classnames({ active: activeTab === 'dependents' })} >
            Abhängige Personen
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { toggle('validate'); }}
            className={classnames({ active: activeTab === 'validate' })} >
            Validierung und Absenden
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="person">
          <Row>
            <Col sm="12">
              <Alert color="info">
                Hier kannst du die persönlichen Daten erfassen. Bitte achte auf die korrekte Schreibweise und frage ggf. nach.
                Ein Prüfung auf Duplikate findet statt.
              </Alert>
            </Col>
          </Row>
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
            <Col xs="6" sm="6"></Col>
            <Col sm="2"><Button color="primary" onClick={() => { toggle('info'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="info">
          <Row>
            <Col sm="12">
              <Alert color="info">
                Bitte Frage nach Daten zur Infektion
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Form>
                <FormGroup>
                  <Label for="testDate">Datum des Coronatest</Label>
                  <Input type="datetime-local" name="testDate" id="testDate" value={testDate} onChange={e => setTestDate(e.currentTarget.value)} placeholder="Datum des Coronatest" />
                </FormGroup>
                <FormGroup>
                  <Label for="positivTestDate">Datum des postiven Coronatest</Label>
                  <Input type="datetime-local" name="positivTestDate" id="positivTestDate" value={positivTestDate} onChange={e => setPositivTestDate(e.currentTarget.value)} placeholder="Datum des postiven Coronatest" />
                </FormGroup>
                <FormGroup>
                  <Label for="quarantineBegin">Beginn der Quarantäne</Label>
                  <Input type="datetime-local" name="quarantineBegin" id="quarantineBegin" value={quarantineBegin} onChange={e => setQuarantineBegin(e.currentTarget.value)} placeholder="Beginn der Quarantäne" />
                </FormGroup>
                <FormGroup>
                  <Label for="quarantineEnd">Ende der Quarantäne</Label>
                  <Input type="datetime-local" name="quarantineEnd" id="quarantineEnd" value={quarantineEnd} onChange={e => setQuarantineEnd(e.currentTarget.value)} placeholder="Ende der Quarantäne" />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('person'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="6"></Col>
            <Col sm="2">  <Button color="primary" onClick={() => { toggle('visits'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="visits">
          <Row>
            <Col sm="12">
              <Alert color="info">
                Bitte Frage nach den besuchten Orten und den ungefähren Zeiträumen. Desto genauer du die Daten erfassen kannst, desto weniger Daten müssen angefordert werden.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Form>
                <FormGroup>
                  <Label for="locationName">Name des Ortes / der Veranstaltung</Label>
                  <Input type="text" name="locationName" id="locationName" value={locationName} onChange={e => setLocationName(e.currentTarget.value)} placeholder="Name des Ortes" />
                </FormGroup>
                <FormGroup>
                  <Label for="locationContactPerson">Kontaktperson</Label>
                  <Input type="text" name="locationContactPerson" id="locationContactPerson" value={locationContactPerson} onChange={e => setLocationContactPerson(e.currentTarget.value)} placeholder="(optional) Ansprechpartner Vorort" />
                </FormGroup>
                <FormGroup>
                  <Label for="locationPhone">Telefonnummer</Label>
                  <Input type="text" name="locationPhone" id="locationPhone" value={locationPhone} onChange={e => setLocationPhone(e.currentTarget.value)} placeholder="(optional) Telefonnummer" />
                </FormGroup>
                <FormGroup>
                  <Label for="locationAdress">Straße</Label>
                  <Input type="text" name="locationAdress" id="locationAdress" value={locationAdress} onChange={e => setLocationAdress(e.currentTarget.value)} placeholder="Adresse des Ortes / der Veranstaltung" />
                </FormGroup>
                <FormGroup>
                  <Label for="locationPostCode">Postleitzahl</Label>
                  <Input type="text" name="locationPostCode" id="locationPostCode" value={locationPostCode} onChange={e => setLocationPostCode(e.currentTarget.value)} placeholder="Postleitzahl" />
                </FormGroup>
                <FormGroup>
                  <Label for="locationCity">Stadt</Label>
                  <Input type="text" name="locationCity" id="locationCity" value={locationCity} onChange={e => setLocationCity(e.currentTarget.value)} placeholder="Stadt" />
                </FormGroup>
                <FormGroup>
                  <Label for="visitBegin">Beginn des Besuch</Label>
                  <Input type="datetime-local" name="visitBegin" id="visitBegin" value={visitBegin} onChange={e => setVisitBegin(e.currentTarget.value)} placeholder="Beginn des Besuch" />
                </FormGroup>
                <FormGroup>
                  <Label for="visitEnd">Ende des Besuch</Label>
                  <Input type="datetime-local" name="visitEnd" id="visitEnd" value={visitEnd} onChange={e => setVisitEnd(e.currentTarget.value)} placeholder="Ende des Besuch" />
                </FormGroup>

              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('info'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="6"></Col>
            <Col sm="2">  <Button color="primary" onClick={() => { toggle('dependents'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="dependents">
          <Row>
            <Col sm="12">
              <Alert color="info">
                Bitte Frage nach weiteren Personen die im selben Haushalt leben.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('visits'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="6"></Col>
            <Col sm="2">  <Button color="primary" onClick={() => { toggle('validate'); }}>zur nächsten Seite</Button></Col>
          </Row>
        </TabPane>
        <TabPane tabId="validate">
          <Row>
            <Col sm="12">
              <Alert color="info">
                Bitte prüfen die Daten vor dem Senden.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">  <Button onClick={() => { toggle('dependets'); }}>zur vorherigen Seite</Button></Col>
            <Col xs="6" sm="6"></Col>
            <Col sm="2"><Button color="primary" onClick={submit}>Daten sichern</Button></Col>
          </Row>
        </TabPane>
      </TabContent>

    </Container>

  )
}
export default Next