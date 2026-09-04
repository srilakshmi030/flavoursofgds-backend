const CITIES = require('../data/cities');
const { getCityContent } = require('../services/content.service');

function resolveCity(req, res) {
  const { cityCode } = req.params;
  const content = getCityContent(cityCode);
  if (!content) {
    res.status(404).json({ message: `City '${cityCode}' is not supported` });
    return null;
  }
  return content;
}

function sendCollection(req, res, collection, key) {
  const content = resolveCity(req, res);
  if (!content) return;

  const items = content[collection] || [];
  res.status(200).json({
    cityCode: content.cityCode,
    cityName: content.cityName,
    count: items.length,
    [key]: items,
  });
}

// GET /api/cities - list the top 20 metropolitan cities available.
function listCities(req, res) {
  res.status(200).json({ count: CITIES.length, cities: CITIES });
}

// GET /api/cities/:cityCode/dashboard
function getCityDashboard(req, res) {
  const content = resolveCity(req, res);
  if (!content) return;

  const city = CITIES.find((item) => item.id === content.cityCode);

  res.status(200).json({
    cityCode: content.cityCode,
    cityName: content.cityName,
    state: city?.state || null,
    country: city?.country || null,
    ...content.dashboard,
  });
}

// GET /api/cities/:cityCode/street-food
function listStreetFood(req, res) {
  sendCollection(req, res, 'streetFood', 'streetFood');
}

// GET /api/cities/:cityCode/landmarks
function listLandmarks(req, res) {
  sendCollection(req, res, 'landmarks', 'landmarks');
}

// GET /api/cities/:cityCode/fine-dining
function listFineDining(req, res) {
  sendCollection(req, res, 'fineDining', 'restaurants');
}

// GET /api/cities/:cityCode/recipes
function listRecipes(req, res) {
  sendCollection(req, res, 'recipes', 'recipes');
}

// GET /api/cities/:cityCode/top-recipes - the three winning recipes for the city.
function listTopRecipes(req, res) {
  const content = resolveCity(req, res);
  if (!content) return;

  const topRecipes = [...(content.recipes || [])].sort((a, b) => a.rank - b.rank).slice(0, 3);

  res.status(200).json({
    cityCode: content.cityCode,
    cityName: content.cityName,
    count: topRecipes.length,
    recipes: topRecipes,
  });
}

// GET /api/cities/:cityCode/videos
function listVideos(req, res) {
  sendCollection(req, res, 'videos', 'videos');
}

// GET /api/cities/:cityCode/photos
function listPhotos(req, res) {
  sendCollection(req, res, 'photos', 'photos');
}

// GET /api/cities/:cityCode/winningRecipes - the ranked contest winners.
function listWinningRecipes(req, res) {
  const content = resolveCity(req, res);
  if (!content) return;

  const awards = ['Winner', '1st Runner-up', '2nd Runner-up'];
  const winners = [...(content.recipes || [])]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, awards.length)
    .map((recipe, index) => ({ ...recipe, award: awards[index] }));

  res.status(200).json({
    cityCode: content.cityCode,
    cityName: content.cityName,
    count: winners.length,
    winningRecipes: winners,
  });
}

// POST /api/cities/select - called when the user picks a city on the client.
function selectCity(req, res) {
  const { cityId } = req.body;

  const city = CITIES.find((c) => c.id === cityId);
  if (!city) {
    return res.status(404).json({ message: `City '${cityId}' is not in the supported list` });
  }

  // Placeholder for city-scoped business logic (e.g. persisting the user's
  // preference or fetching city-specific menus/outlets).
  res.status(200).json({
    message: 'City selected successfully',
    selectedCity: city,
    user: req.user?.sub || req.user?.oid || null,
  });
}

module.exports = {
  listCities,
  getCityDashboard,
  listStreetFood,
  listLandmarks,
  listFineDining,
  listRecipes,
  listTopRecipes,
  listVideos,
  listPhotos,
  listWinningRecipes,
  selectCity,
};
