const mongoose = require('mongoose') //Databa base connection
const jwt = require('jsonwebtoken') //Auth Token handle
const validator = require('validator')
const bcrypt = require('bcryptjs')
//attributes of database
const userSchema = new mongoose.Schema({
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
    account: String,
    isVerify:{
        type:Boolean,
        default:false
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

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a student by email and password.
    const user = await User.findOne({email: email, account: 'account'} )
    if (!user) {
        console.log('user not found')
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

userSchema.statics.emailCheck = async(email) => {
    const user = await User.findOne({email} )
    if (!user) {
        return false
    }else{
        return true
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;