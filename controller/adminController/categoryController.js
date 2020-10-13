const Category = require("../../models/category")

exports.index = function (req, res) {
    Category.find()
    .then(category => {
        res.send({
            status: 200,
            message: "Category retrieved successfully",
            data: category
        })
    }).catch(err => {
        res.json({
            status: "500",
            message: err.message,
        });
    })
};

exports.new = async function (req, res) {
    var category = new Category();
    category.name = req.body.name;
    category.save()
    .then(dt => {
        res.send({
            status: 200,
            message: 'Category added successfully',
            data: dt
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err.message || "Some error occurred while creating the assignment"
        });
    })
};

exports.view = function (req, res) {
    Category.findById(req.params.category_id)
    .then(category => {
        if(!category){
            return res.send({
                status: 404,
                message: "Category not found"
            })
        }
        
        res.send({
            status: 200,
            message: 'Category retrieved successfully.',
            data: category
        })
    }).catch(err => {
        if(err.kind === 'objectId') {
            return res.send({
                status: 404,
                message: 'Category not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.update = function (req, res) {
    Category.findByIdAndUpdate(req.params.category_id, {
        name: req.body.name,
    }).then(category => {
        if(!category){
            return res.send({
                status: 404,
                message: 'Category not found.'
            })
        }

        Category.findOne({_id: category._id}).then(dt => {  
            res.send({
                status: 200,
                message: 'Category updated successfully.',
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
                message: 'Category not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};

exports.delete = function (req, res) {
    Category.findByIdAndDelete(req.params.category_id)
    .then(category => {
        if(!category){
            return res.send({
                status: 404,
                message: 'Category not found.'
            })
        }
        res.send({
            status: 200,
            message: 'Category deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not found') {
            return res.send({
                status: 404,
                message: 'Category not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};