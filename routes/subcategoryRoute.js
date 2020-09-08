const express = require("express");
const router = express.Router();
const categoryController = require("../controller/subcategoryController");
router.post("/subcategory",categoryController.createCategory)
router.get("/subcategory", categoryController.findCategory)
router.get("/subcategory/:_id", categoryController.findCategoryById)
router.put("/subcategory/:_id", categoryController.updateCategory)
router.delete("/subcategory/:_id", categoryController.deleteCategory)
module.exports = router