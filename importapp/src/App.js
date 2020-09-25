import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Container, FormText, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import classnames from 'classnames';
import Dropdown from 'react-dropdown';
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
  const [mail, setmail] = useState("");
  const [city, setcity] = useState("");
  const [postCode, setpostCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [validator, setValidator] = useState(new SimpleReactValidator({ locale: 'de' }));
  const [dummy, setDummy] = useState(0);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const options = [
    
  ];
 
  const onFormSubmit = async () => {
    if (validator.allValid()) {
      let result = await fetch("/api/Visitor/createDepending?caseid=1", {
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
  return (
    <div>
      <div>
  <Dropdown options={options} placeholder="Select an option" />;

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
                      <Input type="text" value={name} onChange={e => setName(e.currentTarget.value)} id="lastName" placeholder="Geben sie den Nachnamen ein" />
                      {validator.message('name', { name }, 'required|alpha_dash_space')}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="address">Straße</Label>
                      <Input type="text" value={address} onChange={e => setAddress(e.currentTarget.value)} id="address" placeholder="Geben sie die Adresse ein" />
                      {validator.message('address', { address }, 'required')}

                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="postCode">PLZ</Label>
                      <Input type="text" value={postCode} onChange={e => setpostCode(e.currentTarget.value)} id="postCode" placeholder="Geben sie die PLZ ein" />
                      {validator.message('postCode', postCode, 'required|numeric|min:5|max:5', { className: 'text-danger' })}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="city">Stadt</Label>
                      <Input type="text" value={city} onChange={e => setcity(e.currentTarget.value)} id="city" placeholder="Geben sie den Ort ein" />
                      {validator.message('city', city, 'required|alpha_dash_space', { className: 'text-danger' })}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="phone">Handynummer</Label>
                      <Input type="text" value={phone} onChange={e => setphone(e.currentTarget.value)} id="phone" placeholder="Geben sie die Handynummer ein" />
                      {validator.message('phone', phone, 'required|phone', { className: 'text-danger' })}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="mail">E-Mailadresse</Label>
                      <Input type="text" value={mail} onChange={e => setmail(e.currentTarget.value)} id="mail" placeholder="Geben sie die E-Mailadresse ein" />
                      {validator.message('mail', mail, 'required|email', { className: 'text-danger' })}

                    </FormGroup>
                  </Col>
                </Row>
                <Button onClick={onFormSubmit}>Daten abschicken</Button>
              </Form >
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
              </Col>
              <Col sm="6">
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default App;
