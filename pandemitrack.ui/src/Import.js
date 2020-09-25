import React, {  } from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, NavLink, Row } from 'reactstrap';

let Import = () => {


    return (
        <Container>
            <Row >
                <Col>
                <Card>
                    <CardImg top width="100%" src="/images/recover.png" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><Badge color="secondary">New</Badge> recoverapp</CardTitle>
                        <CardSubtitle>Integrationspartner</CardSubtitle>
                        <CardText>Der Datenimport erfolgt automatisch. Hier genügt die Angabe eines Zeitraums und eines Recover Konto.</CardText>
                        <NavLink href="/import/recover">Datenimport starten</NavLink>
                    </CardBody>
                </Card>
                </Col>

                <Col>
                <Card>
                    <CardImg top width="100%" src="/images/manuell.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Corona Formulare</CardTitle>
                        <CardSubtitle>Datendigitalisierung</CardSubtitle>
                        <CardText>Der Datenimport muss für jedes Coronaformular einzeln durchgeführt werden.</CardText>
                        <Button>Datenimport starten</Button>
                    </CardBody>
                </Card>
                </Col>
                <Col>.col</Col>
                <Col>.col</Col>
            </Row>

        </Container>
    )
}
export default Import