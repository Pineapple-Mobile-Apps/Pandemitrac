import React, { useEffect } from 'react';
import { Container, Jumbotron } from 'reactstrap';

let Launch = () => {
    useEffect(() => {
        let body = document.querySelector("body");
        body.className = "background";
        return () => body.className = "";
    }, []);

    return (
        <Container>
            <Jumbotron>
                <h1 className="display-3">Hallo Corona Held_in!</h1>
                <p className="lead">Danke, dass du unermüdlich hilfst Infektionsketten nachzuvollziehen und aufzudecken.</p>
                <hr className="my-2" />
                <p>Wir helfen dir dabei, dass du deine Arbeit so einfach wie möglich machen kannst.</p>
                <p className="lead">

                </p>
            </Jumbotron>
        </Container>
    )
}
export default Launch