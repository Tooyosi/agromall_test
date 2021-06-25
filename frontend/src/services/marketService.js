import axios from "./apiAdapter"

export const getCategories = ()=> axios.get(`food/category`)

export const addMarket = (data)=> axios.post(`food/market`, data)

export const getMarkets = ()=> axios.get(`food/market`)

export const getSingleMarket = (id)=> axios.get(`food/market/${id}`)

export const deleteSingleMarket = (id)=> axios.delete(`food/market/${id}`)



