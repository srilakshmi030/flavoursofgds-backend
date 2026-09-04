const express = require('express');
const verifyJwt = require('../middleware/verifyJwt');
const {
  getStreetFoodItem,
  getLandmark,
  getRestaurant,
  getRecipe,
} = require('../controllers/content.controller');

const router = express.Router();

router.use(verifyJwt);

router.get('/street-food/:id', getStreetFoodItem);
router.get('/landmarks/:id', getLandmark);
router.get('/restaurants/:id', getRestaurant);
router.get('/recipes/:recipeId', getRecipe);

module.exports = router;
