const { failedStatus, successStatus, successCode, failureCode, isBodyEmpty, bin2hashData, addMinutes, isValueEmpty, isEmailValid } = require('../../helpers')
const Response = require("../../helpers/ResponseClass")
const passport = require("../../helpers/passport")
const jwt = require('jsonwebtoken')
const { logger } = require('../../loggers/logger')
const DbHelpers = require("../../helpers/DbHelpers")
const Models = require("../../models/index")
let dbHelper = new DbHelpers(Models, logger, failedStatus, successStatus, failureCode, successCode)

module.exports = {
    postLogin: function (req, res, next) {
        let response
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                let resp = info ? info : err.toString()
                response = new Response(failedStatus, resp, failureCode, {})
                return res.status(404).send(response)
            } else if (info) {
                let resp = info;

                response = new Response(failedStatus, resp, failureCode, {})
                return res.status(404).send(response)
            }
            req.logIn(user, async function (err) {
                if (err) {
                    let resp = err.toString()
                    response = new Response(failedStatus, resp, failureCode, {})
                    return res.status(404).send(response)
                }
                req.token = jwt.sign({
                    id: req.user.id,
                }, process.env.SESSION_SECRET, {
                    expiresIn: '24 hours'
                });

                response = new Response(successStatus, "Successful", successCode, { ...user, access_token: req.token })
                return res.status(200).send(response);
            });
        })(req, res, next);
    },

    postSignup: ('/', async (req, res) => {
        let response
        let { firstname, lastname, email, password } = req.body
        if (isValueEmpty("Firstname", firstname, res)) return
        if (isValueEmpty("Lastname", lastname, res)) return
        if (isValueEmpty("Email", email, res)) return
        if (isEmailValid(email, res)) return
        if (isValueEmpty("Password", password, res)) return

        try {
            await dbHelper.createUniqueInstance("user", {
                where: {
                    email: email
                }
            }, {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: bin2hashData(password, process.env.PASSWORD_HASH)
            }, res, Response)
        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)

        }


    })
}

