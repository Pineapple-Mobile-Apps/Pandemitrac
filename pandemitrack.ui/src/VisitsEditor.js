import { Button, Form, Row, Col, FormGroup, CardBody, Card, Label, CardTitle, Input, CardFooter, CardHeader } from "reactstrap";
import React from "react";
import { createArrayChanger, createInput, createChanger } from "./utils/StateValueTools";

export default function VisitsEditor(props) {
    const { visits, setVisits } = props;

    const arrayChanger = createArrayChanger(visits, setVisits);

    const addEntry = () => {
        setVisits([...visits, {
            Location: {}
        }]);
    };

    return <>
        <Button color="success" onClick={addEntry}>
            Neuer Besuch
        </Button>
        {
            visits.map((v, i) => <VisitEditor visit={v} setVisit={arrayChanger(i)} key={i} />)
        }
    </>;
}

function VisitEditor(props) {

    const input = createInput(props.visit, props.setVisit);
    const changer = createChanger(props.visit, props.setVisit);

    return <Card className="mt-3">
        <Form>
        <CardHeader>
            <CardTitle>Besuchter Ort</CardTitle>
        </CardHeader>
        <CardBody>

        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Besuchsbeginn</Label>
            <Input type="datetime-local" {...input("Begin")} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Besuchsende</Label>
            <Input type="datetime-local" {...input("End")} />
          </FormGroup>
        </Col>
        </Row>
            <Label>Kontaktdatum</Label>
            <Input type="datetime-local" {...input("Contacted")} />
            <LocationEditor location={props.visit.Location} setLocation={e => changer("Location", e)} />
        </CardBody>
        <CardFooter>
            <Button onClick={() => props.setVisit(null)}>Entfernen</Button>
        </CardFooter>
        </Form>
    </Card>;
}

function LocationEditor(props) {

    //const changer = createChanger(props.location, props.setLocation);

    const input = createInput(props.location, props.setLocation);

    return <>
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Name</Label>
            <Input {...input("Name")} placeholder="Cafe XY" />
            <Label>Postleitzahl</Label>
            <Input {...input("PostCode")} type="number" placeholder="44328"/>
            <Label>Kontaktperson</Label>
            <Input {...input("ContactPerson")} placeholder="Max Mustermann" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Adresse</Label>
            <Input {...input("Address")} placeholder="Gleiwitzstraße.200" />
            <Label>Stadt</Label>
            <Input {...input("City")} placeholder="Dortmund"/>
            <Label>Kontakttelefonnummer</Label>
            <Input {...input("Phone")} type="tel" placeholder="015789346273"/>
          </FormGroup>
        </Col>
      </Row>
    </>

}