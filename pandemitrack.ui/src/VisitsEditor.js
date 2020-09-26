import { Button, CardBody, Card, Label, CardTitle, Input, CardFooter, CardHeader } from "reactstrap";
import React from "react";
import { createArrayChanger, createInput, createChanger } from "./utils/StateValueTools";

export default function VisitsEditor(props) {
    const { visits, setVisits } = props;

    const arrayChanger = createArrayChanger(visits, setVisits);

    const addEntry = () => {
        setVisits([{
            Location: {}
        }, ...visits]);
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
        <CardHeader>
            <CardTitle>Besuchter Ort</CardTitle>
        </CardHeader>
        <CardBody>
            <Label>Besuchsbeginn</Label>
            <Input type="datetime-local" {...input("Begin", "date")} />

            <Label>Besuchsende</Label>
            <Input type="datetime-local" {...input("End", "date")} />

            <Label>Kontaktdatum</Label>
            <Input type="datetime-local" {...input("Contacted", "date")} />

            <LocationEditor location={props.visit.Location} setLocation={e => changer("Location", e)} />
        </CardBody>
        <CardFooter>
            <Button onClick={() => props.setVisit(null)}>Entfernen</Button>
        </CardFooter>
    </Card>;
}

function LocationEditor(props) {

    //const changer = createChanger(props.location, props.setLocation);

    const input = createInput(props.location, props.setLocation);

    return <>
        <Label>Name</Label>
        <Input {...input("Name")} />

        <Label>Addresse</Label>
        <Input {...input("Address")} />

        <Label>Postleitzahl</Label>
        <Input {...input("PostCode", "number")} type="number" />

        <Label>Stadt</Label>
        <Input {...input("City")} />

        <Label>Kontaktperson</Label>
        <Input {...input("ContactPerson")} />

        <Label>Kontakttelefonnummer</Label>
        <Input {...input("Phone")} type="tel" />
    </>

}