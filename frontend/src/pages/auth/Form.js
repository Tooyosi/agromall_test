import React from 'react'
import FormsWrapper, { showFieldError } from '../../Forms/Formik'
import { Button, Col, FormGroup, Input, Label, Row, UncontrolledCollapse, CardBody, Card } from 'reactstrap'
import * as Yup from "yup"


const validation = Yup.object().shape({
    email: Yup.string().required("Required").email("Enter a valid email address"),
    password: Yup.string()
        .required("Required"),
})


export default function Form(props) {
    let { formControl, onChange, formName} = props

    return (
        <FormsWrapper
            values={formControl}
            handleSubmit={props.onSubmit}
            handleChange={props.onChange}
            validationSchema={validation}>
            {
                props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit } = props;
                    return (
                        <form onChange={onChange} name={formName} onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label className="text-main-title font-weight-bold small">Email Address</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    onBlur={handleBlur}
                                    value={values.email}
                                    invalid={touched.email && errors.email}
                                    onChange={handleChange} />
                                {showFieldError("email", errors, touched)}

                            </FormGroup>
                            <FormGroup>
                                <Label className="text-main-title font-weight-bold small">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    onBlur={handleBlur}
                                    value={values.password}
                                    invalid={errors.password && touched.password}
                                    onChange={handleChange} />
                                {showFieldError("password", errors, touched)}
                            </FormGroup>
                            <Row as="row">

                                <Col sm="12" className="mt-2">

                                    <Button color="primary" className="btn-floating small">Login In</Button>
                                </Col>

                            </Row>
                        </form>
                    )
                }
            }
        </FormsWrapper >

    )
}
