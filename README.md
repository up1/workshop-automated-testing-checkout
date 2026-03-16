# Demo with AI Agent
* Full stack development
  * Frontend: React and Tailwind CSS
  * Backend: Node.js and Express and SQLite


## List of features
- [x] List of products
- [x] Add product to cart
- [x] View cart
- [x] Remove product from cart
- [x] Checkout
- [x] Order summary

## User Flow
1. User visits the homepage and sees a list of products.
   * /product
2. User clicks on a product to view details and adds it to the cart. (strore data in local storage in web browser)
3. User views the cart to see the added products and their total price.
   * /cart
4. User proceeds to checkout and confirms the order. (shipping and payment information)
   * /checkout
5. User receives an order summary with the details of the purchase.
   * /confirmation



## Run Frontend
``` 
$cd web
$npm install
$npm run dev    
```

## Run Backend
```
$cd api
$npm install
$node scripts/initial.js
$npm test
$npm start
```