const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const TOKEN_KEY = 'fogds.token';

// sessionStorage keeps the test token out of long-lived browser storage.
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

const CITY_NAME_KEY = 'fogds.cityName';

export function rememberCityName(name) {
  sessionStorage.setItem(CITY_NAME_KEY, name);
}

export function getRememberedCityName() {
  return sessionStorage.getItem(CITY_NAME_KEY);
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { Accept: 'application/json' };
  if (body) headers['Content-Type'] = 'application/json';

  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) clearToken();
    throw new ApiError(payload.message || 'Request failed', response.status);
  }

  return payload;
}

export const api = {
  devLogin: (username, password) =>
    request('/api/auth/dev-login', { method: 'POST', body: { username, password }, auth: false }),
  listCities: () => request('/api/cities'),
  selectCity: (cityId) => request('/api/cities/select', { method: 'POST', body: { cityId } }),
  dashboard: (code) => request(`/api/cities/${code}/dashboard`),
  streetFood: (code) => request(`/api/cities/${code}/street-food`),
  landmarks: (code) => request(`/api/cities/${code}/landmarks`),
  fineDining: (code) => request(`/api/cities/${code}/fine-dining`),
  recipes: (code) => request(`/api/cities/${code}/recipes`),
  topRecipes: (code) => request(`/api/cities/${code}/top-recipes`),
  winningRecipes: (code) => request(`/api/cities/${code}/winningRecipes`),
  photos: (code) => request(`/api/cities/${code}/photos`),
  videos: (code) => request(`/api/cities/${code}/videos`),
  streetFoodItem: (id) => request(`/api/street-food/${id}`),
  landmark: (id) => request(`/api/landmarks/${id}`),
  restaurant: (id) => request(`/api/restaurants/${id}`),
  recipe: (id) => request(`/api/recipes/${id}`),
  userProfile: () => request('/api/userProfile'),
};

// Cities that already have content in the backend.
export const SUPPORTED_CITY_CODES = ['blr', 'maa', 'hyd'];
