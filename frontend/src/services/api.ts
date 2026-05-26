import axios, { AxiosError } from 'axios';
import type { ApiErrorPayload, ApiResponse, Category, MealDetails, MealSummary } from '@/types/meal';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10_000
});

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    return payload?.error?.message || 'Unable to load data right now.';
  }

  return 'Unexpected error. Please try again.';
};

export const handleApiError = (error: unknown): string => getErrorMessage(error);

export const searchMeals = async (query: string): Promise<MealSummary[]> => {
  const { data } = await api.get<ApiResponse<MealSummary[]>>('/meals/search', {
    params: { q: query }
  });
  return data.data;
};

export const getRandomMeal = async (): Promise<MealDetails | null> => {
  const { data } = await api.get<ApiResponse<MealDetails | null>>('/meals/random');
  return data.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<ApiResponse<Category[]>>('/categories');
  return data.data;
};

export const getMealsByCategory = async (name: string): Promise<MealSummary[]> => {
  const { data } = await api.get<ApiResponse<MealSummary[]>>(`/categories/${encodeURIComponent(name)}/meals`);
  return data.data;
};

export const getMealById = async (id: string): Promise<MealDetails> => {
  const { data } = await api.get<ApiResponse<MealDetails>>(`/meals/${id}`);
  return data.data;
};
