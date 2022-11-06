const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoute = require('./routes/auth.route')
const profileRoute = require('./routes/profile.route')
const blogRoute = require('./routes/blog.route');

require('dotenv').config()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false, limit: '50mb' }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

// home route
app.get('/', (req, res) => {
    res.send({
        'message': `Welcome to Tobi's Blog Api`
    });
});

// routes
app.use('/auth', authRoute)
app.use('/profile', profileRoute)
app.use('/blogs', blogRoute)

// 404 route
app.use("*", (req, res) => {
    return res.status(404).json({
      message: "route not found",
    });
});
  
module.exports = app;