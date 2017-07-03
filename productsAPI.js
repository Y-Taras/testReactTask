/* eslint no-console: 0 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const buffer = fs.readFileSync('./data.json');
const productsList = JSON.parse(buffer);
const app = express();
app.use(cors());

app.get('/productsList', (req, res) => {
  if (productsList) {
    setTimeout(() => res.json(productsList.products), Math.floor(Math.random() * 1000));
  } else {
    console.log(404, productsList);
    res.status(404).json({ error: 'show not found' });
  }
});

console.log(`Starting server on port 3000`);
console.log(`Generating api with products`);
app.listen(3000);
