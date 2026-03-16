const express = require("express");
const router = express.Router();
const { checkout, getOrderDetail } = require("../controllers/orderController");

router.post("/", checkout);
router.get("/:orderId", getOrderDetail);

module.exports = router;
