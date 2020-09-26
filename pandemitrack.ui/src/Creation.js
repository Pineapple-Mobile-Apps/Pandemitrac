import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Nav, NavLink, NavItem, TabContent, TabPane, Row, Col, Alert } from 'reactstrap';
import VisitsEditor from './VisitsEditor';
import { createChanger, createInput } from './utils/StateValueTools';
import DependentSubjectsEditor from './DependentSubjectEditor';
import { useParams } from 'react-router';
import getCaseData from './utils/CaseDataRepository';
import Loading from './Loading';

const Next = () => {

  const { id } = useParams();

  const [saveState, setSaveState] = useState(); // None, Saving, Error 

  //Verwaltung der Tabs deren Status
  const [activeTab, setActiveTab] = useState("person");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  //Nutzung des verschachtelten Objektes
  const [caseData, setCaseData] = useState(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(async () => {
    const [caseResponse, isNew] = await getCaseData(id);
    console.log("Got Data", caseResponse);
    setCaseData(caseResponse);
    setIsNew(isNew);
  }, [id]);

  const input = createInput(caseData, setCaseData);
  const changer = createChanger(caseData, setCaseData);

  const submit = async () => {
    setSaveState("Saving");

    let result = await fetch("/odata/cases", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      body: JSON.stringify(caseData)
    });

    if (result.status == 201) {
      window.open("/home", "_self");
    }
    else {
      setSaveState("error");
    }
  };

  if (saveState === "Saving") {
    return <Alert color="primary">
      Speichere Daten bitte waren...
    </Alert>;
  }

  if (caseData === null) {
    return <Loading />
  }

  return (
    <Container>
      {saveState === "Error" && <Alert color="error">
        Daten konnten nicht gespeichert werden. Bitte erneut versuchen.
      </Alert>}
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
        {isNew && <NavItem>
          <NavLink onClick={() => { toggle('validate'); }}
            className={classnames({ active: activeTab === 'validate' })} >
            Validierung und Absenden
          </NavLink>
        </NavItem>}
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
              <VisitorEditor visitor={caseData.Subject} setVisitor={e => changer("Subject", e)} disabled={!isNew} />
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
                  <Label for="testDate">Datum des Testes</Label>
                  <Input type="datetime-local" name="testDate" id="testDate" {...input("TestDate", "date")} placeholder="Datum des Coronatest" />
                </FormGroup>
                <FormGroup>
                  <Label for="positivTestDate">Datum des postiven Testes</Label>
                  <Input type="datetime-local" name="positivTestDate" id="positivTestDate" {...input("PositivTestDate", "date")} placeholder="Datum des postiven Coronatest" />
                </FormGroup>
                <FormGroup>
                  <Label for="quarantineBegin">Beginn der Quarantäne</Label>
                  <Input type="datetime-local" name="quarantineBegin" id="quarantineBegin" {...input("QuarantineBegin", "date")} placeholder="Beginn der Quarantäne" />
                </FormGroup>
                <FormGroup>
                  <Label for="quarantineEnd">Ende der Quarantäne</Label>
                  <Input type="datetime-local" name="quarantineEnd" id="quarantineEnd" {...input("QuarantineEnd", "date")} placeholder="Ende der Quarantäne" />
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
              <VisitsEditor visits={caseData.Visits} setVisits={e => changer("Visits", e)} />
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
                Bitte Frage nach weiteren Personen mit denen ein Kontakt bestand.
              </Alert>
              <DependentSubjectsEditor dependentSubjects={caseData.DependentSubjects} setDependentSubjects={e => changer("DependentSubjects", e)} />
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

function VisitorEditor(props) {

  const { visitor, setVisitor, disabled } = props;

  const input = createInput(visitor, setVisitor);

  return <Form>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input type="text" id="name" {...input("Name")} placeholder="Voller Name" disabled={disabled} />
    </FormGroup>
    <FormGroup>
      <Label for="street">Straße und Hausnummer</Label>
      <Input type="text" disabled={disabled} name="street" id="street" placeholder="Strasse" {...input("Address")} />
    </FormGroup>
    <FormGroup>
      <Label for="postcode">Postleitzahl</Label>
      <Input type="number" disabled={disabled} name="postcode" id="postcode" {...input("PostCode")} placeholder="Postleitzahl" />
    </FormGroup>
    <FormGroup>
      <Label for="city">Stadt</Label>
      <Input type="text" disabled={disabled} name="city" id="city" {...input("City")} placeholder="Stadt" />
    </FormGroup>
    <FormGroup>
      <Label for="tel">Telefonnummer</Label>
      <Input type="tel" disabled={disabled} name="tel" id="tel" {...input("Phone")} placeholder="Telefonnummer" />
    </FormGroup>
    <FormGroup>
      <Label for="mail">E-Mail</Label>
      <Input type="mail" disabled={disabled} name="mail" id="mail" {...input("Mail")} placeholder="Mail-Adresse" />
    </FormGroup>
  </Form>;
}