import { Router } from 'express';
import type { HealthController } from '../controllers/healthController.js';
import type { MealController } from '../controllers/mealController.js';
import { createCategoryRoutes } from './categoryRoutes.js';
import { createMealRoutes } from './mealRoutes.js';

export const createApiRouter = (
  mealController: MealController,
  healthController: HealthController
): Router => {
  const router = Router();

  router.get('/health', healthController.getHealth);
  router.use('/meals', createMealRoutes(mealController));
  router.use('/categories', createCategoryRoutes(mealController));

  return router;
};
