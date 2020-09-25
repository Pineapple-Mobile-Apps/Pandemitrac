import { Table } from "reactstrap";
import React from "react";

export default function PropsTable(props) {
    return <Table>
        <tbody>
            {Object.keys(props.data).map(k =>
                <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{props.data[k]}</td>
                </tr>
            )}
        </tbody>
    </Table>
}