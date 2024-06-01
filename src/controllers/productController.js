const httpStatus = require("http-status");
const Product = require("../models/productModel");

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll();
    return res.status(httpStatus.OK).json(products);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: "Category",
    });

    return res.send(product);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    // Exemplo de vulnerabilidade
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  const productId = req.params.id;
  const newName = req.body.name;

  try {
    const updatedProduct = await Product.update(
      { name: newName },
      { where: { id: productId } }
    );

    if (updatedProduct[0] === 1) {
      res.status(200).send("Product updated successfully.");
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    res.status(500).send("Error updating product: " + error.message);
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const deletedCount = await Product.destroy({
      where: { id: productId },
    });

    if (deletedCount === 1) {
      res.status(200).send("Product deleted successfully.");
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    res.status(500).send("Error deleting product: " + error.message);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
