import axios, { AxiosError, type AxiosInstance } from 'axios';
import { env } from '../config/env.js';
import { HttpError } from '../utils/httpError.js';

export class MealDbClient {
  private readonly client: AxiosInstance;

  constructor(client?: AxiosInstance) {
    this.client =
      client ??
      axios.create({
        baseURL: `${env.mealDbBaseUrl}/${env.mealDbApiKey}`,
        timeout: env.mealDbTimeoutMs
      });
  }

  async get<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
    try {
      const { data } = await this.client.get<T>(path, { params });
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.code === 'ECONNABORTED') {
        throw new HttpError(504, 'TheMealDB request timed out.');
      }

      throw new HttpError(502, 'Unable to fetch meal data from TheMealDB.');
    }
  }
}
