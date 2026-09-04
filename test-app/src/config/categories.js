import { api } from '../api/client';

export const CATEGORIES = {
  'street-food': {
    title: 'Street Food',
    intro: 'Carts, counters and corner stalls the city queues up for.',
    load: (code) => api.streetFood(code),
    listKey: 'streetFood',
    itemType: 'street-food',
  },
  landmarks: {
    title: 'Landmarks',
    intro: 'Monuments, markets and green spaces worth the detour.',
    load: (code) => api.landmarks(code),
    listKey: 'landmarks',
    itemType: 'landmarks',
  },
  'fine-dining': {
    title: 'Fine Dine',
    intro: 'Sit-down kitchens for a longer, slower meal.',
    load: (code) => api.fineDining(code),
    listKey: 'restaurants',
    itemType: 'restaurants',
  },
  recipes: {
    title: 'Recipe',
    intro: 'Dishes shared by EY GDS colleagues, step by step.',
    load: (code) => api.recipes(code),
    listKey: 'recipes',
    itemType: 'recipes',
  },
};

export const ITEM_LOADERS = {
  'street-food': (id) => api.streetFoodItem(id),
  landmarks: (id) => api.landmark(id),
  restaurants: (id) => api.restaurant(id),
  recipes: (id) => api.recipe(id),
};
