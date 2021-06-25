import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import { login } from '../../services/authService'
import { onChange } from '../../utilities'
import { showError, showLoading } from '../../utilities/utility_alert'
import Form from './Form'

export default function Auth() {
    const [state, setstate] = useState({
        formLogin: {
            email: '',
            password: ''
        }
    })

    const handleChange = (e)=>{
        onChange(e, state, setstate)
    }

    const handleSubmit = async ()=>{
        try {
            showLoading()
            let {data} = await login(state.formLogin)
            localStorage.setItem("token", data?.data?.access_token)
            localStorage.setItem("user", JSON.stringify(data.data))
            window.location.href ="/markets"
        } catch (error) {
            showError(error?.response?.data?.description?.message || error?.response?.data?.description || "An error occured")
        }
    }
    return (
        <Container>
            <Row className="vh-100">
                <Col md="4" className="m-auto">
                    <Card>
                        <CardHeader>
                            Login
                        </CardHeader>
                        <CardBody>
                            <Form
                                formControl={state}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                formName="formLogin"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
