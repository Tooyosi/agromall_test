import {googleApiInstance} from "./apiAdapter"

export const getGeocode = (address)=> googleApiInstance.get(`geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
