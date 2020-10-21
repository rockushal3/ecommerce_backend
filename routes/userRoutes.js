// Initialize express router
const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/userAuth');
const uploadImage = require('../middleware/uploadImage');

router.use(bodyParser.urlencoded({ extended: false }));

//Import Controllers
var authController = require('../controller/userController/authController');
var categoryController = require('../controller/userController/categoryController');
var productController = require('../controller/userController/productController');

//----------------------API Route---------------------//
router.route('/login')
    .post(authController.login)

router.route('/signup')
    .post(authController.signup)

router.route('/logout')    
    .get(auth, authController.logout)

//----------------------Category Routes-------------------//
router.route('/category')
    .get(categoryController.index)

router.route('/category/:category_id')
    .get(categoryController.view)

router.route('/category/:category_id/subcategory')
    .get(categoryController.subCategory)

router.route('/category/:category_id/product')
    .get(categoryController.categoryProduct)

router.route('/product/:product_id')
    .get(productController.view)

// Export API routes
module.exports = router;