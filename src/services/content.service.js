// Reads city content from PostgreSQL and shapes it into the JSON the app screens expect.
const env = require('../config/env');
const db = require('../models');

const {
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
} = db;

// Paths are stored relative so the media host stays environment-specific.
const mediaUrl = (asset) => (asset && asset.path ? `${env.blobBaseUrl}/${asset.path}` : null);

/** Detail screens iterate the details object, so empty keys must not appear at all. */
function compact(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined || v === '') return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    })
  );
}

const num = (v) => (v === null || v === undefined ? null : Number(v));
const normalise = (code) => String(code || '').toLowerCase();

const imageInclude = { model: MediaAsset, as: 'image' };

const STREET_FOOD_INCLUDE = [
  imageInclude,
  { model: StreetFoodVenue, as: 'mustTryAt', separate: true, order: [['sortOrder', 'ASC']] },
];

const VENUE_INCLUDE = [
  imageInclude,
  { model: VenueHighlight, as: 'highlights', separate: true, order: [['sortOrder', 'ASC']] },
];

const RECIPE_INCLUDE = [
  imageInclude,
  { model: MediaAsset, as: 'video' },
  { model: RecipeIngredient, as: 'ingredients', separate: true, order: [['sortOrder', 'ASC']] },
  { model: RecipeStep, as: 'steps', separate: true, order: [['stepNo', 'ASC']] },
];

function mapStreetFood(row) {
  return {
    id: row.id,
    name: row.name,
    pronunciation: row.pronunciation,
    area: row.area,
    shortDescription: row.shortDescription,
    imageUrl: mediaUrl(row.image),
    priceRange: row.priceRange,
    rating: num(row.rating),
    details: compact({
      description: row.description,
      mustTryAt: (row.mustTryAt || []).map((v) => v.venueName),
      bestTime: row.bestTime,
      vegetarian: row.isVegetarian,
    }),
  };
}

function mapVenue(row) {
  return {
    id: row.id,
    name: row.name,
    cuisine: row.cuisine,
    area: row.area,
    shortDescription: row.shortDescription,
    imageUrl: mediaUrl(row.image),
    priceForTwo: row.priceForTwo,
    rating: num(row.rating),
    details: compact({
      description: row.description,
      address: row.address,
      timings: row.timings,
      signatureDishes: (row.highlights || []).map((h) => h.dishName),
      reservationRequired: row.reservationRequired,
    }),
  };
}

function mapRecipe(row) {
  return {
    id: row.id,
    name: row.name,
    shortDescription: row.shortDescription,
    imageUrl: mediaUrl(row.image),
    contributor: [row.contributorName, row.contributorOffice].filter(Boolean).join(', ') || null,
    prepTimeMinutes: row.prepTimeMinutes,
    rank: row.rank,
    details: compact({
      servings: row.servings,
      ingredients: (row.ingredients || []).map((i) => i.item),
      steps: (row.steps || []).map((s) => s.instruction),
      videoUrl: mediaUrl(row.video),
    }),
  };
}

async function getCity(cityCode) {
  return City.findByPk(normalise(cityCode));
}

async function getDashboard(cityCode) {
  const code = normalise(cityCode);

  const [detail, snaps] = await Promise.all([
    CityDetail.findByPk(code, {
      include: [
        { model: MediaAsset, as: 'banner' },
        { model: MediaAsset, as: 'about' },
      ],
    }),
    CitySnap.findAll({
      where: { cityCode: code },
      include: [imageInclude],
      order: [['sortOrder', 'ASC']],
    }),
  ]);

  return {
    bannerUrl: mediaUrl(detail?.banner),
    intro: detail?.introDescription || null,
    about: {
      title: detail?.aboutTitle || null,
      description: detail?.aboutDescription || null,
      imageUrl: mediaUrl(detail?.about),
    },
    citySnaps: snaps.map((s) => ({
      id: s.id,
      caption: s.caption,
      imageUrl: mediaUrl(s.image),
    })),
    topRecipesTeaser: {
      title: detail?.topRecipesTitle || 'Top 3 Recipes of the city',
      description: detail?.topRecipesDescription || null,
    },
  };
}

const COLLECTIONS = {
  streetFood: async (code) =>
    (
      await StreetFood.findAll({
        where: { cityCode: code },
        include: STREET_FOOD_INCLUDE,
        order: [['sortOrder', 'ASC']],
      })
    ).map(mapStreetFood),

  landmarks: async (code) =>
    (
      await Venue.findAll({
        where: { cityCode: code, venueType: 'culinary_landmark' },
        include: VENUE_INCLUDE,
        order: [['sortOrder', 'ASC']],
      })
    ).map(mapVenue),

  fineDining: async (code) =>
    (
      await Venue.findAll({
        where: { cityCode: code, venueType: 'fine_dining' },
        include: VENUE_INCLUDE,
        order: [['sortOrder', 'ASC']],
      })
    ).map(mapVenue),

  recipes: async (code) =>
    (
      await Recipe.findAll({
        where: { cityCode: code },
        include: RECIPE_INCLUDE,
        order: [['rank', 'ASC']],
      })
    ).map(mapRecipe),

  photos: async (code) =>
    (
      await MediaAsset.findAll({ where: { cityCode: code, mediaType: 'image', role: 'gallery_photo' } })
    ).map((a) => ({ id: a.id, title: a.subject, imageUrl: mediaUrl(a), sizeKb: a.sizeKb })),

  videos: async (code) =>
    (
      await MediaAsset.findAll({ where: { cityCode: code, mediaType: 'video', role: 'gallery_video' } })
    ).map((a) => ({
      id: a.id,
      title: a.subject,
      videoUrl: mediaUrl(a),
      durationSeconds: a.durationSeconds,
    })),
};

async function getCollection(cityCode, name) {
  const loader = COLLECTIONS[name];
  if (!loader) throw new Error(`Unknown collection '${name}'`);
  return loader(normalise(cityCode));
}

const ITEM_SOURCES = {
  streetFood: { model: StreetFood, include: STREET_FOOD_INCLUDE, map: mapStreetFood },
  landmarks: { model: Venue, include: VENUE_INCLUDE, map: mapVenue },
  fineDining: { model: Venue, include: VENUE_INCLUDE, map: mapVenue },
  recipes: { model: Recipe, include: RECIPE_INCLUDE, map: mapRecipe },
};

async function findItemById(collection, id) {
  const source = ITEM_SOURCES[collection];
  if (!source) return null;

  const row = await source.model.findByPk(id, {
    include: [...source.include, { model: City }],
  });
  if (!row) return null;

  return {
    ...source.map(row),
    cityCode: row.cityCode,
    cityName: row.City?.name || null,
  };
}

module.exports = { getCity, getDashboard, getCollection, findItemById };
