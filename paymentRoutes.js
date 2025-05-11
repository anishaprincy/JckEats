const express = require('express');
const router = express.Router();
const Payment = require('../models/PaymentModel'); // Import Payment model

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find(); // Retrieve all payments
    res.json(payments); // Send the payments as response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payments' });
  }
});

// Get a specific payment by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id); // Find payment by ID
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment); // Send the payment as response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment' });
  }
});

// Process a payment (Dummy for now)
router.post('/', async (req, res) => {
  const { orderId, amount, paymentMethod, status } = req.body;

  try {
    const newPayment = new Payment({
      orderId,
      amount,
      paymentMethod,
      status,
    });

    await newPayment.save(); // Save payment to the database
    res.status(201).json({ message: 'Payment processed successfully', newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
});

// Update payment status (e.g., successful, failed)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Get new status from the request body

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment status updated successfully', updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment' });
  }
});

// Delete payment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment' });
  }
});

module.exports = router;
