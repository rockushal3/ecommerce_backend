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

exports.new = async function (req, res) {
    const images = [];
    if(Object.entries(req.files).length === 0){
        return res.send({
            status: 500,
            message: 'Image not found'
        })
    }
    if(req.files.image1){
        images.push(req.files.image1[0].filename)
    }
    if(req.files.image2){
        images.push(req.files.image2[0].filename)
    }
    if(req.files.image3){
        images.push(req.files.image3[0].filename)
    }
    var product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.specification = req.body.specification;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.subcategory = req.body.subcategory;
    product.description = req.body.description;
    product.images = images;
    product.save()
    .then(dt => {

        Product.findOne({_id: dt._id}).populate('category').populate('subcategory').then(dt => {    
            res.send({
                status: 200,
                message: 'Product added successfully',
                data: dt
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

exports.update = function (req, res) {
    Product.findOne({_id: req.params.product_id}).then(dt => {   
        const images = dt.images;
        if(Object.entries(req.files).length === 0){
            return res.send({
                status: 500,
                message: 'Image not found'
            })
        }
        if(req.files.image1){
            images[0] = req.files.image1[0].filename
        }
        if(req.files.image2){
            images[1] = req.files.image2[0].filename
        }
        if(req.files.image3){
            images[2] = req.files.image3[0].filename
        }
        Product.findByIdAndUpdate(req.params.product_id, {
            name: req.body.name,
            price: req.body.price,
            specification: req.body.specification,
            slug: req.body.slug,
            category: req.body.category,
            subcategory: req.body.subcategory,
            description: req.body.description,
            images: images
        }).then(product => {
            if(!product){
                return res.send({
                    status: 404,
                    message: 'Product not found.'
                })
            }
    
            Product.find().populate('category').populate('subcategory')
            .then(dt => {  
                res.send({
                    status: 200,
                    message: 'Product updated successfully.',
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
                    message: 'Product not found.'
                })
            }
            return res.send({
                status: 500,
                message: err.message
            })
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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

exports.delete = function (req, res) {
    Product.findByIdAndDelete(req.params.product_id)
    .then(product => {
        if(!product){
            return res.send({
                status: 404,
                message: 'Product not found.'
            })
        }
        res.send({
            status: 200,
            message: 'Product deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not found') {
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