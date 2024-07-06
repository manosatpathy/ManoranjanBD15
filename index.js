const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(cors());

//Server side values
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

// Endpoint 1 :Calculate the total price of items in the cart

app.get("/cart-total", (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

// EndPoint 2 :Apply a discount based on membership status

app.get("/membership-discount", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;
  let finalPrice;
  if (isMember === "true") {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

// EndPoint 3 : Calculate tax on the cart total

app.get("/calculate-tax", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const taxAmount = (cartTotal * taxRate) / 100;
  res.send(taxAmount.toString());
});

// EndPoint 4 : Estimate delivery time based on shipping method

app.get("/estimate-delivery", (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  let daysForDelivery;
  if (shippingMethod === "standard") {
    daysForDelivery = distance / 50;
  } else if (shippingMethod === "express") {
    daysForDelivery = distance / 100;
  }
  res.send(daysForDelivery.toString());
});

// EndPoint 5 : Calculate the shipping cost based on weight and distance

app.get("/shipping-cost", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

// EndPoint 6 : Calculate loyalty points earned from a purchase

app.get("/loyalty-points", (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
