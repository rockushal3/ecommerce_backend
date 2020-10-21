const Product = require("../../models/product")

exports.index = function (req, res) {
    Product.find().populate('category').populate('subcategory')
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

exports.view = function (req, res) {
    Product.findById(req.params.product_id).populate('category').populate('subcategory')
    .then(product => {
        if(!product){
            return res.send({
                status: 404,
                message: "Product not found"
            })
        }
        
        res.send({
            status: 200,
            message: 'Product retrieved successfully.',
            data: product
        })
    }).catch(err => {
        if(err.kind === 'objectId') {
            return res.send({
                status: 404,
                message: 'Product not found.'
            })
        }
        return res.send({
            status: 500,
            message: err.message
        })
    })
};