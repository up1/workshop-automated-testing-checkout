const { getDb } = require("./productModel");

function initOrderTables() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      subtotal TEXT NOT NULL,
      shipping TEXT NOT NULL,
      tax TEXT NOT NULL,
      total TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      createdAt TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      productId INTEGER NOT NULL,
      title TEXT NOT NULL,
      price TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    )
  `);
}

function parsePrice(price) {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function createOrder(customer, shippingAddress, items) {
  const db = getDb();
  initOrderTables();

  const productIds = items.map((item) => item.productId);
  const placeholders = productIds.map(() => "?").join(",");
  const products = db
    .prepare(`SELECT * FROM products WHERE id IN (${placeholders})`)
    .all(...productIds);

  const productMap = {};
  for (const p of products) {
    productMap[p.id] = p;
  }

  const missingIds = productIds.filter((id) => !productMap[id]);
  if (missingIds.length > 0) {
    return { error: "Products not found", missingIds };
  }

  let subtotal = 0;
  const orderItems = items.map((item) => {
    const product = productMap[item.productId];
    const price = parsePrice(product.price);
    subtotal += price * item.quantity;
    return {
      productId: item.productId,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const shipping = 12.0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;
  const createdAt = new Date().toISOString();

  const insertOrder = db.prepare(`
    INSERT INTO orders (fullName, email, phone, street, city, state, zip, subtotal, shipping, tax, total, status, createdAt)
    VALUES (@fullName, @email, @phone, @street, @city, @state, @zip, @subtotal, @shipping, @tax, @total, @status, @createdAt)
  `);

  const insertItem = db.prepare(`
    INSERT INTO order_items (orderId, productId, title, price, quantity)
    VALUES (@orderId, @productId, @title, @price, @quantity)
  `);

  db.exec("BEGIN");
  let result;
  try {
    const info = insertOrder.run({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      street: shippingAddress.street,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
      subtotal: formatPrice(subtotal),
      shipping: formatPrice(shipping),
      tax: formatPrice(tax),
      total: formatPrice(total),
      status: "confirmed",
      createdAt,
    });

    const orderId = info.lastInsertRowid;

    for (const item of orderItems) {
      insertItem.run({ orderId, ...item });
    }

    result = {
      orderId: Number(orderId),
      customer,
      shippingAddress,
      items: orderItems,
      subtotal: formatPrice(subtotal),
      shipping: formatPrice(shipping),
      tax: formatPrice(tax),
      total: formatPrice(total),
      status: "confirmed",
      createdAt,
    };
    db.exec("COMMIT");
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }

  return { data: result };
}

function getOrderById(orderId) {
  const db = getDb();
  initOrderTables();

  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId);
  if (!order) return null;

  const items = db.prepare("SELECT productId, title, price, quantity FROM order_items WHERE orderId = ?").all(orderId);

  return {
    orderId: order.id,
    customer: {
      fullName: order.fullName,
      email: order.email,
      phone: order.phone,
    },
    shippingAddress: {
      street: order.street,
      city: order.city,
      state: order.state,
      zip: order.zip,
    },
    items,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  };
}

module.exports = { createOrder, getOrderById, initOrderTables };
