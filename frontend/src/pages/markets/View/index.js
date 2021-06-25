import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap'
import { getSingleMarket } from '../../../services/marketService'
import { getAddress, getCoordinates } from '../../../utilities'
import CustomCarousel from '../../../utilities/Carousel'
import MapComponent from '../../../utilities/MapComponent'

export default function ViewMarket(props) {
    let [market, setMarket] = useState({
        loading: false,
        data: {}
    })

    useEffect(() => {
        fetchMarket()
    }, [])

    const fetchMarket = async () => {
        setMarket({
            ...market,
            loading: true,
        })
        try {
            const { match: { params: { id } } } = props
            let { data } = await getSingleMarket(id)
            setMarket({
                loading: false,
                data: data.data
            })
        } catch (error) {
            props.history.goBack()
        }
    }
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardBody className="vh-100">
                            {market.loading ? <Spinner /> :
                                <Container fluid>
                                    <Row>
                                        <Col sm={12} className="mb-3">
                                            <MapComponent
                                                initialCenter={getCoordinates(market.data?.address)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <p><b>Name:</b> {market.data?.name}</p>
                                            <p><b> Description:</b> {market.data?.description}</p>
                                            <p> <b>Address:</b> {getAddress(market.data?.address)}</p>
                                        </Col>
                                        <Col md={6}>
                                            <CustomCarousel items={[
                                                {
                                                    src: `${process.env.REACT_APP_SERVICE_URL}${market.data?.image1}`,
                                                    altText: '',
                                                    caption: '',
                                                    header: '',
                                                    key: '1'
                                                }, {
                                                    src: `${process.env.REACT_APP_SERVICE_URL}${market.data?.image2}`,
                                                    altText: '',
                                                    caption: '',
                                                    header: '',
                                                    key: '1'
                                                }, {
                                                    src: `${process.env.REACT_APP_SERVICE_URL}${market.data?.image3}`,
                                                    altText: '',
                                                    caption: '',
                                                    header: '',
                                                    key: '1'
                                                }]} />
                                        </Col>
                                    </Row>
                                </Container>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}
