export function getAvailableStates(currentState) {
    switch (currentState) {
        case "Pending":
            return [ "NotAvailable", "TestPending" ];
        case "NotAvailable":
            return [ "Testing" ];
        case "TestPending":
            return [ "Testing" ];
        case "Testing":
            return [ "Positiv", "Negativ" ];
        case "Positiv":
            return [  ];
        case "Negativ":
            return [  ];
        default:
            throw new Error("Unknown State");
    }
}

export function stringifyState(state) {
    switch (currentState) {
        case "Pending":
            return "Kontakt ausstehend";
        case "NotAvailable":
            return "Kontakt nicht erreichbar";
        case "TestPending":
            return "Test ausstehend";
        case "Testing":
            return "Wird getestet";
        case "Positiv":
            return "Test positiv";
        case "Negativ":
            return "Test negativ";
        default:
            throw new Error("Unknown State");
    }
}
