const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// Rota para obter todos os itens
router.get("/", categoryController.getAllProducts);
router.get("/:id", categoryController.getProductById);
router.post("/", categoryController.createProduct);
router.put("/:id", categoryController.updateProduct);
router.delete("/:id", categoryController.deleteProduct);

module.exports = router;
