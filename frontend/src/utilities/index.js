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