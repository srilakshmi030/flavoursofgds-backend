const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const City = sequelize.define(
  'City',
  {
    cityCode: { type: DataTypes.CHAR(3), primaryKey: true },
    name: { type: DataTypes.STRING(80), allowNull: false },
    state: { type: DataTypes.STRING(80), allowNull: false },
    country: { type: DataTypes.STRING(80), allowNull: false, defaultValue: 'India' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { tableName: 'cities' }
);

// Single source of truth for every image/video. The public URL is composed at read
// time from BLOB_BASE_URL so no environment-specific host is ever stored.
const MediaAsset = sequelize.define(
  'MediaAsset',
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    cityCode: { type: DataTypes.CHAR(3), allowNull: false },
    path: { type: DataTypes.TEXT, allowNull: false, unique: true },
    mediaType: { type: DataTypes.ENUM('image', 'video'), allowNull: false },
    role: { type: DataTypes.STRING(60), allowNull: false },
    subject: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('ready', 'missing', 'pending_review'),
      allowNull: false,
      defaultValue: 'missing',
    },
    sizeKb: { type: DataTypes.INTEGER, validate: { max: 1024 } },
    durationSeconds: { type: DataTypes.SMALLINT, validate: { max: 10 } },
    notes: DataTypes.TEXT,
  },
  { tableName: 'media_assets', indexes: [{ fields: ['city_code', 'role'] }] }
);

const CityDetail = sequelize.define(
  'CityDetail',
  {
    cityCode: { type: DataTypes.CHAR(3), primaryKey: true },
    introDescription: DataTypes.TEXT,
    bannerMediaId: DataTypes.UUID,
    aboutTitle: DataTypes.STRING(120),
    aboutDescription: DataTypes.TEXT,
    aboutMediaId: DataTypes.UUID,
    topRecipesTitle: DataTypes.STRING(120),
    topRecipesDescription: DataTypes.TEXT,
  },
  { tableName: 'city_details' }
);

const CitySnap = sequelize.define(
  'CitySnap',
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    cityCode: { type: DataTypes.CHAR(3), allowNull: false },
    caption: { type: DataTypes.STRING(120), allowNull: false },
    mediaId: DataTypes.UUID,
    sortOrder: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'city_snaps' }
);

const StreetFood = sequelize.define(
  'StreetFood',
  {
    id: { type: DataTypes.STRING(40), primaryKey: true },
    cityCode: { type: DataTypes.CHAR(3), allowNull: false },
    name: { type: DataTypes.STRING(120), allowNull: false },
    pronunciation: DataTypes.STRING(80),
    area: DataTypes.STRING(120),
    shortDescription: DataTypes.TEXT,
    description: DataTypes.TEXT,
    mediaId: DataTypes.UUID,
    priceRange: DataTypes.STRING(40),
    rating: { type: DataTypes.DECIMAL(2, 1), validate: { min: 0, max: 5 } },
    bestTime: DataTypes.STRING(60),
    isVegetarian: DataTypes.BOOLEAN,
    sortOrder: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'street_food' }
);

const StreetFoodVenue = sequelize.define(
  'StreetFoodVenue',
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    streetFoodId: { type: DataTypes.STRING(40), allowNull: false },
    venueName: { type: DataTypes.STRING(120), allowNull: false },
    sortOrder: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'street_food_venues' }
);

// Covers both "Culinary Landmarks" and "Fine Dine" - the brochure treats both as eateries.
const Venue = sequelize.define(
  'Venue',
  {
    id: { type: DataTypes.STRING(40), primaryKey: true },
    cityCode: { type: DataTypes.CHAR(3), allowNull: false },
    venueType: { type: DataTypes.ENUM('culinary_landmark', 'fine_dining'), allowNull: false },
    name: { type: DataTypes.STRING(120), allowNull: false },
    cuisine: DataTypes.STRING(80),
    shortDescription: DataTypes.TEXT,
    description: DataTypes.TEXT,
    mediaId: DataTypes.UUID,
    area: DataTypes.STRING(120),
    address: DataTypes.TEXT,
    timings: DataTypes.STRING(80),
    priceForTwo: DataTypes.STRING(40),
    rating: { type: DataTypes.DECIMAL(2, 1), validate: { min: 0, max: 5 } },
    reservationRequired: DataTypes.BOOLEAN,
    sortOrder: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'venues', indexes: [{ fields: ['city_code', 'venue_type'] }] }
);

const VenueHighlight = sequelize.define(
  'VenueHighlight',
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    venueId: { type: DataTypes.STRING(40), allowNull: false },
    dishName: { type: DataTypes.STRING(120), allowNull: false },
    sortOrder: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'venue_highlights' }
);

const Recipe = sequelize.define(
  'Recipe',
  {
    id: { type: DataTypes.STRING(40), primaryKey: true },
    cityCode: { type: DataTypes.CHAR(3), allowNull: false },
    name: { type: DataTypes.STRING(160), allowNull: false },
    shortDescription: DataTypes.TEXT,
    description: DataTypes.TEXT,
    mediaId: DataTypes.UUID,
    videoMediaId: DataTypes.UUID,
    contributorName: DataTypes.STRING(120),
    contributorOffice: DataTypes.STRING(120),
    prepTimeMinutes: DataTypes.SMALLINT,
    servings: DataTypes.SMALLINT,
    rank: DataTypes.SMALLINT,
  },
  { tableName: 'recipes', indexes: [{ unique: true, fields: ['city_code', 'rank'] }] }
);

const RecipeIngredient = sequelize.define(
  'RecipeIngredient',
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    recipeId: { type: DataTypes.STRING(40), allowNull: false },
    component: DataTypes.STRING(80),
    item: { type: DataTypes.TEXT, allowNull: false },
    sortOrder: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'recipe_ingredients' }
);

const RecipeStep = sequelize.define(
  'RecipeStep',
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    recipeId: { type: DataTypes.STRING(40), allowNull: false },
    stepNo: { type: DataTypes.SMALLINT, allowNull: false },
    instruction: { type: DataTypes.TEXT, allowNull: false },
  },
  { tableName: 'recipe_steps', indexes: [{ unique: true, fields: ['recipe_id', 'step_no'] }] }
);

// Everything else in /api/userProfile comes from JWT claims, so only the city choice persists.
const UserPreference = sequelize.define(
  'UserPreference',
  {
    userId: { type: DataTypes.STRING(80), primaryKey: true },
    selectedCityCode: DataTypes.CHAR(3),
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'user_preferences' }
);

const cityChildren = [MediaAsset, CitySnap, StreetFood, Venue, Recipe];
cityChildren.forEach((model) => {
  City.hasMany(model, { foreignKey: 'cityCode', onDelete: 'CASCADE' });
  model.belongsTo(City, { foreignKey: 'cityCode' });
});

City.hasOne(CityDetail, { foreignKey: 'cityCode', onDelete: 'CASCADE' });
CityDetail.belongsTo(City, { foreignKey: 'cityCode' });
CityDetail.belongsTo(MediaAsset, { as: 'banner', foreignKey: 'bannerMediaId' });
CityDetail.belongsTo(MediaAsset, { as: 'about', foreignKey: 'aboutMediaId' });

[CitySnap, StreetFood, Venue, Recipe].forEach((model) => {
  model.belongsTo(MediaAsset, { as: 'image', foreignKey: 'mediaId' });
});
Recipe.belongsTo(MediaAsset, { as: 'video', foreignKey: 'videoMediaId' });

StreetFood.hasMany(StreetFoodVenue, { as: 'mustTryAt', foreignKey: 'streetFoodId', onDelete: 'CASCADE' });
StreetFoodVenue.belongsTo(StreetFood, { foreignKey: 'streetFoodId' });

Venue.hasMany(VenueHighlight, { as: 'highlights', foreignKey: 'venueId', onDelete: 'CASCADE' });
VenueHighlight.belongsTo(Venue, { foreignKey: 'venueId' });

Recipe.hasMany(RecipeIngredient, { as: 'ingredients', foreignKey: 'recipeId', onDelete: 'CASCADE' });
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipeId' });

Recipe.hasMany(RecipeStep, { as: 'steps', foreignKey: 'recipeId', onDelete: 'CASCADE' });
RecipeStep.belongsTo(Recipe, { foreignKey: 'recipeId' });

UserPreference.belongsTo(City, { foreignKey: 'selectedCityCode' });

module.exports = {
  sequelize,
  City,
  CityDetail,
  CitySnap,
  MediaAsset,
  StreetFood,
  StreetFoodVenue,
  Venue,
  VenueHighlight,
  Recipe,
  RecipeIngredient,
  RecipeStep,
  UserPreference,
};
