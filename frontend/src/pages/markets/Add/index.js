import React, { useState, useEffect } from 'react'
import { getCoordinates, onChange } from '../../../utilities'
import FormAdd from './FormAdd'
import { Row, Col } from 'reactstrap'
import { getGeocode, getReverseCode } from '../../../services/geocodeService'
import { addMarket, getCategories, editMarket } from '../../../services/marketService'
import { showError, showLoading, showSuccess } from '../../../utilities/utility_alert'

export default function AddMarket(props) {
    let {isEdit, selectedMarket, categories} = props
    const [state, setstate] = useState({
        formMarket: {
            marketName: isEdit? selectedMarket.name:  "",
            description: isEdit? selectedMarket.description: "",
            categoryId: isEdit? selectedMarket.category.id: "",
            address: isEdit? selectedMarket.address: "",
            houseNo: "",
            street: "",
            state: "",
            files: []
        }
    })


    const handleChange = (e) => {
        onChange(e, state, setstate)
    }


    useEffect(() => {
        if(isEdit){
            getAddress()
        }
    }, [])

    const getAddress = async ()=>{
        try {
            let addData = getCoordinates(selectedMarket.address)
            let {data} = await getReverseCode(`${addData.lat},${addData.lng}`)
            // console.log({data})
        } catch (error) {
            
        }
    }

    const handleSubmit = async () => {
        try {
            showLoading()
            let { formMarket } = state
            let { data } = await getGeocode(`${formMarket.houseNo}+${formMarket.state}+${formMarket.state}`)

            
            let newMarket = new FormData()
            if ((!data.error_message && data.results.length > 0) || isEdit) {
                let newAdd = {
                    formatted_address: data.results[0]?.formatted_address,
                    ...data.results[0]?.geometry?.location
                }
                newMarket.append("name", formMarket.marketName)
                newMarket.append("description", formMarket.description)
                newMarket.append("categoryId", formMarket.categoryId)
                newMarket.append("address",data.results[0]?  JSON.stringify(newAdd): formMarket.address)
                for (let i = 0; i < formMarket.files.length; i++) {
                    const element = formMarket.files[i];
                    newMarket.append("images", element)


                }
                // newMarket.append("image", formMarket.files)

                let addnewMarket = isEdit? await editMarket(newMarket, selectedMarket.id) :
                 await addMarket(newMarket)
                showSuccess(addnewMarket.data.description)
                if (props.reload) {
                    props.reload()
                    // props.onClose()
                }
            } else {
                showError(data.error_message || "An error occured while fetching address")
            }
        } catch (error) {
            // console.log(error)
            showError(error?.response?.data?.description || "An error occured")
        }

    }
    return (
        <FormAdd
            formControl={state.formMarket}
            formName="formMarket"
            isEdit={isEdit}
            categories={categories}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    )
}
