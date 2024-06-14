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
    const {
      urlImg,
      name,
      gender,
      brand,
      listUrlImg,
      department,
      price,
      assessment,
      discountValue,
      listOfSize,
      trending,
      description,
    } = req.body;

    const productData = {
      urlImg,
      name,
      gender,
      brand,
      department,
      price,
      assessment,
      discountValue,
      trending,
      description,
    };

    if (Array.isArray(listUrlImg)) {
      productData.listUrlImg = listUrlImg;
    } else if (typeof listUrlImg === "string") {
      productData.listUrlImg = listUrlImg.split(",").map((item) => item.trim());
    }

    if (Array.isArray(listOfSize)) {
      productData.listOfSize = listOfSize;
    } else if (typeof listOfSize === "string") {
      productData.listOfSize = listOfSize
        .split(",")
        .map((item) => parseInt(item.trim(), 10));
    }

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  const productId = req.params.id;
  const {
    urlImg,
    name,
    gender,
    brand,
    listUrlImg,
    department,
    price,
    assessment,
    discountValue,
    listOfSize,
    trending,
    description,
  } = req.body;

  try {
    const updatedFields = {
      urlImg,
      name,
      gender,
      brand,
      department,
      price,
      assessment,
      discountValue,
      trending,
      description,
    };

    if (Array.isArray(listUrlImg)) {
      updatedFields.listUrlImg = listUrlImg;
    } else if (typeof listUrlImg === "string") {
      updatedFields.listUrlImg = listUrlImg
        .split(",")
        .map((item) => item.trim());
    }

    if (Array.isArray(listOfSize)) {
      updatedFields.listOfSize = listOfSize;
    } else if (typeof listOfSize === "string") {
      updatedFields.listOfSize = listOfSize
        .split(",")
        .map((item) => parseInt(item.trim(), 10));
    }

    const updatedProduct = await Product.update(updatedFields, {
      where: { id: productId },
    });

    if (updatedProduct[0] === 1) {
      res.status(200).send("Product updated successfully.");
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    console.error(error);
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
