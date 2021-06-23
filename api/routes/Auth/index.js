const express = require('express');
const router = express.Router({ mergeParams: true });
const AuthController = require('../../controllers/Auth/index')



router.post('/login', AuthController.postLogin)


router.post('/signup',  AuthController.postSignup)

module.exports = router