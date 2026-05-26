import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { MemoryCache } from './cache/memoryCache.js';
import { env, isProduction } from './config/env.js';
import { HealthController } from './controllers/healthController.js';
import { MealController } from './controllers/mealController.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { createApiRouter } from './routes/index.js';
import { MealDbClient } from './services/mealDbClient.js';
import { MealService } from './services/mealService.js';

interface AppDependencies {
  mealService?: MealService;
  cache?: MemoryCache;
}

export const createApp = (dependencies: AppDependencies = {}) => {
  const app = express();
  const cache = dependencies.cache ?? new MemoryCache(env.cacheMaxItems);
  const mealService = dependencies.mealService ?? new MealService(new MealDbClient(), cache);
  const mealController = new MealController(mealService);
  const healthController = new HealthController(cache);

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin: env.frontendUrl,
      credentials: true
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan(isProduction ? 'combined' : 'dev'));
  app.use(
    rateLimit({
      windowMs: env.rateLimitWindowMs,
      max: env.rateLimitMax,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        error: {
          message: 'Too many requests. Please try again shortly.',
          status: 429
        }
      }
    })
  );

  app.get('/', (_req, res) => {
    res.status(200).json({
      name: 'TheMealDB Explorer API',
      version: '1.0.0',
      docs: '/api/health'
    });
  });

  app.use('/api', createApiRouter(mealController, healthController));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
