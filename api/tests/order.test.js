const request = require("supertest");
const app = require("../app");
const { closeDb } = require("../models/productModel");

afterAll(() => {
  closeDb();
});

const validCheckout = {
  customer: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "0812345678",
  },
  shippingAddress: {
    street: "123 Main St",
    city: "Bangkok",
    state: "BKK",
    zip: "10110",
  },
  items: [
    { productId: 1, quantity: 2 },
    { productId: 5, quantity: 1 },
  ],
};

describe("POST /api/checkout", () => {
  it("should create an order successfully", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send(validCheckout);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderId).toBeDefined();
    expect(res.body.data.customer.fullName).toBe("John Doe");
    expect(res.body.data.customer.email).toBe("john@example.com");
    expect(res.body.data.shippingAddress.street).toBe("123 Main St");
    expect(res.body.data.shippingAddress.city).toBe("Bangkok");
    expect(res.body.data.items).toHaveLength(2);
    expect(res.body.data.status).toBe("confirmed");
    expect(res.body.data.createdAt).toBeDefined();
  });

  it("should return correct item details in the order", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send(validCheckout);

    expect(res.status).toBe(201);
    const items = res.body.data.items;
    expect(items[0].productId).toBe(1);
    expect(items[0].title).toBe("Wireless Headphones Pro");
    expect(items[0].price).toBe("$249.99");
    expect(items[0].quantity).toBe(2);
    expect(items[1].productId).toBe(5);
    expect(items[1].title).toBe("Running Shoes Air Max");
  });

  it("should calculate totals correctly", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({
        ...validCheckout,
        items: [{ productId: 1, quantity: 1 }],
      });

    expect(res.status).toBe(201);
    // $249.99 subtotal + $12.00 shipping + $20.00 tax (8%)
    expect(res.body.data.subtotal).toBe("$249.99");
    expect(res.body.data.shipping).toBe("$12.00");
    expect(res.body.data.tax).toBe("$20.00");
    expect(res.body.data.total).toBe("$281.99");
  });

  it("should return 400 when customer info is missing", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({
        shippingAddress: validCheckout.shippingAddress,
        items: validCheckout.items,
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation failed");
    expect(res.body.errors.customer).toBeDefined();
  });

  it("should return 400 when email is invalid", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({
        ...validCheckout,
        customer: { ...validCheckout.customer, email: "invalid-email" },
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBe("Enter a valid email address");
  });

  it("should return 400 when shipping address is missing", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({
        customer: validCheckout.customer,
        items: validCheckout.items,
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.shippingAddress).toBeDefined();
  });

  it("should return 400 when items is empty", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({
        ...validCheckout,
        items: [],
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.items).toBeDefined();
  });

  it("should return 400 when product does not exist", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send({
        ...validCheckout,
        items: [{ productId: 9999, quantity: 1 }],
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.missingIds).toContain(9999);
  });
});

describe("GET /api/order/:orderId", () => {
  let orderId;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/checkout")
      .send(validCheckout);
    orderId = res.body.data.orderId;
  });

  it("should return order detail by ID", async () => {
    const res = await request(app).get(`/api/order/${orderId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderId).toBe(orderId);
    expect(res.body.data.customer.fullName).toBe("John Doe");
    expect(res.body.data.customer.email).toBe("john@example.com");
    expect(res.body.data.shippingAddress.street).toBe("123 Main St");
    expect(res.body.data.items).toHaveLength(2);
    expect(res.body.data.status).toBe("confirmed");
    expect(res.body.data.createdAt).toBeDefined();
  });

  it("should return correct item details", async () => {
    const res = await request(app).get(`/api/order/${orderId}`);

    expect(res.status).toBe(200);
    const items = res.body.data.items;
    expect(items[0].productId).toBe(1);
    expect(items[0].title).toBe("Wireless Headphones Pro");
    expect(items[1].productId).toBe(5);
    expect(items[1].title).toBe("Running Shoes Air Max");
  });

  it("should return 404 for non-existent order", async () => {
    const res = await request(app).get("/api/order/99999");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Order not found");
  });

  it("should return 400 for invalid order ID", async () => {
    const res = await request(app).get("/api/order/abc");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
