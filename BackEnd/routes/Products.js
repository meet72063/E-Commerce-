const express = require("express");
const router = express.Router();
const {
  fetchAllProducts,
  getCatogories,
  addReview,
  getReviews,
  getBrands,
  getProduct,
  searchProduct,
} = require("../controllers/productsContoller");
const { checkOutSession } = require("../controllers/orderController");

router.route("/").get(fetchAllProducts);
router.route("/checkout").post(checkOutSession);
router.route("/getProduct/:productId").get(getProduct);
router.route("/searchProduct/:keyword").get(searchProduct);
router.route("/getCategories").get(getCatogories);
router.route("/getBrands").get(getBrands);
router.route("/Review/:productId").post(addReview).get(getReviews);

module.exports = router;
