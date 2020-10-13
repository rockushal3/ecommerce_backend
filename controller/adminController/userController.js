const User = require("../../models/user")

exports.index = function (req, res) {
    User.find()
    .then(user => {
        res.send({
            status: 200,
            message: "User retrieved successfully",
            data: user
        })
    }).catch(err => {
        res.json({
            status: "500",
            message: err.message,
        });
    })
};

exports.new = async function (req, res) {
    try{
        const emailCheck = await User.emailCheck(req.body.email);
        if(emailCheck){
            return res.json({
                status : 400,
                message: "Email already exists"
            })
        }
        var user = new User();
        user.full_name = req.body.full_name;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.password = req.body.password;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.dob = req.body.dob;
        user.account = req.body.account;

        await user.save();
        const token = await user.generateAuthToken();
        res.json({
            message: "User Registered Successfully",
            status: 200,
            data: user,
            token: token,
        })
    } catch (error){
        res.status(400).send({
            status: 400,
            message: error.message
        })
    }
};

exports.view = function (req, res) {
    User.findById(req.params.user_id)
    .then(user => {
        if(!user){
            return res.send({
                status: 404,
                message: "User not found"
            })
        }
        
        res.send({
            status: 200,
            message: 'User retrieved successfully.',
            data: user
        })
    }).catch(err => {
        if(err.kind === 'objectId') {
            return res.send({
                status: 404,
                message: 'User not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.user_id, {
        full_name: req.body.full_name,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        dob: req.body.dob,
    }).then(user => {
        if(!user){
            return res.send({
                status: 404,
                message: 'User not found.'
            })
        }

        User.findOne({_id: user._id}).then(dt => {  
            res.send({
                status: 200,
                message: 'User updated successfully.',
                data: dt
            })
        }).catch(err => {
            return res.send({
                status: 500,
                message: err.message
            })
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.send({
                status: 404,
                message: 'User not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.delete = function (req, res) {
    User.findByIdAndDelete(req.params.user_id)
    .then(user => {
        if(!user){
            return res.send({
                status: 404,
                message: 'User not found.'
            })
        }
        res.send({
            status: 200,
            message: 'User deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not found') {
            return res.send({
                status: 404,
                message: 'User not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};