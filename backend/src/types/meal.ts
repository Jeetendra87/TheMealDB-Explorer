export interface MealSummary {
  id: string;
  name: string;
  thumbnail: string;
  category: string | null;
  area: string | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface MealDetails extends MealSummary {
  tags: string[];
  instructions: string;
  source: string | null;
  youtube: string | null;
  youtubeEmbed: string | null;
  ingredients: Ingredient[];
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export interface MealDbMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string | null;
  strArea?: string | null;
  strTags?: string | null;
  strInstructions?: string | null;
  strSource?: string | null;
  strYoutube?: string | null;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

export interface MealDbCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
