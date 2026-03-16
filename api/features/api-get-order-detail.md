# REST API - Get order detail


## Endpoint
```GET /api/order/:orderId```


## Response with JSON

* Success with 200
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
* Not Found with 404
```json
{
  "success": false,
  "message": "Order not found"
}
```

* Error with 500
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```