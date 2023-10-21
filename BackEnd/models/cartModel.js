const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who owns the cart
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the product in the cart
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

// Define a virtual property to format cart items
cartSchema.virtual("formattedItems").get(function () {
  return this.items.map((item) => {
    return {
      productId: item.productId._id,
      name: item.productId.name, // Replace with the actual name property of the product
      price: item.productId.price,
      title: item.productId.title,
      description: item.productId.description,
      discountPercentage: item.productId.discountPercentage,
      rating: item.productId.rating,
      brand: item.productId.brand,
      category: item.productId.category,
      image: item.productId.image,
      AdditionalImages: item.productId.AdditionalImages,
      stock: item.productId.stock,
      quantity: item.quantity,
    };
  });
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
