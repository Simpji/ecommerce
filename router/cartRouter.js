const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");


router.post("/api/add-to-cart", auth, cartController.addToCart)
router.get("/api/cart", auth, cartController.getCartItem)
router.put("/api/update-cart", auth, cartController.updateCart)
router.delete("/api/delete-cart", auth, cartController.updateCart)

module.exports = router;