import Loading from "./Loading";
import React from "react";

export default function LoadingGuard(props) {
    if (props.isLoading) {
        return <Loading />;
    }
    else {
        return props.children;
    }
}