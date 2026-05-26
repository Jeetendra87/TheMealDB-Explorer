import { env } from '../config/env.js';
import type { MemoryCache } from '../cache/memoryCache.js';
import type { Category, MealDbCategory, MealDbMeal, MealDetails, MealSummary } from '../types/meal.js';
import { HttpError } from '../utils/httpError.js';
import { MealDbClient } from './mealDbClient.js';
import { toCategory, toMealDetails, toMealSummary } from './mealTransformers.js';

interface MealListResponse {
  meals: MealDbMeal[] | null;
}

interface CategoriesResponse {
  categories: MealDbCategory[] | null;
}

const ttl = {
  search: 5 * 60,
  random: 60,
  categories: 30 * 60,
  categoryMeals: 15 * 60,
  details: 30 * 60
};

export class MealService {
  constructor(
    private readonly client: MealDbClient,
    private readonly cache: MemoryCache
  ) {}

  async searchMeals(query: string): Promise<MealSummary[]> {
    const normalizedQuery = query.trim();
    const data = await this.cached<MealListResponse>(
      `search:${normalizedQuery.toLowerCase()}`,
      ttl.search,
      () => this.client.get<MealListResponse>('search.php', { s: normalizedQuery })
    );

    return (data.meals || []).map(toMealSummary);
  }

  async getRandomMeal(): Promise<MealDetails | null> {
    const data = await this.cached<MealListResponse>(
      `random:${Math.floor(Date.now() / (ttl.random * 1000))}`,
      ttl.random,
      () => this.client.get<MealListResponse>('random.php')
    );

    return data.meals?.[0] ? toMealDetails(data.meals[0]) : null;
  }

  async getCategories(): Promise<Category[]> {
    const data = await this.cached<CategoriesResponse>(
      'categories',
      ttl.categories,
      () => this.client.get<CategoriesResponse>('categories.php')
    );

    return (data.categories || []).map(toCategory);
  }

  async getMealsByCategory(name: string): Promise<MealSummary[]> {
    const data = await this.cached<MealListResponse>(
      `category:${name.toLowerCase()}`,
      ttl.categoryMeals,
      () => this.client.get<MealListResponse>('filter.php', { c: name })
    );

    return (data.meals || []).map(toMealSummary);
  }

  async getMealById(id: string): Promise<MealDetails> {
    const data = await this.cached<MealListResponse>(
      `meal:${id}`,
      ttl.details,
      () => this.client.get<MealListResponse>('lookup.php', { i: id })
    );

    const meal = data.meals?.[0];
    if (!meal) {
      throw new HttpError(404, 'Meal not found.');
    }

    return toMealDetails(meal);
  }

  private async cached<T>(key: string, ttlSeconds: number, load: () => Promise<T>): Promise<T> {
    const cached = this.cache.get<T>(key);
    if (cached) return cached;

    const value = await load();
    this.cache.set(key, value, ttlSeconds || env.cacheDefaultTtlSeconds);
    return value;
  }
}
