# REST API - E-commerce Platform

## Get All Products

**Endpoint:** `GET /api/product`

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |

## Quick Start

```bash
npm install
node scripts/initial.js
npm test
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `node scripts/initial.js` | Clear and seed database with 12 products |
| `npm test` | Run tests with Jest |
| `npm start` | Start server on port 3001 |

## curl Examples

Get products with default pagination:
```bash
curl http://localhost:3001/api/product
```

Get products with custom pagination:
```bash
curl "http://localhost:3001/api/product?page=1&limit=5"
```

Get second page:
```bash
curl "http://localhost:3001/api/product?page=2&limit=10"
```

## Response

**Success (200):**
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 12,
  "data": [
    {
      "id": 1,
      "image": "https://images.unsplash.com/...",
      "category": "Electronics",
      "title": "Wireless Headphones Pro",
      "description": "Premium noise-cancelling over-ear headphones",
      "price": "$249.99"
    }
  ]
}
```

**Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Checkout

**Endpoint:** `POST /api/checkout`

## curl Examples

Create an order:
```bash
curl -X POST http://localhost:3001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "0812345678"
    },
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Bangkok",
      "state": "BKK",
      "zip": "10110"
    },
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 5, "quantity": 1 }
    ]
  }'
```

## Response

**Success (201):**
```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "customer": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "0812345678"
    },
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Bangkok",
      "state": "BKK",
      "zip": "10110"
    },
    "items": [
      { "productId": 1, "title": "Wireless Headphones Pro", "price": "$249.99", "quantity": 2 },
      { "productId": 5, "title": "Running Shoes Air Max", "price": "$129.00", "quantity": 1 }
    ],
    "subtotal": "$628.98",
    "shipping": "$12.00",
    "tax": "$50.32",
    "total": "$691.30",
    "status": "confirmed",
    "createdAt": "2026-03-16T10:30:00.000Z"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "fullName": "Full name is required",
    "email": "Enter a valid email address",
    "street": "Street address is required"
  }
}
```

**Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Get Order Detail

**Endpoint:** `GET /api/order/:orderId`

## curl Examples

Get order by ID:
```bash
curl http://localhost:3001/api/order/1
```

## Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "customer": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "0812345678"
    },
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Bangkok",
      "state": "BKK",
      "zip": "10110"
    },
    "items": [
      { "productId": 1, "title": "Wireless Headphones Pro", "price": "$249.99", "quantity": 2 },
      { "productId": 5, "title": "Running Shoes Air Max", "price": "$129.00", "quantity": 1 }
    ],
    "subtotal": "$628.98",
    "shipping": "$12.00",
    "tax": "$50.32",
    "total": "$691.30",
    "status": "confirmed",
    "createdAt": "2026-03-16T10:30:00.000Z"
  }
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Order not found"
}
```

**Error (500):**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```
