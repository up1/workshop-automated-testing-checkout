const { getAllProducts } = require("../models/productModel");

async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers",
      });
    }

    const { total, data } = getAllProducts(page, limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { getProducts };
