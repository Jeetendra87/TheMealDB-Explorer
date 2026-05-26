import { Router } from 'express';
import type { MealController } from '../controllers/mealController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireMealId, requireSearchQuery } from '../middleware/validate.js';

export const createMealRoutes = (mealController: MealController): Router => {
  const router = Router();

  router.get('/search', requireSearchQuery, asyncHandler(mealController.searchMeals));
  router.get('/random', asyncHandler(mealController.getRandomMeal));
  router.get('/:id', requireMealId, asyncHandler(mealController.getMealById));

  return router;
};
