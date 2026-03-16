# REST API :: Checkout

## Endpoint
```POST /api/checkout```

## Request Body with JSON
```json
{
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
}
```

## Response with JSON

* Success with 201
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

* Validation Error with 400
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

* Error with 500
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```