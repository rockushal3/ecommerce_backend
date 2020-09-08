require("./database/dbsetting")
const cors = require("cors")
const express = require('express')
const bodyparser = require("body-parser")
const path = require("path");
const app = express()
const publicdirectory= path.join(__dirname,'public');
app.use(express.static(publicdirectory));

//Routers
const UserRoute = require("./routes/userRoute")
const CategoryRoute = require("./routes/categoryRoute")
const SubcategoryRoute= require("./routes/subcategoryRoute")

//parse json data in form body client UI
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())
app.use(UserRoute)
app.use(CategoryRoute)
app.use(SubcategoryRoute)
app.listen(3030)