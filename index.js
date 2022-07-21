const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const categoryRoute = require("./routes/category");
const paymentRoute = require("./routes/stripe");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce_v1")
.then(() => {
  console.log("database is connected");
})
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());

app.use("/api/user",  userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders/", orderRoute);
app.use("/api/categories/", categoryRoute);
app.use("/api/checkout", paymentRoute);

app.listen(port, () => {
  console.log("backend server is running on port " + port);
})