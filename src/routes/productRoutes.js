const express = require('express');
const router = express.Router();

const mockProduct = {
    id: 1,
    name: 'Tenis'
}

// Rota para obter todos os itens
router.get('/', (req, res) => {
    res.send(mockProduct)
});


module.exports = router;
