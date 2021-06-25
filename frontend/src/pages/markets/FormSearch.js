import React from 'react'
import { Row, Col, Input, Button } from 'reactstrap'

export default function FormSearch(props) {
    let { onChange, formName, formControl, categories, onSubmit } = props
    return (
        <form name={formName} className="my-3" onSubmit={onSubmit }>
            <Row>
                <Col sm="12">
                    <h4 className="mb-3">
                    Filter By:
                    </h4>
                    </Col>
                <Col md="3">
                    <Input
                        type="text"
                        name="marketName"
                        placeholder="Name"
                        value={formControl.marketName}
                        onChange={onChange} />
                </Col>
                <Col md="3">
                    <Input
                        type="select"
                        name="categoryId"
                        value={formControl.categoryId}
                        onChange={onChange}>
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                            <option value={category.id}>{category.name}</option>

                        ))}
                    </Input>
            </Col>
            
            <Col md="3">
                   <Button color="primary">Search</Button>
            </Col>
        </Row>
        </form>
    )
}
