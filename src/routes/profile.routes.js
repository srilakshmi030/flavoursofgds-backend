const express = require('express');
const verifyJwt = require('../middleware/verifyJwt');
const { getUserProfile } = require('../controllers/profile.controller');

const router = express.Router();

router.get('/', verifyJwt, getUserProfile);

module.exports = router;
