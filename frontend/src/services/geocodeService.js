import {googleApiInstance} from "./apiAdapter"

export const getGeocode = (address)=> googleApiInstance.get(`geocode/json?address=${address}&key=AIzaSyDWi9n_0Gv6jhMwYmfFGs87Wk83QzJWpms`)
