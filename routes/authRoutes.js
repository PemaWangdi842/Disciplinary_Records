const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.get('/signup', authController.showSignupForm);
router.post('/signup', authController.handleSignup);

// Login
router.get('/login', authController.showLoginForm);
router.post('/login', authController.handleLogin);

// Email verification
router.get('/verify-email', authController.verifyEmail);

// Logout
router.get('/logout', authController.logoutUser);

module.exports = router;
