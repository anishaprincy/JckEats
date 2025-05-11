// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { register, login, profile } = require('../controllers/userController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', authMiddleware, profile);

module.exports = router;
