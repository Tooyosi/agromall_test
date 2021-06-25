import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap'
import { getMarkets, deleteSingleMarket } from '../../services/marketService'
import CustomModal from '../../utilities/CustomModal'
import MapContainer from '../../utilities/MapComponent'
import { showError, showLoading, showSuccess } from '../../utilities/utility_alert'
import AddMarket from './Add'
import MarketList from './List'


export default function Markets() {
    const [state, setstate] = useState({
        markets: {
            loading: false,
            data: []
        },
        selectedMarket: {},
        showAdd: false,
        showEdit: false
    })

    const [reload, setReload] = useState(false)
    useEffect(() => {
        setMarkets({ loading: true })
        fetchMarkets()
    }, [reload])

    const toggleAdd = ()=> setstate({...state, showAdd: !state.showAdd})
    const toggleEdit = ()=> setstate({...state, showEdit: !state.showEdit})
    const setMarkets = (data) => {
        setstate({
            ...state,
            markets: {
                ...state.markets,
                ...data
            },
            showAdd: false,
        showEdit: false

        })
    }

    const setSelectedMarket = (market) =>{
        setstate({
            ...state,
            selectedMarket: market,
            showEdit: true
        })
    }
    const fetchMarkets = async () => {
        try {
            let { data } = await getMarkets()
            setMarkets({ loading: false, data: data.data })

        } catch (error) {
            setMarkets({ loading: false })
        }
    }

    const doDelete = async(id)=>{
        try {
            showLoading()
            let {data} = await deleteSingleMarket(id)
            showSuccess(data?.description)
            setReload(!reload)
        } catch (error) {
            showError(error?.response?.data?.description || "An error occured")
        }
    }
    return (
        // <MapContainer />
        <Container>
            <Row className="my-3">
                <Col sm="6">
                    <h4>Market List</h4>
                </Col>
                
                <Col sm="6" className="text-right text-xs-left">
                    <Button onClick={toggleAdd} color="primary">+ Add New</Button>
                </Col>
                </Row>
            <Row>

                <Col sm="12">
                    <Card>
                        <CardBody>
                            {state.markets.loading ? 
                            <div>
                            <Spinner className="m-auto"/>
                            </div> :
                                <MarketList
                                    list={state.markets.data}
                                    onDelete={doDelete}
                                    toggleEdit={setSelectedMarket}
                                />
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <CustomModal 
                isOpen={state.showAdd}
                toggle={toggleAdd}
                header="Add Market"
                backdrop="static"
                keyboard={false}
                >
                   {state.showAdd && <AddMarket reload={()=>setReload(!reload)} onClose={()=>toggleAdd()}/>}

            </CustomModal>

            <CustomModal 
                isOpen={state.showEdit}
                toggle={toggleEdit}
                header="Edit Market"
                backdrop="static"
                keyboard={false}
                >
                   {state.showEdit && <AddMarket reload={()=>setReload(!reload)} isEdit={true} selectedMarket={state.selectedMarket}/>}

            </CustomModal>
        </Container>

    )
}
