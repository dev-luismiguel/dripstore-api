const express = require("express");
const productController = require("../controllers/productController");
const authenticateToken = require("../middlewares/authentication");

const router = express.Router();

// Rota para obter todos os itens
router.get("/", authenticateToken, productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
