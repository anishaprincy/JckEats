const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuModel'); // Import MenuItem model

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems); // Send all menu items as response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving menu items' }); // Error handling
  }
});

// Get a single menu item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Get ID from the URL params
  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem); // Send the single menu item as response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving menu item' }); // Error handling
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  const { name, description, price, category, imageUrl, available } = req.body;

  try {
    // Create new menu item object
    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
      available,
    });

    await newItem.save(); // Save new menu item to the database
    res.status(201).json({ message: 'Menu item added successfully', newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item' }); // Error handling
  }
});

// Update an existing menu item by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get ID from the URL params
  const { name, description, price, category, imageUrl, available } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        imageUrl,
        available,
      },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated successfully', updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

// Delete a menu item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get ID from the URL params

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

module.exports = router;
