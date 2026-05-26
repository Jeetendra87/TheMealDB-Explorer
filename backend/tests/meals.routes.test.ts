import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../src/app.js';
import type { Category, MealDetails, MealSummary } from '../src/types/meal.js';
import { MealService } from '../src/services/mealService.js';

const mealSummary: MealSummary = {
  id: '52772',
  name: 'Teriyaki Chicken Casserole',
  thumbnail: 'https://example.com/meal.jpg',
  category: 'Chicken',
  area: 'Japanese'
};

const mealDetails: MealDetails = {
  ...mealSummary,
  tags: ['Meat', 'Casserole'],
  instructions: 'Cook and enjoy.',
  source: 'https://example.com/source',
  youtube: 'https://www.youtube.com/watch?v=example',
  youtubeEmbed: 'https://www.youtube.com/embed/example',
  ingredients: [
    { name: 'soy sauce', measure: '3/4 cup' },
    { name: 'water', measure: '1/2 cup' }
  ]
};

const categories: Category[] = [
  {
    id: '1',
    name: 'Beef',
    thumbnail: 'https://example.com/beef.jpg',
    description: 'Beef dishes'
  }
];

class MockMealService {
  searchMeals = async () => [mealSummary];
  getRandomMeal = async () => mealDetails;
  getCategories = async () => categories;
  getMealsByCategory = async () => [mealSummary];
  getMealById = async () => mealDetails;
}

describe('Meal API routes', () => {
  const app = createApp({ mealService: new MockMealService() as unknown as MealService });

  it('returns health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('searches meals by query', async () => {
    const response = await request(app).get('/api/meals/search?q=chicken');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].name).toBe('Teriyaki Chicken Casserole');
  });

  it('validates search query length', async () => {
    const response = await request(app).get('/api/meals/search?q=a');

    expect(response.status).toBe(400);
  });

  it('returns categories and category meals', async () => {
    const categoriesResponse = await request(app).get('/api/categories');
    const mealsResponse = await request(app).get('/api/categories/Beef/meals');

    expect(categoriesResponse.status).toBe(200);
    expect(categoriesResponse.body.data[0].name).toBe('Beef');
    expect(mealsResponse.status).toBe(200);
    expect(mealsResponse.body.meta.category).toBe('Beef');
  });

  it('returns meal details by id', async () => {
    const response = await request(app).get('/api/meals/52772');

    expect(response.status).toBe(200);
    expect(response.body.data.ingredients).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'soy sauce' })])
    );
  });

  it('returns a random meal', async () => {
    const response = await request(app).get('/api/meals/random');

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('Teriyaki Chicken Casserole');
  });
});
