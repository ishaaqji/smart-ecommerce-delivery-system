const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let products = [];
let orders = [];

let partners = [
  { id: 1, name: "Ravi", lat: 17.385, lng: 78.486 },
  { id: 2, name: "Ali", lat: 17.400, lng: 78.480 }
];

function getDistance(a, b) {
  return Math.sqrt(
    Math.pow(a.lat - b.lat, 2) +
    Math.pow(a.lng - b.lng, 2)
  );
}

// Add Product
app.post('/add-product', (req, res) => {
  const product = { id: Date.now(), ...req.body };
  products.push(product);
  res.json(product);
});

// Get Products
app.get('/products', (req, res) => {
  res.json(products);
});

// Order + Delivery Assign
app.post('/order', (req, res) => {
  const order = { id: Date.now(), ...req.body };

  let nearest = partners[0];
  let minDist = getDistance(order, partners[0]);

  for (let p of partners) {
    let d = getDistance(order, p);
    if (d < minDist) {
      minDist = d;
      nearest = p;
    }
  }

  order.deliveryPartner = nearest;
  orders.push(order);

  res.json(order);
});

// Delivery Dashboard
app.get('/deliveries', (req, res) => {
  res.json(orders);
});

app.listen(3000, () => console.log("Server running on port 3000"));