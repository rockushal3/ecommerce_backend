const mongoose = require('mongoose') //Database connection
const jwt = require('jsonwebtoken') //Auth Token handle
const validator = require('validator')
const bcrypt = require('bcryptjs')
//attributes of database
const adminSchema = new mongoose.Schema({
    full_name: {
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
        trim: true,
        validate: value => {
            if(!validator.isEmail(value)){
                throw new Error({error: 'Invalid Email Address'})
            }
        }
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
    tokens: [{
        token: {
            type: String,
        }
    }],
},
{
  timestamps: true
});

adminSchema.pre('save', async function (next) {
    // Hash the password before saving the admin model
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

adminSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the admin
    const admin = this
    const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY)
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
    // Search for a student by email and password.
    const admin = await Admin.findOne({email: email} )
    if (!admin) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return admin
}

adminSchema.statics.emailCheck = async(email) => {
    const admin = await Admin.findOne({email} )
    if (!admin) {
        return false
    }else{
        return true
    }
}

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;