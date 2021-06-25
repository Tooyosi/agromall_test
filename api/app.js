const express = require('express');
const app = express();


require("dotenv").config()
const port = process.env.PORT || 4000;
const passport = require('passport');
const Response = require('./helpers/ResponseClass');



app.use(express.json({ limit: "50mb", }));
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/uploads', express.static('uploads'))

app.use(function (req, res, next) {
    var allowedOrigins = [process.env.FRONTEND_URI];
    var origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin || process.env.FRONTEND_URI)) {
        res.setHeader("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }

    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// general error handling
app.use((err, req, res, next) => {
    // handleError(err, res);
    // console.log(err)
    if(err){
        let response = new Response("Failed", "Error", "99", "An error occured")
        return res.status(500).send(response)
    }
  });
// import routes
const authRoutes = require('./routes/Auth')
const foodRoutes = require('./routes/Food')


// use routes
app.use('/auth', authRoutes)
app.use('/food', foodRoutes)


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
