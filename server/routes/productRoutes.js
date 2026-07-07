const router = require("express").Router();

const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

module.exports = router;