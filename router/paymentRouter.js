const paymentController = require("../controllers/paymentController")
const express = require("express");
const router = express.Router()
const { auth } = require("../middleware/auth")

router.post("/api/payment/inititate", auth, paymentController.initiatePayment)
router.post("/api/payment/verify", auth, paymentController.verifyPayment)

module.exports = router;