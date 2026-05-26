import type { RequestHandler } from 'express';
import type { MemoryCache } from '../cache/memoryCache.js';

export class HealthController {
  constructor(private readonly cache: MemoryCache) {}

  getHealth: RequestHandler = (_req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      cache: this.cache.stats()
    });
  };
}
