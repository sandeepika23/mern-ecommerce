const Cart = require("../models/Cart");

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
   const {
   productId,
   name,
   price,
   image,
   rating,
} = req.body;

const userId = req.user.id;

    const existingItem = await Cart.findOne({
      userId,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.json(existingItem);
    }

    const cart = await Cart.create({
      userId,
      productId,
      name,
      price,
      image,
      rating,
      quantity: 1,
    });

    res.status(201).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Remove Item
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item Removed",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Quantity
const updateQuantity = async (req, res) => {
  try {

    const cart = await Cart.findById(req.params.id);

    cart.quantity = req.body.quantity;

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
};