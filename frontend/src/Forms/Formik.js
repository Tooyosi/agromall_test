import React, { Component, Children } from 'react'
import { Formik } from "formik"
import PropTypes from 'prop-types';

const FormsWrapper = (props) => {
    let { children, validationSchema, values, handleSubmit, handleChange } = props
    return (
        <Formik
            initialValues={{ ...values }}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            // enableReinitialize={true}
            validateOnChange={true}
            validationSchema={validationSchema}
            {...props}
        >
            {children}
        </Formik>

    )
}

FormsWrapper.propTypes = {
    validationSchema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
};

export default FormsWrapper;


export const showFieldError = (name, errors, touched) => {
    return (
        <>
            {touched[name] &&errors[name] && errors[name].trim() !== "" ?
                <div className="mb-2">
                    <small className="text-danger">{errors[name]}</small>
                </div>

                : null}
        </>

    )
}