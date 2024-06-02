const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const OrderItem = require("../models/orderItemModel");

async function createOrder(req, res) {
  try {
    const { productsList, customer_id } = req.body;

    if (!productsList || !Array.isArray(productsList) || productsList.length === 0) {
      return res.status(400).json({ error: "Products array is required and cannot be empty" });
    }

    if (!customer_id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    const ids = productsList.map((product) => product.id);
    console.log(ids);
    const dbProducts = await Product.findAll({ where: { id: ids } });

    if (dbProducts.length !== productsList.length) {
      return res.status(400).json({ error: "One or more products not found" });
    }

    const order = await Order.create({
      order_number: generateOrderNumber(),
      customer_id,
    });

    const orderItems = productsList.map((product) => {
      const dbProduct = dbProducts.find((p) => p.id.toString() === product.id);
      console.log(dbProduct)
      return {
        order_id: order.id,
        product_id: product.id,
        quantity: product.quantity,
        price: dbProduct.price,
      };
    });

    await OrderItem.bulkCreate(orderItems);

    return res.status(201).json(order);
  
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred while creating the order // " + err.message });
  }
}

function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 100000000000);

  return `ORD-${year}${month}${day}${random}`;
}

module.exports = {
  createOrder,
};
