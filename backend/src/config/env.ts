import dotenv from 'dotenv';

dotenv.config();

const numberFromEnv = (key: string, fallback: number): number => {
  const raw = process.env[key];
  if (!raw) return fallback;

  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: numberFromEnv('PORT', 4000),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  mealDbApiKey: process.env.THEMEALDB_API_KEY || '1',
  mealDbBaseUrl: process.env.THEMEALDB_BASE_URL || 'https://www.themealdb.com/api/json/v1',
  mealDbTimeoutMs: numberFromEnv('THEMEALDB_TIMEOUT_MS', 8000),
  cacheDefaultTtlSeconds: numberFromEnv('CACHE_DEFAULT_TTL_SECONDS', 300),
  cacheMaxItems: numberFromEnv('CACHE_MAX_ITEMS', 250),
  rateLimitWindowMs: numberFromEnv('RATE_LIMIT_WINDOW_MS', 60_000),
  rateLimitMax: numberFromEnv('RATE_LIMIT_MAX', 120)
};

export const isProduction = env.nodeEnv === 'production';
