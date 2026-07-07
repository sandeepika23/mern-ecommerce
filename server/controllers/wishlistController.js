const Wishlist = require("../models/Wishlist");

// Add to Wishlist
const addWishlist = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      productId,
      name,
      price,
      image,
      rating,
    } = req.body;

    const exists = await Wishlist.findOne({
      userId,
      productId,
    });

    if (exists) {
      return res.json(exists);
    }

    const item = await Wishlist.create({
      userId,
      productId,
      name,
      price,
      image,
      rating,
    });

    res.status(201).json(item);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {

    const userId = req.user.id;

    const wishlist = await Wishlist.find({
      userId,
    });

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Wishlist Item
const removeWishlist = async (req, res) => {
  try {

    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      message: "Removed",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addWishlist,
  getWishlist,
  removeWishlist,
};