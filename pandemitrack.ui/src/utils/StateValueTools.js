export const createChanger = (value, setter) => {
    return (key, fValue) => {
        value[key] = fValue;
        setter(value);
    };
}

export const createInput = (value, setter) => {
    const changer = createChanger(value, setter);

    return field => {
        return {
            value: value[field],
            onChange: e => changer(field, e.currentTarget.value)
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