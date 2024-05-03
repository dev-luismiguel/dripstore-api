const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// Rota para obter todos os itens
router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);

module.exports = router;
