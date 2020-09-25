import React, { useState } from 'react';
import { Table, Container } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LoadingGuard from './LoadingGuard';
import useFetch from './useFetch';

const Home = () => {
    const casesRequest = useFetch("/odata/cases?$expand=Subject", undefined, []);

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
                            casesRequest?.data?.map(d => <tr>
                                <td>{d.Id}</td>
                                <td>{d.Subject.Name}</td>
                                <td>Musterbearbeiter</td>
                                <td>
                                    <Button color="primary" tag="a" href={`case/${d.Id}`}>
                                        Infos
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