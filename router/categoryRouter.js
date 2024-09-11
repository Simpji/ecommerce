const express = require('express')
const router = express.Router();
const categoryController = require("../controllers/categoryController")
const { auth, admin } = require('../middleware/auth')


//Category router
router.post("/api/category", admin, categoryController.createCategory)
router.get("/api/category", [auth, admin], categoryController.getAllCategory)

module.exports = router