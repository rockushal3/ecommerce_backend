// Initialize express router
const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/userAuth');
const uploadImage = require('../middleware/uploadImage');

router.use(bodyParser.urlencoded({ extended: false }));

//Import Controllers
var authController = require('../controller/userController/authController');

//----------------------API Route---------------------//
router.route('/login')
    .post(authController.login)

router.route('/signup')
    .post(authController.signup)

router.route('/logout')    
    .get(auth, authController.logout)

// Export API routes
module.exports = router;