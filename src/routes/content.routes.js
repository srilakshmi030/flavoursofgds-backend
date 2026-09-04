const express = require('express');
const verifyJwt = require('../middleware/verifyJwt');
const asyncHandler = require('../utils/asyncHandler');
const {
  getStreetFoodItem,
  getLandmark,
  getRestaurant,
  getRecipe,
} = require('../controllers/content.controller');

const router = express.Router();

router.use(verifyJwt);

router.get('/street-food/:id', asyncHandler(getStreetFoodItem));
router.get('/landmarks/:id', asyncHandler(getLandmark));
router.get('/restaurants/:id', asyncHandler(getRestaurant));
router.get('/recipes/:recipeId', asyncHandler(getRecipe));

module.exports = router;
