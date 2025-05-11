const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel'); // Import Order model

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database
    res.json(orders); // Send the orders as response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Get ID from the URL params
  try {
    const order = await Order.findById(id); // Find order by ID
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order); // Send the order as response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order' });
  }
});

// Place a new order
router.post('/', async (req, res) => {
  const { userId, menuItems, totalAmount, status } = req.body;

  try {
    const newOrder = new Order({
      userId,
      menuItems,
      totalAmount,
      status,
    });

    await newOrder.save(); // Save new order to the database
    res.status(201).json({ message: 'Order placed successfully', newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Update order status (e.g., processing, delivered)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Get new status from the request body

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

module.exports = router;
