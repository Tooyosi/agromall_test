import axios from "./apiAdapter"

export const login = (data)=> axios.post(`auth/login`, data)
