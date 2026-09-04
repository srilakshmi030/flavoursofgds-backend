const CITIES = require('../data/cities');
const { getCity, getDashboard, getCollection } = require('../services/content.service');

async function resolveCity(req, res) {
  const { cityCode } = req.params;
  const city = await getCity(cityCode);
  if (!city) {
    res.status(404).json({ message: `City '${cityCode}' is not supported` });
    return null;
  }
  return city;
}

async function sendCollection(req, res, collection, key) {
  const city = await resolveCity(req, res);
  if (!city) return;

  const items = await getCollection(city.cityCode, collection);
  res.status(200).json({
    cityCode: city.cityCode,
    cityName: city.name,
    count: items.length,
    [key]: items,
  });
}

// GET /api/cities - list the top 20 metropolitan cities available.
function listCities(req, res) {
  res.status(200).json({ count: CITIES.length, cities: CITIES });
}

// GET /api/cities/:cityCode/dashboard
async function getCityDashboard(req, res) {
  const city = await resolveCity(req, res);
  if (!city) return;

  const dashboard = await getDashboard(city.cityCode);

  res.status(200).json({
    cityCode: city.cityCode,
    cityName: city.name,
    state: city.state,
    country: city.country,
    ...dashboard,
  });
}

// GET /api/cities/:cityCode/street-food
async function listStreetFood(req, res) {
  await sendCollection(req, res, 'streetFood', 'streetFood');
}

// GET /api/cities/:cityCode/landmarks
async function listLandmarks(req, res) {
  await sendCollection(req, res, 'landmarks', 'landmarks');
}

// GET /api/cities/:cityCode/fine-dining
async function listFineDining(req, res) {
  await sendCollection(req, res, 'fineDining', 'restaurants');
}

// GET /api/cities/:cityCode/recipes
async function listRecipes(req, res) {
  await sendCollection(req, res, 'recipes', 'recipes');
}

// GET /api/cities/:cityCode/top-recipes - the three winning recipes for the city.
async function listTopRecipes(req, res) {
  const city = await resolveCity(req, res);
  if (!city) return;

  const recipes = (await getCollection(city.cityCode, 'recipes')).slice(0, 3);

  res.status(200).json({
    cityCode: city.cityCode,
    cityName: city.name,
    count: recipes.length,
    recipes,
  });
}

// GET /api/cities/:cityCode/videos
async function listVideos(req, res) {
  await sendCollection(req, res, 'videos', 'videos');
}

// GET /api/cities/:cityCode/photos
async function listPhotos(req, res) {
  await sendCollection(req, res, 'photos', 'photos');
}

// GET /api/cities/:cityCode/winningRecipes - the ranked contest winners.
async function listWinningRecipes(req, res) {
  const city = await resolveCity(req, res);
  if (!city) return;

  const awards = ['Winner', '1st Runner-up', '2nd Runner-up'];
  const winners = (await getCollection(city.cityCode, 'recipes'))
    .slice(0, awards.length)
    .map((recipe, index) => ({ ...recipe, award: awards[index] }));

  res.status(200).json({
    cityCode: city.cityCode,
    cityName: city.name,
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
