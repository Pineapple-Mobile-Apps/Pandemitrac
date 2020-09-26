import { CardHeader, CardTitle, Table } from "reactstrap";
import { createArrayChanger } from "./utils/StateValueTools";
import React from 'react';

export default function DependentSubjectsEditor(props) {

    const { dependentSubjects, setDependentSubjects } = props;

    const arrayChanger = createArrayChanger(dependentSubjects, setDependentSubjects);

    return <Table>
        <thead>
            <th>Name</th>
            <th>Status</th>
        </thead>
        <tbody>
            {dependentSubjects.map((d, i) =>
                <DependentSubjectEditor dependentSubject={d} setDependentSubject={arrayChanger(i)} key={d.Id} />
            )}
        </tbody>
    </Table>;
}

function DependentSubjectEditor(props) {
    const { dependentSubject, setDependentSubject } = props;

    return <tr>
        <th scope="row">{dependentSubject.Visitor.Name}</th>
        <td>TBD</td>
    </tr>;
}