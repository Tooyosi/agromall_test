import axios from "./apiAdapter"

export const getCategories = ()=> axios.get(`food/category`)

export const addMarket = (data)=> axios.post(`food/market`, data)

export const editMarket = (data, id)=> axios.patch(`food/market/${id}`, data)


export const getMarkets = (name, category)=> axios.get(`food/market?name=${name}&categoryId=${category}`)

export const getSingleMarket = (id)=> axios.get(`food/market/${id}`)

export const deleteSingleMarket = (id)=> axios.delete(`food/market/${id}`)



