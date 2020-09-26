const toIsoDate = dateStr => new Date(dateStr).toISOString();
const toNumber = numStr => parseInt(numStr);
const toInputDate = dateIsoStr => {
    if (dateIsoStr !== null && dateIsoStr !== undefined) {
        var local = new Date(dateIsoStr);
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0, 16);
    }
    return dateIsoStr;
};

export const createChanger = (value, setter) => {
    return (key, fValue, sConverter) => {
        // Object cloning for reasons
        let clone = {};
        Object.assign(clone, value);

        if (sConverter === "number")
            fValue = toNumber(fValue);
        else if (sConverter === "date")
            fValue = toIsoDate(fValue);

        clone[key] = fValue;
        setter(clone);
    };
}

export const createInput = (value, setter) => {
    const changer = createChanger(value, setter);

    return (field, sConverter) => {
        return {
            value: sConverter === "date" ? toInputDate(value[field]) : value[field],
            onChange: e => changer(field, e.currentTarget.value, sConverter)
        };
    }
}

export const createArrayChanger = (array, setArray) => {
    return index => {
        return value => {
            let nArray = [...array];
            if (value === null) {
                nArray.splice(index, 1);
            }
            else {
                nArray[index] = value;
            }
            setArray(nArray);
        }
    }
};