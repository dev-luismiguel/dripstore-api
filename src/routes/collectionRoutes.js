const express = require("express");
const collectionController = require("../controllers/collectionController");

const router = express.Router();

// Rota para obter todos os itens
router.get("/", collectionController.getAllCollection);
router.post("/", collectionController.createCollection);

module.exports = router;
