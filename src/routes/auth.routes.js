const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const verifyEntraToken = require('../middleware/verifyEntraToken');
const { login, devLogin } = require('../controllers/auth.controller');

const router = express.Router();

// Throttle login attempts to reduce brute-force/credential-stuffing risk.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, verifyEntraToken, login);

router.post(
  '/dev-login',
  loginLimiter,
  body('username').isString().trim().notEmpty().isLength({ max: 100 }),
  body('password').isString().notEmpty().isLength({ max: 200 }),
  (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    next();
  },
  devLogin
);

module.exports = router;
