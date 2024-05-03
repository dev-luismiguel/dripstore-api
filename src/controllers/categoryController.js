const httpStatus = require("http-status");
const Category = require("../models/categoryModel");

async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    return res.status(httpStatus.OK).json(categories);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
};
