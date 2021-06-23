const crypto = require('crypto')
const moment = require('moment-timezone')
const Response = require('./ResponseClass')

let isEmpty = (param, name) => {
    if (typeof (param) == "string" && param.trim() == "") {
        return false
    }
    else if (typeof (param) == "number" && name.includes("phone") && param.toString().length !== 11) {
        return false
    } else {
        return true
    }
}

module.exports = {

    isParamEmpty: (obj, param) => {
        return isEmpty(obj[param])
    },
    bin2hashData: (data, key) => {
        let genHash = crypto.createHmac('sha512', key).update(data, "ascii").digest('hex')
        return genHash
    },
    failureCode: "99",
    successCode: "00",
    failedStatus: "Failed",
    successStatus: "Success",

    addToObject: (field, value, object) => {
        if (field !== "phone") {
            if (value && value.trim() !== "") {
                object[field] = value
            }
        }else {
            if (value && value.length == 11) {
                object[field] = value
            }
        }
    },
    isValueEmpty: (name, value, res)=>{
        let response
        if (!value || value.trim() == "") {
            response = new Response(this.failedStatus, `Validation error,${name} is required`, this.failureCode, {})
            return res.status(400)
                .send(response)
        }
    },

    isArrayValueEmpty: (name, value, res)=>{
        let response
        if (!value || !Array.isArray(value) || value.length < 1) {
            response = new Response(this.failedStatus, `Validation error,${name} is required and must not be empty`, this.failureCode, {})
            return res.status(400)
                .send(response)
        }
    }
}