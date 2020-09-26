import React from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, NavLink, Row } from 'reactstrap';
import { Table } from 'reactstrap';


let Infection = () => {
    return (
        <Container >
            <Col sm="6" className="text-center">
               <Card body className="text-center">
                <CardTitle>Infektionsgraph</CardTitle>
                <CardImg top height="100%" top width="100%" src="/images/grafik.png" alt="Infektionsgraph" />
                </Card>
                </Col>
            </Container>
        
    )
}
export default Infection