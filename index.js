const express = require('express');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let newCartTotal = cartTotal + newItemPrice;
  res.send(newCartTotal.toString());
});

// Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  const discountedAmount = (cartTotal * 10) / 100;
  const finalPrice = cartTotal - discountedAmount;

  res.send(isMember ? finalPrice.toString() : cartTotal.toString());
});

// Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const taxAmount = (cartTotal * 5) / 100;
  res.send(taxAmount.toString());
});

// Estimate delivery time based on shipping method
const deliveryTime = (shippingMethod, distance) => {
  if (shippingMethod === 'standard') {
    return distance / 50;
  } else if (shippingMethod === 'express') {
    return distance / 100;
  }
};

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(deliveryTime(shippingMethod, distance).toString());
});

// Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

// Calculate the loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
