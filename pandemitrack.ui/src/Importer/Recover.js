import React, { useState } from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Jumbotron, Label, Row } from 'reactstrap';

let Recover = () => {

    const [partner, setPartner] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const submit = async () => {
        let result = await fetch("/api/fetch/recover/data", {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Partner: partner,

            })
        });
    };

    return (
        <Container>
            <Row>
                <Col xs="6" sm="4"><Card>
                    <CardImg top width="100%" src="/images/recover.png" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>recoverapp</CardTitle>
                        <CardSubtitle>Integrationspartner</CardSubtitle>
                        <CardText>Der Datenimport erfolgt automatisch. Hier genügt die Angabe eines Zeitraums und eines Recover Konto.</CardText>

                    </CardBody>
                </Card></Col>
                <Col xs="6" sm="8"> <Form>
                    <FormGroup>
                        <Label for="partner">Name des Recover Partner</Label>
                        <Input type="text" name="partner" id="partner" value={partner} onChange={e => setPartner(e.currentTarget.value)} placeholder="Voller Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="start">Beginnzeitraum des Abrufs</Label>
                        <Input type="datetime-local" name="start" id="start" value={start} onChange={e => setStart(e.currentTarget.value)} placeholder="Datum" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="end">Endezeitraum des Abrufs</Label>
                        <Input type="datetime-local" name="end" id="end" value={end} onChange={e => setEnd(e.currentTarget.value)} placeholder="Datum" />
                    </FormGroup>
                </Form></Col>


            </Row>
            <Row>
                <Col xs="6" sm="10"></Col>
                <Col sm="2"><Button color="primary" onClick={submit}>Datenabruf starten</Button></Col>
            </Row>

        </Container>
    )
}
export default Recover