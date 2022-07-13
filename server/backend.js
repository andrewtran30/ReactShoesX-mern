const express = require('express');
const data = require('./data.js');
const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening to http://localhost:${port}`);
});
