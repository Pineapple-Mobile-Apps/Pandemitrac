import Loading from "./Loading";
import React from "react";
import { Alert } from "reactstrap";

export default function LoadingGuard(props) {
    if (props.isLoading) {
        return <Loading />;
    }
    else if (props.error !== null) {
        return <Alert color="danger">
            Beim Abrufen der Daten ist ein Fehler aufgetreten.<br/>
            Bitte erneut versuchen.
        </Alert>
    }
    else {
        return props.children;
    }
}