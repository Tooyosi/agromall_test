'use strict';
const passport = require('passport');
const Strategy = require('passport-local');
const {user} = require('../models')
const {bin2hashData} = require('./index')

passport.use(new Strategy({
    // set the fields to be used for validation
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
        let userDetails = await user.findOne({
            attributes: {exclude: ['password']},
            where: {
                email: username,
                password: bin2hashData(password, process.env.PASSWORD_HASH)
            },
        })
        if (userDetails !== null && userDetails !== undefined) {
            let {dataValues} = userDetails
            done(null, dataValues)
        }else {
            done(null, false, "Invalid Credentials");
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const users = user.id === id ? user : false
    done(null, users)
})

module.exports = passport;