const router = require("express").Router();

const protect = require("../middleware/authMiddleware");

const {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity
} = require("../controllers/cartController");

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.put("/:id", protect, updateQuantity);

router.delete("/:id", protect, removeFromCart);

module.exports = router;