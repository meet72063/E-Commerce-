const { Product } = require("../models/productModal");

// @desc    Fetch all products and apply filters
// @route   GET /api/products/
// @access  Public

//fetch all products and filter + sort using query parameters
const fetchAllProducts = async (req, res) => {
  const pageNumber = req.query.pageNumber || 1;
  const { rating, minPrice, maxPrice, sort, category, brand } = req.query;
  const pageSize = 12;
  const query = {};
  let sortObj = {};
  if (rating) query.rating = { $lte: rating };
  if (minPrice) query.price = { $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (sort === "asc") {
    sortObj = { price: 1 };
  } else if (sort === "desc") {
    sortObj = { price: -1 };
  }
  const count = await Product.countDocuments(query);

  const products = await Product.find(query)
    .populate({ path: "review.userId", select: "name createdAt" })
    .sort(sortObj)
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  res.json({
    products,
    pageNumber,
    pages: Math.ceil(count / pageSize),
    totalItems: count,
  });
};

// @desc    Fetch product by id
// @route   GET /api/products/getProduct/:productId
// @access  Public

const getProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate({
    path: "review.userId",
    select: "name createdAt",
  });

  res.json({ product });
};

// @desc    search product
// @route   GET /api/products/searchProduct/:keyword
// @access  Public

const searchProduct = async (req, res) => {
  const { keyword } = req.params;
  const regex = new RegExp(keyword, "i");

  const products = await Product.find({
    $or: [{ title: regex }, { brand: regex }, { category: regex }],
  }).limit(5);
  res.status(200).json({ products });
};

// @desc    Fetch unique cetogories
// @route   GET /api/products/getCategories
// @access  Public

const getCatogories = async (req, res) => {
  const uniqueCatogories = await Product.distinct("category");
  res.status(200).json(uniqueCatogories);
};

// @desc    Fetch unique brands
// @route   GET /api/products/getBrands
// @access  Public

const getBrands = async (req, res) => {
  const uniqueBrands = await Product.distinct("brand");
  res.json({ brands: uniqueBrands });
};

// @desc    Add Review for product
// @route   POST /api/products/Review/:productId
// @access  Public

const addReview = async (req, res) => {
  const { productId } = req.params;
  const { userId, comment, rating } = req.body;
  const product = await Product.findOne({ _id: productId });
  product.review.push({
    userId,
    comment,
    rating,
  });

  await product.save();

  const updatedProduct = await Product.findOne({ _id: productId }).populate({
    path: "review.userId",
    select: "name createdAt",
  });

  res.json({
    product: updatedProduct,
    msg: "review has been added successfully",
  });
};

// @desc    Getting Reviews for a product
// @route   GET /api/products/Review/:productId
// @access  Public

const getReviews = async (req, res) => {
  const [reviews] = await Product.find(
    { _id: req.params.productId },
    { review: 1 }
  ).populate({ path: "review.userId", select: "name createdAt" });
  res.json({ reviews: reviews.review });
};

module.exports = {
  fetchAllProducts,
  getProduct,
  getCatogories,
  addReview,
  getReviews,
  getBrands,
  searchProduct,
};
