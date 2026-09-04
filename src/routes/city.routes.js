const express = require('express');
const { body, validationResult } = require('express-validator');
const verifyJwt = require('../middleware/verifyJwt');
const asyncHandler = require('../utils/asyncHandler');
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
router.get('/:cityCode/dashboard', asyncHandler(getCityDashboard));
router.get('/:cityCode/street-food', asyncHandler(listStreetFood));
router.get('/:cityCode/landmarks', asyncHandler(listLandmarks));
router.get('/:cityCode/fine-dining', asyncHandler(listFineDining));
router.get('/:cityCode/recipes', asyncHandler(listRecipes));
router.get('/:cityCode/top-recipes', asyncHandler(listTopRecipes));
router.get('/:cityCode/winningRecipes', asyncHandler(listWinningRecipes));
router.get('/:cityCode/videos', asyncHandler(listVideos));
router.get('/:cityCode/photos', asyncHandler(listPhotos));

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
