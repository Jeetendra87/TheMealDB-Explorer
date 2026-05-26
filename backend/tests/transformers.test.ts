import { describe, expect, it } from '@jest/globals';
import { toMealDetails } from '../src/services/mealTransformers.js';

describe('meal transformers', () => {
  it('maps ingredients and youtube embed url', () => {
    const meal = toMealDetails({
      idMeal: '1',
      strMeal: 'Test Meal',
      strMealThumb: 'thumb.jpg',
      strCategory: 'Dessert',
      strArea: 'British',
      strTags: 'Sweet,Cake',
      strInstructions: 'Bake it.',
      strSource: 'https://example.com',
      strYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      strIngredient1: 'flour',
      strMeasure1: '2 cups'
    });

    expect(meal.ingredients).toEqual([{ name: 'flour', measure: '2 cups' }]);
    expect(meal.youtubeEmbed).toContain('youtube.com/embed/');
    expect(meal.tags).toEqual(['Sweet', 'Cake']);
  });
});
