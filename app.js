// Import dependencies
const express = require('express');
require("dotenv/config");
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080

require('./database/db')

// Initialize the app
const app = express();

app.use(cors());
app.use('/public', express.static(__dirname+"/public"))

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Import routes
let apiRoutes = require("./routes/userRoutes")
let adminApiRoutes = require("./routes/adminRoutes")

// Use Api routes in the App
app.use('/api', apiRoutes)
app.use('/api/admin', adminApiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running App on port " + port);
});