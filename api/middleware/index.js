const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: process.env.SESSION_SECRET, algorithms: ['sha1', 'RS256', 'HS256'], });
const BaseResponse = require('../helpers/ResponseClass')
const { logger } = require('../loggers/logger')
const { failureCode, failedStatus, addMinutes, convertDate, dateTime } = require('../helpers/index')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')


module.exports = {
    protected: async (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            let response = new BaseResponse(failedStatus, err.message? err.message.toString() : 'Invalid Token', failureCode, {})
            res.status(401).send(response);
        } 
    },
    authenticate: authenticate
}