const CITY_CONTENT = require('../data/cityContent');

// Own-property lookup keeps user-supplied city codes from reaching Object.prototype keys.
function getCityContent(cityCode) {
  const key = String(cityCode || '').toLowerCase();
  return Object.prototype.hasOwnProperty.call(CITY_CONTENT, key) ? CITY_CONTENT[key] : null;
}

function findItemById(collection, id) {
  for (const city of Object.values(CITY_CONTENT)) {
    const match = (city[collection] || []).find((item) => item.id === id);
    if (match) {
      return { ...match, cityCode: city.cityCode, cityName: city.cityName };
    }
  }
  return null;
}

module.exports = { getCityContent, findItemById };
