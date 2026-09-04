const express = require('express');
const { body, validationResult } = require('express-validator');
const verifyJwt = require('../middleware/verifyJwt');
const {
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
} = require('../controllers/city.controller');

const router = express.Router();

router.use(verifyJwt);

router.get('/', listCities);
router.get('/:cityCode/dashboard', getCityDashboard);
router.get('/:cityCode/street-food', listStreetFood);
router.get('/:cityCode/landmarks', listLandmarks);
router.get('/:cityCode/fine-dining', listFineDining);
router.get('/:cityCode/recipes', listRecipes);
router.get('/:cityCode/top-recipes', listTopRecipes);
router.get('/:cityCode/winningRecipes', listWinningRecipes);
router.get('/:cityCode/videos', listVideos);
router.get('/:cityCode/photos', listPhotos);

router.post(
  '/select',
  body('cityId').isString().trim().notEmpty().withMessage('cityId is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  selectCity
);

module.exports = router;
