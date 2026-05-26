import type { MealService } from '../services/mealService.js';
import type { AsyncRouteHandler } from '../middleware/asyncHandler.js';

export class MealController {
  constructor(private readonly mealService: MealService) {}

  searchMeals: AsyncRouteHandler = async (req, res) => {
    const meals = await this.mealService.searchMeals(String(req.query.q));
    res.status(200).json({ data: meals, meta: { query: req.query.q, total: meals.length } });
  };

  getRandomMeal: AsyncRouteHandler = async (_req, res) => {
    const meal = await this.mealService.getRandomMeal();
    res.status(200).json({ data: meal });
  };

  getCategories: AsyncRouteHandler = async (_req, res) => {
    const categories = await this.mealService.getCategories();
    res.status(200).json({ data: categories, meta: { total: categories.length } });
  };

  getMealsByCategory: AsyncRouteHandler = async (req, res) => {
    const meals = await this.mealService.getMealsByCategory(String(req.params.name));
    res.status(200).json({
      data: meals,
      meta: { category: req.params.name, total: meals.length }
    });
  };

  getMealById: AsyncRouteHandler = async (req, res) => {
    const meal = await this.mealService.getMealById(String(req.params.id));
    res.status(200).json({ data: meal });
  };
}
