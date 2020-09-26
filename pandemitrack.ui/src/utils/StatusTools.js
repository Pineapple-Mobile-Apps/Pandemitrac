export function getAvailableStates(currentState) {
    switch (currentState) {
        case "Pending":
            break;
        case "NotAvailable":
            break;
        case "TestPending":
            break;
        case "Testing":
            break;
        case "Positiv":
            break;
        case "Negativ":
            break;
        default:
            throw new Error("Unknown State");
    }
}

export function stringifyState(state) {
    switch (currentState) {
        case "Pending":
            return "Kontakt ausstehend";
        case "NotAvailable":
            break;
        case "TestPending":
            break;
        case "Testing":
            break;
        case "Positiv":
            break;
        case "Negativ":
            break;
        default:
            throw new Error("Unknown State");
    }
}