const { findItemById } = require('../services/content.service');

async function sendItem(res, collection, id, label) {
  const item = await findItemById(collection, id);
  if (!item) {
    return res.status(404).json({ message: `${label} '${id}' was not found` });
  }
  return res.status(200).json(item);
}

// GET /api/street-food/:id
async function getStreetFoodItem(req, res) {
  await sendItem(res, 'streetFood', req.params.id, 'Street food item');
}

// GET /api/landmarks/:id
async function getLandmark(req, res) {
  await sendItem(res, 'landmarks', req.params.id, 'Landmark');
}

// GET /api/restaurants/:id
async function getRestaurant(req, res) {
  await sendItem(res, 'fineDining', req.params.id, 'Restaurant');
}

// GET /api/recipes/:recipeId
async function getRecipe(req, res) {
  await sendItem(res, 'recipes', req.params.recipeId, 'Recipe');
}

module.exports = { getStreetFoodItem, getLandmark, getRestaurant, getRecipe };
