const Order = require("../models/orderModel");
const Product = require("../models/productModel");

async function createOrder(req, res) {
  try {
    const { products } = req.body;

    const customer_id = req.user.customer_id;

    const ids = products.map((product) => product.id);
    const dbProducts = await Product.findAll({ where: { id: ids } });

    if (dbProducts.length !== products.length) {
      return res.status(400).json({ error: "One or more products not found" });
    }

    const order = await Order.create({
      order_number: generateOrderNumber(),
      customer_id,
    });

    console.log('order', order);

    const orderItems = products.map((product) => {
      const dbProduct = dbProducts.find((p) => p.id === product.id);
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
    console.log(err);
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
