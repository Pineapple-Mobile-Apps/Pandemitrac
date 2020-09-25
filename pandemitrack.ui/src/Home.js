import React, {useState} from 'react';
import { Table, Container } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


let Home = () => {
    const [data, setData] = useState([
        {
            anzahl:"1",
            name: "Rudolf Schefer",
            sachbearbeiter: "Max mustermann",
            status: "Corona negativ",
            telefonnummer: "0157 89238123",
            emailAdresse: "MaxMustermann@outlook.de",
        }
    ]);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Container>
            <FormGroup>
            <div>
                <h1>Erfassung</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Anruf angenommen</th>
                            <th>E-Mail bekommen</th>
                            <th>Sachbearbeiter</th>
                            <th>Kommentar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(d => <tr>
                                <td>{d.anzahl}</td>
                                <td>{d.name}</td>
                                <td>{d.status}</td>
                                <td>
                                    {d.telefonnummer}
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Ja</option>
                                        <option>Nein</option>
                                    </Input>
                                </td>
                                <td>
                                    {d.emailAdresse}
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Ja</option>
                                        <option>Nein</option>
                                    </Input>
                                </td>
                                <td>{d.sachbearbeiter}</td>
                                <td><Input type="textarea" name="text" id="exampleText" /></td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
            </FormGroup>
        </Container>
    )
}
export default Home