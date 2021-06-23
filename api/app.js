const express = require('express');
const app = express();


require("dotenv").config()
const port = process.env.PORT || 4000;
const passport = require('passport')



app.use(express.json({ limit: "50mb", }));
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
    var allowedOrigins = [process.env.FRONTEND_URI];
    var origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }

    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});


// import routes
const authRoutes = require('./routes/Auth')


// use routes
app.use('/auth', authRoutes)


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
