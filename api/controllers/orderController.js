const { createOrder, getOrderById } = require("../models/orderModel");

function validateCheckout(body) {
  const errors = {};
  const { customer, shippingAddress, items } = body || {};

  if (!customer || typeof customer !== "object") {
    errors.customer = "Customer information is required";
  } else {
    if (!customer.fullName || !customer.fullName.trim()) errors.fullName = "Full name is required";
    if (!customer.email || !customer.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!customer.phone || !customer.phone.trim()) errors.phone = "Phone number is required";
  }

  if (!shippingAddress || typeof shippingAddress !== "object") {
    errors.shippingAddress = "Shipping address is required";
  } else {
    if (!shippingAddress.street || !shippingAddress.street.trim()) errors.street = "Street address is required";
    if (!shippingAddress.city || !shippingAddress.city.trim()) errors.city = "City is required";
    if (!shippingAddress.state || !shippingAddress.state.trim()) errors.state = "State is required";
    if (!shippingAddress.zip || !shippingAddress.zip.trim()) errors.zip = "Zip code is required";
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.items = "At least one item is required";
  } else {
    for (const item of items) {
      if (!item.productId || !Number.isInteger(item.productId)) {
        errors.items = "Each item must have a valid productId";
        break;
      }
      if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity < 1) {
        errors.items = "Each item must have a valid quantity";
        break;
      }
    }
  }

  return errors;
}

async function checkout(req, res) {
  try {
    const errors = validateCheckout(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const { customer, shippingAddress, items } = req.body;
    const result = createOrder(customer, shippingAddress, items);

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
        missingIds: result.missingIds,
      });
    }

    res.status(201).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getOrderDetail(req, res) {
  try {
    const orderId = parseInt(req.params.orderId);

    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { checkout, getOrderDetail };
