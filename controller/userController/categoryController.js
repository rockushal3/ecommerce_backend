const Category = require("../../models/category")
const SubCategory = require("../../models/subCategory")
const Product = require("../../models/product")

exports.index = function (req, res) {
    Category.find()
    .then(category => {
        var cat = [];

        category.map(function (item){
            SubCategory.find({category: item._id}).then(response => {
                item._doc.SubCategory = response;
                cat.push(item)

                if(cat.length == category.length){
                    res.send({
                        status: 200,
                        message: "Category retrieved successfully",
                        data: cat
                    })
                }

            })
        })
    }).catch(err => {
        res.json({
            status: "500",
            message: err.message,
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

exports.subCategory = function (req, res) {
    SubCategory.find({category: req.params.category_id}).populate('category')
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

exports.categoryProduct = function (req, res) {
    Product.find({category: req.params.category_id}).populate('category').populate('subcategory')
    .then(product => {
        res.send({
            status: 200,
            message: "Product retrieved successfully",
            data: product
        })
    }).catch(err => {
        res.json({
            status: "500",
            message: err.message,
        });
    })
};