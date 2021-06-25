import React, { useState, useEffect } from 'react'
import { onChange } from '../../../utilities'
import FormAdd from './FormAdd'
import { Row, Col } from 'reactstrap'
import { getGeocode } from '../../../services/geocodeService'
import { addMarket, getCategories } from '../../../services/marketService'
import { showError, showLoading, showSuccess } from '../../../utilities/utility_alert'

export default function AddMarket() {
    const [state, setstate] = useState({
        formMarket: {
            marketName: "",
            description: "",
            categoryId: "",
            houseNo: "",
            street: "",
            state: "",
            files: []
        }
    })

    const [categories, setCategories]=useState([])

    const handleChange = (e) => {
        onChange(e, state, setstate)
    }

    const fetchCategories = async()=>{
        try {
            let {data} = await getCategories()
            setCategories(data.data)
        } catch (error) {
            
        }
    }


    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async () => {
        try {
            showLoading()
            let { formMarket } = state
            let { data } = await getGeocode(`${formMarket.houseNo}+${formMarket.state}+${formMarket.state}`)
            // console.log({ data, formMarket })
            let newMarket = new FormData()
            if(!data.error_message && data.results.length > 0){
                newMarket.append("name", formMarket.marketName)
                newMarket.append("description", formMarket.description)
                newMarket.append("categoryId", formMarket.categoryId)
                newMarket.append("address", JSON.stringify(data.results))
                for (let i = 0; i < formMarket.files.length; i++) {
                    const element = formMarket.files[i];
                newMarket.append("images", element)

                    
                }
                // newMarket.append("image", formMarket.files)

                let addnewMarket = await addMarket(newMarket)
                    showSuccess(addnewMarket.data.description)
            }else{
                showError(data.error_message || "An error occured while fetching address")
            }
        } catch (error) {
            console.log(error)
            showError(error?.response?.data?.description || "An error occured")
        }

    }
    return (
        <div className="container">
            <Row className="vh-100">
                <Col className="m-auto" md="6">
                    <FormAdd
                        formControl={state.formMarket}
                        formName="formMarket"
                        categories={categories}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </Col>
            </Row>
        </div>
    )
}
