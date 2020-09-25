import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Container, TabContent } from "reactstrap";
import LoadingGuard from "./LoadingGuard";
import useFetch from "./useFetch";
import PropsTable from "./shared/PropsTable";
import React from "react";

export default function CaseDetails() {
    const { id } = useParams();

    const caseRequest = useFetch(`/odata/cases(${id})?$expand=Subject`, undefined, [id]);

    const { data } = caseRequest;

    console.log("Data", data);

    return <LoadingGuard isLoading={caseRequest.isLoading} error={caseRequest.error}>
        <Container>
            <Card>
                <CardBody>
                    <CardTitle tag="h3">
                        {data?.Subject?.Name}
                    </CardTitle>
                </CardBody>
                <PropsTable data={{
                    "Erstellt": data?.Created
                }} />
            </Card>
        </Container>
    </LoadingGuard>
}