const { findItemById } = require('../services/content.service');

function sendItem(res, collection, id, label) {
  const item = findItemById(collection, id);
  if (!item) {
    return res.status(404).json({ message: `${label} '${id}' was not found` });
  }
  return res.status(200).json(item);
}

// GET /api/street-food/:id
function getStreetFoodItem(req, res) {
  sendItem(res, 'streetFood', req.params.id, 'Street food item');
}

// GET /api/landmarks/:id
function getLandmark(req, res) {
  sendItem(res, 'landmarks', req.params.id, 'Landmark');
}

// GET /api/restaurants/:id
function getRestaurant(req, res) {
  sendItem(res, 'fineDining', req.params.id, 'Restaurant');
}

// GET /api/recipes/:recipeId
function getRecipe(req, res) {
  sendItem(res, 'recipes', req.params.recipeId, 'Recipe');
}

module.exports = { getStreetFoodItem, getLandmark, getRestaurant, getRecipe };
