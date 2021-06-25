import axios from "./apiAdapter"

export const getCategories = ()=> axios.get(`food/category`)

export const addMarket = (data)=> axios.post(`food/market`, data)

