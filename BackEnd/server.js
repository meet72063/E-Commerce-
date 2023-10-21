require("dotenv").config();
const express = require("express");
const { Product } = require("./models/productModal");
const connect = require("./db/connection");
const productRouter = require("./routes/Products");
require("express-async-errors");
const userRouter = require("./routes/user");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

// db connection
connect();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);

//error middleware
app.use(errorHandler);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("server is listening on the port 5000");
});
