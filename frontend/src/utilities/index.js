export const onChange = (e, state, changeState) => {
    const input = e.target;
    const form = input.form
    const value = input.type === 'checkbox' ? input.checked : input.value;

    changeState({
        ...state,
        [form.name]: {
            ...state[form.name],
            [input.name]: value,
        }
    });
}