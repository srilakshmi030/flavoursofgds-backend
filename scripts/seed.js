// Creates the schema and loads Bengaluru from scripts/city-source-content/blr.js.
// Local Docker only - add sequelize-cli migrations before any shared environment.
// Usage: node scripts/seed.js [cityCode ...]   (defaults to blr)
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const db = require('../src/models');

const splitList = (value) =>
  (value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const SCREEN_TO_VENUE_TYPE = {
  Landmarks: 'culinary_landmark',
  'Fine Dine': 'fine_dining',
};

async function seedCity(source) {
  const { cityCode, cityName, state, country } = source;

  await db.City.upsert({ cityCode, name: cityName, state, country, isActive: true });

  // Insert every asset first so content rows can reference them by id.
  const mediaByPath = new Map();
  for (const spread of source.spreads) {
    for (const item of spread.items) {
      for (const img of item.images) {
        const [asset] = await db.MediaAsset.findOrCreate({
          where: { path: img.file },
          defaults: {
            cityCode,
            path: img.file,
            mediaType: path.extname(img.file) === '.mp4' ? 'video' : 'image',
            role: img.role,
            subject: img.subject,
            status: img.status === 'In PDF' ? 'ready' : 'missing',
            notes: img.notes,
          },
        });
        mediaByPath.set(img.file, asset.id);
      }
    }
  }

  const detail = { cityCode };
  let streetFoodOrder = 0;
  let venueOrder = 0;

  for (const spread of source.spreads) {
    for (const item of spread.items) {
      const mediaId = mediaByPath.get(item.images[0].file);

      if (spread.screen === 'City Intro') {
        detail.introDescription = item.description;
        detail.bannerMediaId = mediaId;
      } else if (spread.screen === 'City Dashboard') {
        detail.aboutTitle = item.name;
        detail.aboutDescription = item.description;
        detail.aboutMediaId = mediaId;
      } else if (spread.screen === 'Street Food') {
        await db.StreetFood.upsert({
          id: item.id,
          cityCode,
          name: item.name,
          pronunciation: item.pronunciation,
          description: item.description,
          mediaId,
          sortOrder: streetFoodOrder++,
        });
        await db.StreetFoodVenue.destroy({ where: { streetFoodId: item.id } });
        await db.StreetFoodVenue.bulkCreate(
          splitList(item.whereToTry).map((venueName, i) => ({
            streetFoodId: item.id,
            venueName,
            sortOrder: i,
          }))
        );
      } else if (SCREEN_TO_VENUE_TYPE[spread.screen]) {
        await db.Venue.upsert({
          id: item.id,
          cityCode,
          venueType: SCREEN_TO_VENUE_TYPE[spread.screen],
          name: item.name,
          description: item.description,
          mediaId,
          sortOrder: venueOrder++,
        });
        await db.VenueHighlight.destroy({ where: { venueId: item.id } });
        await db.VenueHighlight.bulkCreate(
          splitList(item.highlights).map((dishName, i) => ({
            venueId: item.id,
            dishName,
            sortOrder: i,
          }))
        );
      } else if (spread.screen === 'Recipe') {
        const [name, office] = (item.contributor || '').split(',').map((s) => s.trim());
        const video = item.images.find((img) => img.file.endsWith('.mp4'));
        await db.Recipe.upsert({
          id: item.id,
          cityCode,
          name: item.name,
          description: item.description,
          mediaId,
          videoMediaId: video ? mediaByPath.get(video.file) : null,
          contributorName: name || null,
          contributorOffice: office || null,
          servings: item.servings || null,
          rank: 1,
        });
      }
    }
  }

  await db.CityDetail.upsert(detail);

  return {
    media: await db.MediaAsset.count({ where: { cityCode } }),
    missing: await db.MediaAsset.count({ where: { cityCode, status: 'missing' } }),
    streetFood: await db.StreetFood.count({ where: { cityCode } }),
    venues: await db.Venue.count({ where: { cityCode } }),
    recipes: await db.Recipe.count({ where: { cityCode } }),
  };
}

async function main() {
  const codes = process.argv.slice(2).length ? process.argv.slice(2) : ['blr'];

  await db.sequelize.authenticate();
  await db.sequelize.sync();

  for (const code of codes) {
    const file = path.join(__dirname, 'city-source-content', `${code.toLowerCase()}.js`);
    if (!fs.existsSync(file)) throw new Error(`No content file for "${code}". Expected ${file}`);
    const counts = await seedCity(require(file));
    console.log(`${code}:`, counts);
  }

  await db.sequelize.close();
}

main().catch(async (err) => {
  console.error(err.message);
  await db.sequelize.close().catch(() => {});
  process.exit(1);
});
