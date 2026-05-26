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

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, string | number | null>;
}

export interface ApiErrorPayload {
  error: {
    message: string;
    status: number;
  };
}
