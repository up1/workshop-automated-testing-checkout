const request = require("supertest");
const app = require("../app");
const { closeDb } = require("../models/productModel");

afterAll(() => {
  closeDb();
});

describe("GET /api/product", () => {
  it("should return products with default pagination", async () => {
    const res = await request(app).get("/api/product");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body.total).toBe(12);
    expect(res.body.data).toHaveLength(10);
  });

  it("should return products with custom pagination", async () => {
    const res = await request(app).get("/api/product?page=2&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.page).toBe(2);
    expect(res.body.limit).toBe(10);
    expect(res.body.total).toBe(12);
    expect(res.body.data).toHaveLength(2);
  });

  it("should return correct product fields", async () => {
    const res = await request(app).get("/api/product?page=1&limit=1");

    expect(res.status).toBe(200);
    const product = res.body.data[0];
    expect(product).toHaveProperty("image");
    expect(product).toHaveProperty("category");
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("price");
  });

  it("should return first product as Wireless Headphones Pro", async () => {
    const res = await request(app).get("/api/product?page=1&limit=1");

    expect(res.status).toBe(200);
    expect(res.body.data[0].title).toBe("Wireless Headphones Pro");
    expect(res.body.data[0].category).toBe("Electronics");
    expect(res.body.data[0].price).toBe("$249.99");
  });

  it("should return empty data for page beyond total", async () => {
    const res = await request(app).get("/api/product?page=100&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(0);
  });
});
