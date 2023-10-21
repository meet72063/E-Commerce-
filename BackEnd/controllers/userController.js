const { User } = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc  create new User
// @route   POST /api/user
// @access  Public

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user Already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    const error = new Error("invalid Data");
    next(error);
  }
};

// @desc  login User
// @route   POST /api/user/login
// @access  Public

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Error("Please provide credentials");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }

  //compare password
  const passwordMatched = await user.matchPassword(password);

  if (!passwordMatched) {
    res.status(401);
    throw new Error("incorrect password");
  }

  if (user) {
    const userCart = await User.findOne({ _id: user._id }).populate(
      "cart.product"
    );
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      cart: userCart.formattedItems,
    });
  } else {
    res.status(401);
    throw new Error("invalid data");
  }
};

// @desc Cart Syncchroniation
// @route   POST /api/user/bachingCart/:userId
// @access  Public

const batchingCart = async (req, res) => {
  const { userId } = req.params;

  const { batchingProduct } = req.body; // Array of pending updates
  let user = await User.findOne({ _id: userId });
  for (const update of batchingProduct) {
    if (update.type === "add") {
      user.cart.push(update.item);
    } else if (update.type === "remove") {
      const newCart = user.cart.filter(
        (item) => item.product.toString() !== update.item.product
      );
      user.cart = newCart;
    } else if (update.type === "quantityChange") {
      const newCart = user.cart.map((item) => {
        if (item.product.toString() === update.item.product) {
          return { ...item, quantity: update.item.quantity };
        } else {
          return item;
        }
      });
      user.cart = newCart;
    }
  }
  await user.save();

  const userCart = await User.findOne({ _id: userId }).populate("cart.product");

  res.json({ status: "success", cart: userCart.formattedItems });
};

// @desc Get user cart
// @route  GET /api/user/bachingCart/:userId
// @access  Public
const getUserCart = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const userCart = await User.findOne({ _id: userId }).populate("cart.product");

  res.json({ cart: userCart.formattedItems });
};

//// @desc  login User
// @route   PATCH /api/user/cart
// @access  Public

const clearCart = async (req, res) => {
  const { _id } = req.body;

  const user = await User.findOne({ _id });
  user.cart = [];
  await user.save();
  res.json({ msg: "Cart Cleared " });
};

module.exports = { registerUser, login, batchingCart, getUserCart, clearCart };
