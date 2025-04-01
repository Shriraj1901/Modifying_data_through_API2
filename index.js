const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import the MenuItem model
const MenuItem = require('./schema'); // Import the schema

const app = express();
const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Menu API');
});

// PUT - Update Menu Item
app.put('/menu/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    // Validate input fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // Find and update the menu item
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: 'Error updating menu item' });
  }
});

// DELETE - Delete Menu Item
app.delete('/menu/:id', async (req, res) => {
  try {
    // Delete the menu item by ID
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting menu item' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
