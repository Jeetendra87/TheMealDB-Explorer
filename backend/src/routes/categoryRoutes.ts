import { Router } from 'express';
import type { MealController } from '../controllers/mealController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireCategoryName } from '../middleware/validate.js';

export const createCategoryRoutes = (mealController: MealController): Router => {
  const router = Router();

  router.get('/', asyncHandler(mealController.getCategories));
  router.get('/:name/meals', requireCategoryName, asyncHandler(mealController.getMealsByCategory));

  return router;
};
