# REST API for e-commerce platform


## Overview
This REST API provides endpoints for 
* get all products
* checkout a product to create an order
* get order of a user

## Technologies
* Node.js
* Express.js
* SQLite
* CORS
* Test with Jest and Supertest

## Steps to develop
1. Create a new Node.js project and install dependencies
2. Set up Express server and define routes for the API endpoints
3. Implement the logic for each endpoint, including database interactions
4. Write tests for each endpoint using Jest and Supertest (must be done before starting the server)
5. Run tests and ensure all tests pass
6. Start the server and test the API using tools like curl
   * Before starting the server, make sure to run the tests to ensure everything is working correctly
   * Initial data for testing

## Project structure
```
├── api
│   ├── controllers
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── models
│   │   ├── orderModel.js
│   │   └── productModel.js 
│   ├── routes
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── tests
│   │   ├── order.test.js
│   │   └── product.test.js
│   ├── app.js
│   └── server.js
├── package.json
└── README.md
```

## Command to run the server
```bash
$npm install
$npm test
$npm start
```