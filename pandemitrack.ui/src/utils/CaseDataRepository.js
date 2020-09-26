import { func } from "prop-types";
import { fetchState } from "./StatusTools";

export default async function getCaseData(id) {
    if (id === "new") {
        return [{
            Created: new Date(),
            TestDate: new Date(),
            PositivTestDate: null,
            QuarantineBegin: null,
            QuarantineEnd: null,
            Subject: {
                Name: "",
                Phone: "",
                Mail: "",
                Address: "",
                PostCode: 0,
                City: ""
            },
            Visits: [],
            DependentSubjects: []
        }, true];
    }
    else {
        const request = await fetch(`/odata/cases(${id})?$expand=Subject,Visits($expand=Location),DependentSubjects($expand=Visitor)`);
        if (request.status === 200) {
            const json = await request.json();

            // Aktuellen Status abrufen
            for (let entry of json.DependentSubjects) {
                entry.CurrentState = await fetchState(json.Id, entry.Id);
            }

            return [json, false];
        }
        else {
            return await getCaseData("new");
        }
    }
}