const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRoutes);
app.use("/api/checkout", orderRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
