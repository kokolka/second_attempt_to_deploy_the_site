export const maxLengthCreator = (maxLength) => {
    return (value) => {
        if(value && value.length > maxLength) return `${maxLength} character limit exceeded'`;

        return undefined;
    }
}

export const validation = value =>{
    if(value) return undefined;

    return 'Field is required';
}