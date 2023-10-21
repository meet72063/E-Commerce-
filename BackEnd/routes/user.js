const express = require("express");
const {
  registerUser,
  login,
  batchingCart,
  getUserCart,
  clearCart,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(login);
router.route("/cart").patch(clearCart);
router.route("/bachingCart/:userId").post(batchingCart).get(getUserCart);

module.exports = router;
