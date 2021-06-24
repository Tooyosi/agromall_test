import React, { useState } from 'react'
import { onChange } from '../../../utilities'
import FormAdd from './FormAdd'
import { Row, Col } from 'reactstrap'
import { getGeocode } from '../../../services/geocodeService'

export default function AddMarket() {
    const [state, setstate] = useState({
        formMarket: {
            marketName: "",
            description: "",
            categoryId: "",
            houseNo: "",
            street: "",
            state: "",
        }
    })

    const handleChange = (e) => {
        onChange(e, state, setstate)
    }

    const handleSubmit = async () => {
        try {
            let { formMarket } = state
            let { data } = await getGeocode(`${formMarket.houseNo}+${formMarket.state}+${formMarket.state}`)
            console.log({ data })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="container">
            <Row className="vh-100">
                <Col className="m-auto" md="6">
                    <FormAdd
                        formControl={state.formMarket}
                        formName="formMarket"
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </Col>
            </Row>
        </div>
    )
}
