Admin = require("../../models/admin")

exports.index = function (req, res) {
    Admin.find()
    .then(admin => {
        res.send({
            status: 200,
            message: "Admin retrieved successfully",
            data: admin
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
        const emailCheck = await Admin.emailCheck(req.body.email);
        if(emailCheck){
            return res.json({
                status : 400,
                message: "Email already exists"
            })
        }
        var admin = new Admin();
        admin.full_name = req.body.full_name;
        admin.address = req.body.address;
        admin.phone = req.body.phone;
        admin.password = req.body.password;
        admin.gender = req.body.gender;
        admin.email = req.body.email;
        admin.dob = req.body.dob;

        await admin.save();
        res.json({
            message: "Admin Registered Successfully",
            status: 200,
            data: admin
        })
    } catch (error){
        res.status(400).send({
            status: 400,
            message: error.message
        })
    }
};

exports.view = function (req, res) {
    Admin.findById(req.params.admin_id)
    .then(admin => {
        if(!admin){
            return res.send({
                status: 404,
                message: "Admin not found"
            })
        }
        
        res.send({
            status: 200,
            message: 'Admin retrieved successfully.',
            data: admin
        })
    }).catch(err => {
        if(err.kind === 'objectId') {
            return res.send({
                status: 404,
                message: 'Admin not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.update = function (req, res) {
    Admin.findByIdAndUpdate(req.params.admin_id, {
        full_name: req.body.full_name,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        dob: req.body.dob,
    }).then(admin => {
        if(!admin){
            return res.send({
                status: 404,
                message: 'Admin not found.'
            })
        }

        Admin.findOne({_id: admin._id}).then(dt => {  
            res.send({
                status: 200,
                message: 'Admin updated successfully.',
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
                message: 'Admin not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.delete = function (req, res) {
    Admin.findByIdAndDelete(req.params.admin_id)
    .then(admin => {
        if(!admin){
            return res.send({
                status: 404,
                message: 'Admin not found.'
            })
        }
        res.send({
            status: 200,
            message: 'Admin deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not found') {
            return res.send({
                status: 404,
                message: 'Admin not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};