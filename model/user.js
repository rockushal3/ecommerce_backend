const mongoose = require('mongoose') //Databa base connection
const jwt = require('jsonwebtoken') //Auth Token handle
var Schema = mongoose.Schema;
//attributes of database
const user = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        require: true,
        trim: true
    },
    dob: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    image:{
        type:String,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    tokens: [{
        token: {
            type: String,
        }
    }],
   

});

// login crediantial check function
user.statics.checkCrediantialsDb = async (email, password) => {
    const userCheck = await users.findOne({ email: email, password: password })
    return userCheck
}

// login token generate function
user.methods.generateAuthToken = async function () {
    const userAuth = this
    const token = jwt.sign({ _id: userAuth._id.toString() }, 'thisismynewcourse')
    userAuth.tokens = userAuth.tokens.concat({ token: token })
    await userAuth.save()
    return token
}

// database model 
const users = mongoose.model('user', user)
module.exports = users