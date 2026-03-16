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
npm test
npm start
```

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
