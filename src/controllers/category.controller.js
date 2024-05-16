const { Category } = require("../models"); // Adjust the path according to your project structure

class CategoryController {
  // CREATE a new category
  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // READ all categories
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ a single category by id
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE a category
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const [updated] = await Category.update({ name }, { where: { id } });
      if (updated) {
        const updatedCategory = await Category.findByPk(id);
        return res.status(200).json(updatedCategory);
      }
      throw new Error("Category not found");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE a category
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Category.destroy({ where: { id } });
      if (deleted) {
        return res.status(204).send("Category deleted");
      }
      throw new Error("Category not found");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CategoryController;
