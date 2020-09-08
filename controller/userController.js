const  users = require("../model/user")
var ObjectID = require('mongodb').ObjectID; 
//function for adding user
exports.addUser = (req, res) => {
    const User = new users(
        req.body)
    User.save().then(function () {
        res.status(200).send("success")
    }).catch(function (e) {
        res.status(400).send(e)
    })
}

//function for getting user
exports.findUser = async (req, res) => {
    users.find().then(function (findAllUser) {
        res.send(findAllUser).catch(function (e) {
            res.status(400).send()
        })
    })
}

//function for getting user by id
exports.findUserById = (req, res) => {
    users.findById(req.params._id)
        .then(function (userById) {
            res.send(userById,req.token).catch(function (e) {
                res.status(400).send()
            })
        })
}

//fuction for delete user by id 
exports.deleteUserById = (req, res) => {
    users.findByIdAndDelete(req.params._id).then(function () {
        res.status(200).send().catch(function (e) {
            res.status(400).send()
        })
    })
}

//function for update user 
exports.updateUser = (req, res) => {
    console.log(req.body);
    console.log(req.params._id)
    users.findOneAndUpdate({_id:ObjectID(req.params._id)}, req.body).then(function () {
        res.status(200).send().catch(function (e) {
            res.status(400).send()
        })
    })
}



//function for Login Function
exports.login = async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await users.checkCrediantialsDb(req.body.email,
            req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch (e) {
        res.status(400).send(e)
    }
}

//function for Login Function
exports.adminlogin = async (req, res) => {
    try {
        const user = await users.checkCrediantialsDb(req.body.email,
            req.body.password)
            if(user.isAdmin){
        const token = await user.generateAuthToken()
        res.send({user,token})
            }
        res.status(400)
    }
    catch (e) {
        res.status(400).send(e)
    }
}


//upload profile image
exports.uploadimage = (req, res) => {
    req.files.map(function (items) {
        const User = {
            image: items.filename
        }
        users.findOneAndUpdate({_id:ObjectID(req.params._id)}, User).then(function () {
            res.status(200).send().catch(function (e) {
                res.status(400).send()
            })
        })
    })
}

//function for Login Function
exports.checklogin = async (req, res) => {
    const token = req.token
    const user = req.user
    res.send({user,token})
}

exports.checkadminlogin = async (req, res) => {
    const token = req.token
    const user = req.user
    if(user.isAdmin){
    res.send({user,token})
    }
    else{
        res.status(400)
    }
}
//function for email validation
exports.checkemail = (req, res) => {
    users.findOne({email:req.params.email}).then(function (findAllUser) {
        res.send(findAllUser).catch(function (e) {
            res.send(e)
        })
    })
}

//fuction for logout 
exports.logout=(req, res)=>{
    users.findById(req.user._id, function(err, userdata){
        console.log(req.token)
      var  deletetoken = {token : req.token}
      var  delete1 = userdata.tokens.splice(userdata.tokens.indexOf(deletetoken), 1);
        userdata.tokens= userdata.tokens.pull(delete1[0]._id)
        userdata.save((err, data) => {
            if(err) return res.send({
                success : false,
                message : err.message
            })
        })
        return res.send({
            success : true,
            message : "Logged Out",

        })
    })
}

//search user
exports.search = (req, res) => {
    var get_title = req.query.profession;  
    var term = new RegExp(get_title, 'i');
    users.find().populate({
        path:'profession',
        match:{service_name: {$regex:term}}
    })
    .then(function(result){
        result = result.filter(function(b){ return b.profession; });
        res.send(result)
    }).catch(function(e){
        res.send(e)
    })
}

exports.review =(req,res) =>{

    users.findById(req.body.reviewOf, function(err, userdata){
        console.log(req.token)
      var  rating = req.body
      var  delete1 = userdata.rating.concat(rating);
        userdata.rating=delete1
        userdata.save((err, data) => {
            if(err) return res.send({
                success : false,
                message : err.message
            })
        })
        return res.send({
            success : true,
            message : "Logged Out",

        })
    })
}           

exports.checkReview =(req,res)=>{
    console.log(req.params.id)
users.aggregate([
    { "$match": {
        "rating.appointment": ObjectID(req.params.id)
    }}]).then(function (findAllUser) {
        if(findAllUser.length==0){
            res.send(false)
        }
        else{
            res.send(true)
        }
       
        console.log(findAllUser)
    })
}

exports.getUserReview = (req,res)=>{
    users.findById(req.params._id)
    .populate('rating.reviewBy')
    .then(function (userById) {
        res.send(userById.rating).catch(function (e) {
            res.status(400).send()
        })
    })
}