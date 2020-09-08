const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const auth = require('../middleware/auth')

router.post("/login", userController.login)
router.post("/adminlogin", userController.adminlogin)
router.get("/checkLogin",auth,userController.checklogin)
router.get("/checkadminLogin",auth,userController.checkadminlogin)
router.post("/user",userController.addUser)
router.get("/user",userController.findUser)
router.get("/user/:_id",userController.findUserById)
router.delete("/user/:_id",userController.deleteUserById)
router.put("/user/:_id",auth,userController.updateUser)
router.put("/updateProfile/:_id",[auth],userController.uploadimage)
router.get("/getuserbyemail/:email",userController.checkemail)
router.delete("/logout",auth,userController.logout)
router.get("/search",userController.search)
router.post("/review",userController.review)
router.get("/checkreview/:id",userController.checkReview)
router.get("/findReviewById/:_id",userController.getUserReview)
module.exports = router