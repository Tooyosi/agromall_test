import React from 'react'
import FormsWrapper, { showFieldError } from '../../../Forms/Formik'
import { Button, Col, FormGroup, Input, Label, Row, UncontrolledCollapse, CardBody, Card } from 'reactstrap'
import * as Yup from "yup"


const validation = Yup.object().shape({
    marketName: Yup.string().required("Required"),
    description: Yup.string()
        .required("Required"),
    categoryId: Yup.string()
        .required("Required"),
    houseNo: Yup.string()
        .required("Required"),
    street: Yup.string()
        .required("Required"),
    state: Yup.string()
        .required("Required"),
        // files:  Yup.array()
        // .min(3, 'Select 3 files'),
})


export default function FormAdd(props) {
    let { formControl, onChange, formName, categories, isEdit } = props

    return (
        <FormsWrapper
            values={formControl}
            handleSubmit={props.onSubmit}
            handleChange={props.onChange}
            validationSchema={!isEdit && validation}>
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
                            <Row>
                                <Col md="6">
                                    <Label className="text-main-title font-weight-bold small">Market Name</Label>
                                    <Input
                                        type="text"
                                        name="marketName"
                                        onBlur={handleBlur}
                                        value={values.marketName}
                                        invalid={touched.marketName && errors.marketName}
                                        onChange={handleChange} />
                                    {showFieldError("marketName", errors, touched)}
                                </Col>
                                <Col md="6">
                                    <Label className="text-main-title font-weight-bold small">Description</Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        onBlur={handleBlur}
                                        value={values.description}
                                        invalid={touched.description && errors.description}
                                        onChange={handleChange} />
                                    {showFieldError("description", errors, touched)}
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Label className="text-main-title font-weight-bold small">Select Category</Label>
                                    <Input
                                        type="select"
                                        name="categoryId"
                                        onBlur={handleBlur}
                                        value={values.categoryId}
                                        invalid={touched.categoryId && errors.categoryId}
                                        onChange={handleChange} >
                                        <option value="">Select Category</option>
                                        {categories?.map((category) => (
                                            <option value={category.id}>{category.name}</option>

                                        ))}
                                    </Input>
                                    {showFieldError("categoryId", errors, touched)}
                                </Col>
                                <Col md="6">
                                    <Label className="text-main-title font-weight-bold small">Select Category</Label>
                                    <Input
                                        type="file"
                                        name="files"
                                        onBlur={handleBlur}
                                        onChange={handleChange} 
                                        multiple/>
                                    {/* {showFieldError("categoryId", errors, touched)} */}
                                </Col>
                            
                            </Row>
                            <Row>
                                <Col md="4" sm="6">
                                    <Label className="text-main-title font-weight-bold small">House Number</Label>
                                    <Input
                                        type="text"
                                        name="houseNo"
                                        onBlur={handleBlur}
                                        value={values.houseNo}
                                        invalid={touched.houseNo && errors.houseNo}
                                        onChange={handleChange} />
                                    {showFieldError("houseNo", errors, touched)}
                                </Col>
                                <Col md="4" sm="6">
                                    <Label className="text-main-title font-weight-bold small">Street</Label>
                                    <Input
                                        type="text"
                                        name="street"
                                        onBlur={handleBlur}
                                        value={values.street}
                                        invalid={touched.street && errors.street}
                                        onChange={handleChange} />
                                    {showFieldError("street", errors, touched)}
                                </Col>
                                <Col md="4" sm="6">
                                    <Label className="text-main-title font-weight-bold small">State</Label>
                                    <Input
                                        type="text"
                                        name="state"
                                        onBlur={handleBlur}
                                        value={values.state}
                                        invalid={touched.state && errors.state}
                                        onChange={handleChange} />
                                    {showFieldError("state", errors, touched)}
                                </Col>

                            </Row>
                            <Row as="row">

                                <Col sm="12" className="mt-2">

                                    <Button color="primary" className="btn-floating small" disabled={!isEdit && values.files < 3}>Submit</Button>
                                </Col>

                            </Row>
                        </form>
                    )
                }
            }
        </FormsWrapper >

    )
}
