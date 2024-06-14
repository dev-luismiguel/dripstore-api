const models = require("../models");

const Order = models.Order;
const OrderItem = models.OrderItem;
const Product = models.Product;

async function createOrder(req, res) {
  try {
    const { products } = req.body;

    const { id: customer_id } = req.user;

    const ids = products.map((product) => product.id);
    const dbProducts = await Product.findAll({ where: { id: ids } });

    if (dbProducts.length !== products.length) {
      return res.status(400).json({ error: "One or more products not found" });
    }

    const order = await Order.create({
      order_number: generateOrderNumber(),
      customer_id,
    });

    const orderItems = products.map((product) => {
      const dbProduct = dbProducts.find((p) => p.id === Number(product.id));
      return {
        order_id: order.id,
        product_id: product.id,
        quantity: product.quantity,
        price: dbProduct.price,
        customer_id,
      };
    });

    await OrderItem.bulkCreate(orderItems);

    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
  }
}

async function getCustomerOrders(req, res) {
  const { id: customer_id } = req.user;
  const orders = await Order.findAll({
    where: { customer_id },
    include: {
      model: OrderItem,
      include: {
        model: Product,
      },
    },
  });
  return res.status(200).json(orders);
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
  getCustomerOrders,
};
