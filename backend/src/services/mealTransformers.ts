import type { Category, Ingredient, MealDbCategory, MealDbMeal, MealDetails, MealSummary } from '../types/meal.js';

const clean = (value?: string | null): string => value?.trim() || '';

export const getYoutubeEmbedUrl = (url?: string | null): string | null => {
  if (!url) return null;

  try {
    const videoUrl = new URL(url);
    let videoId = videoUrl.searchParams.get('v');

    if (!videoId && videoUrl.hostname.includes('youtu.be')) {
      videoId = videoUrl.pathname.slice(1);
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
};

export const toIngredients = (meal: MealDbMeal): Ingredient[] =>
  Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    const name = clean(meal[`strIngredient${number}`]);
    const measure = clean(meal[`strMeasure${number}`]);

    return name ? { name, measure } : null;
  }).filter((ingredient): ingredient is Ingredient => ingredient !== null);

export const toMealSummary = (meal: MealDbMeal): MealSummary => ({
  id: meal.idMeal,
  name: meal.strMeal,
  thumbnail: meal.strMealThumb,
  category: clean(meal.strCategory) || null,
  area: clean(meal.strArea) || null
});

export const toMealDetails = (meal: MealDbMeal): MealDetails => ({
  ...toMealSummary(meal),
  tags: meal.strTags ? meal.strTags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
  instructions: meal.strInstructions || '',
  source: clean(meal.strSource) || null,
  youtube: clean(meal.strYoutube) || null,
  youtubeEmbed: getYoutubeEmbedUrl(meal.strYoutube),
  ingredients: toIngredients(meal)
});

export const toCategory = (category: MealDbCategory): Category => ({
  id: category.idCategory,
  name: category.strCategory,
  thumbnail: category.strCategoryThumb,
  description: category.strCategoryDescription
});
