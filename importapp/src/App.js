import React, { useState, useEffect } from 'react';
import { Dropdown, TabContent, TabPane, Nav, NavItem, NavLink, Col, Container, FormText, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import classnames from 'classnames';
import 'react-dropdown/style.css';

SimpleReactValidator.addLocale('de', {
  required: 'Dies ist ein Mussfeld',
  alpha: 'Nur Buchstaben',
  alpha_space: 'Geben sie ein Namensformat ein',
  phone: 'Geben sie eine Telefonnummer ein',
  email: 'Geben sie ein gültiges E-Mailformat ein',
});

const App = (props) => {
  const [phone, setphone] = useState("");
  const [name2, setName2] = useState("");
  const [mail, setmail] = useState("");
  const [city, setcity] = useState("");
  const [postCode, setpostCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [validator, setValidator] = useState(new SimpleReactValidator({ locale: 'de' }));
  const [dummy, setDummy] = useState(0);
  const [file, setFile] = useState("");

  const [activeTab, setActiveTab] = useState('1');
  const [cases, setCases] = useState([]);
  const [selectoption, setselectoption] = useState('1');
  useEffect(async () => {
    let response = await fetch("/odata/cases?$expand=Subject");
    let data = await response.json();
    setCases(data.value);
  }, [])

  const onChangeMulti = (event) => {
    debugger;
    let index = event.currentTarget.selectedIndex;
    setselectoption(cases[index].Id);
  }


  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const options = [

  ];

  const onFormSubmit = async () => {
    let string = "/api/Visitor/createDepending?caseid=" + selectoption;
    if (validator.allValid()) {
      let result = await fetch(string, {
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          address: address,
          postCode: parseInt(postCode),
          city: city,
          phone: phone,
          mail: mail
        })
      });
      setphone("");
      setName("");
      setAddress("");
      setpostCode("");
      setcity("");
      setmail("");


    } else {
      validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      setDummy(dummy + 1);
    }
  };

  const onFormFileSubmit2 = async () => {
    let string = "/api/Visitor/createDepending?caseid=" + selectoption;
      let result = await fetch(string, {
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          address: "Hauptstr 47",
          postCode: parseInt("66606"),
          city: "Sankt Bennet",
          phone: "0178123456",
          mail: "coronatest@coronatest.de"
        })
      });
      setName2("");
      
      setFile("");
  };
  return (
    <div>
      <div>
        <Label for="name">Fall auswählen</Label>
        <Input type="select" selectedIndex={selectoption}
          onChange={e =>
            onChangeMulti(e)}
          name="select" id="exampleSelect">
          {cases.map(c =>
            <option key={c.Id}>{c.Subject.Name}</option>
          )}


        </Input>

      </div>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Manuellen Datensatz erfassen
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              PDF Datei hochladen          </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">

            <Container>
              <Form>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input type="text" value={name} onChange={(event) => { setName(event.currentTarget.value) }} id="lastName" placeholder="Voller Name" />
                      {validator.message('name', { name }, 'required|alpha_space')}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="address">Straße</Label>
                      <Input type="text" value={address} onChange={e => setAddress(e.currentTarget.value)} id="address" placeholder="Adresse" />
                      {validator.message('address', { address }, 'required')}

                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="postCode">PLZ</Label>
                      <Input type="text" value={postCode} onChange={e => setpostCode(e.currentTarget.value)} id="postCode" placeholder="PLZ" />
                      {validator.message('postCode', postCode, 'required|numeric|min:5|max:5', { className: 'text-danger' })}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="city">Stadt</Label>
                      <Input type="text" value={city} onChange={e => setcity(e.currentTarget.value)} id="city" placeholder="Stadt" />
                      {validator.message('city', city, 'required|alpha_dash_space', { className: 'text-danger' })}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="phone">Telefonnummer</Label>
                      <Input type="text" value={phone} onChange={e => setphone(e.currentTarget.value)} id="phone" placeholder="Telefonnummer" />
                      {validator.message('phone', phone, 'required|phone', { className: 'text-danger' })}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="mail">E-Mail</Label>
                      <Input type="text" value={mail} onChange={e => setmail(e.currentTarget.value)} id="mail" placeholder="E-Mail" />
                      {validator.message('mail', mail, 'required|email', { className: 'text-danger' })}

                    </FormGroup>
                  </Col>
                </Row>
                <Button onClick={onFormSubmit}>Daten abschicken</Button>
              </Form >
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Form>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" value={name2} onChange={(event) => { setName2(event.currentTarget.value) }} id="lastName" placeholder="Voller Name" />
                    {validator.message('name2', { name2 }, 'required|alpha_space')}
                  </FormGroup>
                </Col>
              </Row>
              <Row><Col> <Label for="exampleFile">Dateo</Label>
                <Input type="file" value={file} onChange={(event) => { setFile(event.currentTarget.value) }} id="exampleFile" /></Col></Row>
              <Button onClick={onFormFileSubmit2}>Daten abschicken</Button>
            </Form >
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default App;
