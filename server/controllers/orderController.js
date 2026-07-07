const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const { items, total } = req.body;

    const products = items.map((item) => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      userId,
      products,
      total,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Orders
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.user.id,
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};