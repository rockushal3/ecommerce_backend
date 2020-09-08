const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
router.post("/category", categoryController.createCategory)
router.get("/category", categoryController.findCategory)
router.get("/category/:_id", categoryController.findCategoryById)
router.put("/category/:_id", categoryController.updateCategory)
router.delete("/category/:_id", categoryController.deleteCategory)
module.exports = router