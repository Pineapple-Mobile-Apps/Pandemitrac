import React, { useState } from 'react';
import { Table, Container } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LoadingGuard from './LoadingGuard';
import useFetch from './useFetch';

const Home = () => {
    const casesRequest = useFetch("/odata/cases?$expand=Subject", undefined, []);

    const cases = casesRequest?.data?.value;

    return (
        <LoadingGuard isLoading={casesRequest.isLoading} error={casesRequest.error}>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Fallnummer</th>
                            <th>Name</th>
                            <th>Sachbearbeiter</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cases?.map(d => <tr>
                                <td>{d.Id}</td>
                                <td>{d.Subject.Name}</td>
                                <td>Musterbearbeiter</td>
                                <td>
                                    <Button color="primary" tag="a" href={'case/${d.Id}'}>
                                        Infos
                                    </Button>
                                    <Button color="secondary" tag="a" href={'/import/recover/4711/2020-09-20T09:00/2020-09-20T14:00'}>
                                 
                                        Kontaktformulare abrufen
                                    </Button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </LoadingGuard>
    )
}
export default Home