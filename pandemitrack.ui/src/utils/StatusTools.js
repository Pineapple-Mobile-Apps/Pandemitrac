export function getAvailableStates(currentState) {
    switch (currentState) {
        case "Pending":
            return ["NotAvailable", "TestPending"];
        case "NotAvailable":
            return ["Testing"];
        case "TestPending":
            return ["Testing"];
        case "Testing":
            return ["Positiv", "Negativ"];
        case "Positiv":
        case "Negativ":
        case "Unknown":
            return [];
        default:
            throw new Error("Unknown State");
    }
}

export function stringifyState(currentState) {
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
        case "Unknown":
            return "Unbekannt";
        default:
            throw new Error("Unknown State");
    }
}

export async function fetchState(caseId, entryId) {
    // /odata/cases(1)/status(subjectId=1)
    const result = await fetch(`/odata/cases(${caseId})/status(subjectId=${entryId})`);
    if (result.status === 200) {
        const json = await result.json();
        return json.CurrentState;
    }
    else {
        return "Unknown";
    }
}