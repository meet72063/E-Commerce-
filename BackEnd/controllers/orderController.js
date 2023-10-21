const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_MY);
const { User } = require("../models/userModel");

// @desc  stripe payment checkout
// @route   POST /api/products/checkout
// @access  Public

const checkOutSession = async (req, res) => {
  const { userId } = req.body;
  const { cart } = await User.findOne({ _id: userId }).populate("cart.product");

  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.title,
        images: [item.product.image],
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
  });

  res.json({ id: session.id });
};

module.exports = { checkOutSession };
