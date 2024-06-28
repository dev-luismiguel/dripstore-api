const httpStatus = require("http-status");
const models = require("../models");
const Collection = models.Collection

async function getAllCollection(req, res) {
  try {
    const collections = await Collection.findAll();
    return res.status(httpStatus.OK).json(collections);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function createCollection(req, res) {
  try {
    const collection = await Collection.create(req.body);
    return res.status(httpStatus.CREATED).json(collection);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

module.exports = {
  getAllCollection,
  createCollection,
};
