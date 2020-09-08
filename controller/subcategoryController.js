const  category = require("../model/subcategory")

exports.createCategory = (req, res) => {
    console.log(req.body)
    const Category = new category(
        req.body)
        Category.save().then(function () {
        res.status(200).send("success")
    }).catch(function (e) {
        res.status(400).send(e)
    })
}

//function for getting category
exports.findCategory = async (req, res) => {
    category.find().populate("category_id").then(function (getCategory) {
        res.send(getCategory).catch(function (e) {
            res.status(400).send()
        })
    })
}

//function for getting category
exports.findCategoryById = async (req, res) => {
    category.findById(req.params._id).then(function (getCategory) {
        res.send(getCategory).catch(function (e) {
            res.status(400).send()
        })
    })
}


//fuction for delete category by id 
exports.deleteCategory = (req, res) => {
    category.findByIdAndDelete(req.params._id).then(function () {
        res.status(200).send().catch(function (e) {
            res.status(400).send()
        })
    })
}

//function for update user 
exports.updateCategory = (req, res) => {
    category.findByIdAndUpdate(req.params._id, req.body).then(function () {
        res.status(200).send().catch(function (e) {
            res.status(400).send()
        })
    })
}
