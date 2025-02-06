const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3010;



app.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Menu API');
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});