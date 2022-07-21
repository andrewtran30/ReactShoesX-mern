const express = require('express');
const data = require('./data.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js');

dotenv.config(); //fetches variables from dotenv file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  }); // mongoose = object that allows us to connect to mongodb; MONGODB_URI = link we put in .env file

const app = express();
app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening to http://localhost:${port}`);
});
