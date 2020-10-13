const SubCategory = require("../../models/subCategory")

exports.index = function (req, res) {
    SubCategory.find().populate('category')
    .then(subCategory => {
        res.send({
            status: 200,
            message: "SubCategory retrieved successfully",
            data: subCategory
        })
    }).catch(err => {
        res.json({
            status: "500",
            message: err.message,
        });
    })
};

exports.new = function (req, res) {
    SubCategory.findOne({name: req.body.name}).then(dt => {
        if(dt){
            return res.send({
                status: 401,
                message: 'SubCategory Already exists'
            });
        }
    })
    var subCategory = new SubCategory();
    subCategory.name = req.body.name;
    subCategory.category = req.body.category;
    subCategory.save()
    .then(dt => {

        SubCategory.findOne({_id: dt._id}).populate('category')
        .then(category => {
            res.send({
                status: 200,
                message: 'SubCategory added successfully',
                data: category
            });
        }).catch(err => {
            res.status(500).send({
                status: 500,
                message: err.message || "Some error occurred while creating the assignment"
            });
        })

    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while creating the assignment"
        });
    })
};

exports.view = function (req, res) {
    SubCategory.findById(req.params.subCategory_id).populate('category')
    .then(subCategory => {
        if(!subCategory){
            return res.send({
                status: 404,
                message: "SubCategory not found"
            })
        }
        
        res.send({
            status: 200,
            message: 'SubCategory retrieved successfully.',
            data: subCategory
        })
    }).catch(err => {
        if(err.kind === 'objectId') {
            return res.send({
                status: 404,
                message: 'SubCategory not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.update = function (req, res) {
    SubCategory.findByIdAndUpdate(req.params.subCategory_id, {
        name: req.body.name,
        category: req.body.category
    }).then(subCategory => {
        if(!subCategory){
            return res.send({
                status: 404,
                message: 'SubCategory not found.'
            })
        }

        SubCategory.findOne({_id: subCategory._id}).populate('category').then(dt => {

            res.send({
                status: 200,
                message: 'SubCategory updated successfully.',
                data: dt
            })

        }).catch(err => {
            return res.send({
                status: 500,
                message: err.message
            })
        })

    }).catch(err => {
        if(err.kind === 'objectId') {
            return res.send({
                status: 404,
                message: 'SubCategory not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.delete = function (req, res) {
    SubCategory.findByIdAndDelete(req.params.subCategory_id)
    .then(subCategory => {
        if(!subCategory){
            return res.send({
                status: 404,
                message: 'SubCategory not found.'
            })
        }
        res.send({
            status: 200,
            message: 'SubCategory deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not found') {
            return res.send({
                status: 404,
                message: 'SubCategory not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};