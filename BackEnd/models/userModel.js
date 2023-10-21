const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//create user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: "Email address is required",
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      minLength: 6,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hash password before saving to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

//compre password
userSchema.methods.matchPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// a virtual property to format cart items
userSchema.virtual("formattedItems").get(function () {
  return this.cart.map((item) => {
    return {
      _id: item.product._id,
      name: item.product.name, // Replace with the actual name property of the product
      price: item.product.price,
      title: item.product.title,
      description: item.product.description,
      discountPercentage: item.product.discountPercentage,
      rating: item.product.rating,
      brand: item.product.brand,
      category: item.product.category,
      image: item.product.image,
      AdditionalImages: item.product.AdditionalImages,
      stock: item.product.stock,
      quantity: item.quantity,
    };
  });
});

const User = mongoose.model("users", userSchema);

module.exports = { User };
