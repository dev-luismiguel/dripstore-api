const httpStatus = require('http-status');
const Product = require('../models/productModel'); // Adjust the path according to your project structure

const mockProducts = [
    {
        id: 1,
        name: 'Tenis'
    },
    {
        id: 2,
        name: 'Raquete'
    }
]

async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }

function getProductById(req, res) {
    const product = mockProducts.find((product) => product.id == req.params.id);
    res.send(product);
}

async function createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

function updateProduct(req, res) {
    const productIndex = mockProducts.findIndex((product) => product.id == req.params.id);

    if (productIndex === -1) {
        res.status(httpStatus.NOT_FOUND).send("Produto não encontrado");
        return;
    }

    const updatedProduct = mockProducts[productIndex];
    updatedProduct.name = req.body.name;
    mockProducts.splice(productIndex, 1, updatedProduct);

    res.send(updatedProduct)
}

function deleteProduct(req, res) {
    const productIndex = mockProducts.findIndex((product) => product.id == req.params.id);

    if (productIndex === -1) {
        res.status(httpStatus.NOT_FOUND).send("Produto não encontrado");
        return;
    }

    mockProducts.splice(productIndex, 1);
    
    res.send("Produto deletado");
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}