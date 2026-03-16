# REST API :: Get all products

## Endpoint
```GET /api/product?page=1&limit=10```
```

## Response with JSON
* Success with 200
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 12,
  "data": [
  {
    image:
      "https://images.unsplash.com/photo-1739764575613-ecc078ed173d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Electronics",
    title: "Wireless Headphones Pro",
    description: "Premium noise-cancelling over-ear headphones",
    price: "$249.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1729980635252-35c2e0ae5414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Clothing",
    title: "Classic Denim Jacket",
    description: "Timeless washed denim with modern fit",
    price: "$89.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1761083042195-9e0e85189e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Home & Garden",
    title: "Ceramic Plant Pot Set",
    description: "Set of 3 minimalist ceramic planters",
    price: "$45.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1626194062394-022cc80f6d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Electronics",
    title: "Smart Watch Ultra",
    description: "Advanced fitness tracking & notifications",
    price: "$399.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1724921196547-08aee1bab2da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Sports",
    title: "Running Shoes Air Max",
    description: "Lightweight breathable mesh running shoes",
    price: "$129.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1759266339551-2ed0a89a4b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Books",
    title: "Design Patterns Handbook",
    description: "Essential guide to modern software design",
    price: "$34.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1703243030062-58deb1b82367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Toys",
    title: "Building Blocks 500pc",
    description: "Creative construction set for ages 6+",
    price: "$59.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1676524246728-bda8b4c0548a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Clothing",
    title: "Merino Wool Sweater",
    description: "Soft premium merino wool crew neck",
    price: "$120.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1649230955954-108845001397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Home & Garden",
    title: "LED Desk Lamp",
    description: "Adjustable brightness with USB charging port",
    price: "$67.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594501432907-91214bfdd928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Electronics",
    title: "Bluetooth Speaker Mini",
    description: "Portable waterproof speaker with 12h battery",
    price: "$79.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Sports",
    title: "Yoga Mat Premium",
    description: "Non-slip eco-friendly exercise mat 6mm",
    price: "$42.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1719429873442-e894bc0ca520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Books",
    title: "Creative Coding Guide",
    description: "Learn to code through art and design",
    price: "$29.99",
  },
]
}   
```

* Error with 404    
```json
{
  "success": false,
  "message": "Not Found"
}
```

* Error with 500
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```