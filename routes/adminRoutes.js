// Initialize express router
const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/adminAuth');
const uploadImages = require('../middleware/uploadImages');

router.use(bodyParser.urlencoded({ extended: false }));

//Import Controllers
var authController = require('../controller/adminController/authController');
var categoryController = require('../controller/adminController/categoryController');
var subCategoryController = require('../controller/adminController/subCategoryController');
var productController = require('../controller/adminController/productController');
var adminController = require('../controller/adminController/adminController');

//----------------------API Route---------------------//
router.route('/login')
    .post(authController.login)

router.route('/logout')    
    .get(auth, authController.logout)

router.route('/addAdmin')    
    .get(authController.addAdmin)

//----------------------Category Routes-------------------//
router.route('/category')
    .get(auth, categoryController.index)
    .post(auth, categoryController.new);

router.route('/category/:category_id')
    .get(auth, categoryController.view)
    .patch(auth, categoryController.update)
    .put(auth, categoryController.update)
    .delete(auth, categoryController.delete);

router.route('/category/:category_id/subcategory')
    .get(auth, categoryController.subCategory)

//----------------------Sub Category Routes-------------------//
router.route('/subcategory')
    .get(auth, subCategoryController.index)
    .post(auth, subCategoryController.new);

router.route('/subcategory/:subCategory_id')
    .get(auth, subCategoryController.view)
    .patch(auth, subCategoryController.update)
    .put(auth, subCategoryController.update)
    .delete(auth, subCategoryController.delete);

//----------------------Product Routes-------------------//
router.route('/product')
    .get(auth, productController.index)
    .post([auth, uploadImages], productController.new);

router.route('/product/:product_id')
    .get(auth, productController.view)
    .patch([auth, uploadImages], productController.update)
    .put([auth, uploadImages], productController.update)
    .delete(auth, productController.delete);

//----------------------Admin Routes-------------------//
router.route('/admin')
    .get(auth, adminController.index)
    .post(auth, adminController.new);

router.route('/admin/:admin_id')
    .get(auth, adminController.view)
    .patch(auth, adminController.update)
    .put(auth, adminController.update)
    .delete(auth, adminController.delete);

// Export API routes
module.exports = router;