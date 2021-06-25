export const onChange = (e, state, changeState) => {
    const input = e.target;
    const form = input.form
    const value = input.type === 'checkbox' ? input.checked : input.value;
    if (input.files && input.files[0]) {
        changeState({
            ...state,
            [form.name]: {
                ...state[form.name],
                [input.name]: input.files
            },
        });
    }
    else {
    changeState({
        ...state,
        [form.name]: {
            ...state[form.name],
            [input.name]: value,
        }
    });}
}

export const getAddress = (address)=>{
    try {
        let newAdd = JSON.parse(address)
        return newAdd.formatted_address
    } catch (error) {
        return address
    }

}

export const getCoordinates = (address)=>{
    try {
        let newAdd = JSON.parse(address)
        console.log({newAdd})
        return {lat: newAdd.lat, lng: newAdd.lng}
    } catch (error) {
        return { lat: 47.444, lng: -122.176}
    }

}