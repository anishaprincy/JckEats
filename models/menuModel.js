const mongoose = require('mongoose');

// Menu item schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Menu item model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
