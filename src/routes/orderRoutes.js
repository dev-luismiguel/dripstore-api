const express = require("express");
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authentication");

const router = express.Router();

router.post("/", authenticateToken, orderController.createOrder);

module.exports = router;
