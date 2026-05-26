import type { RequestHandler } from 'express';
import { HttpError } from '../utils/httpError.js';

const idPattern = /^\d+$/;

export const requireSearchQuery: RequestHandler = (req, _res, next) => {
  const query = String(req.query.q || '').trim();

  if (!query || query.length < 2) {
    next(new HttpError(400, 'Search query parameter "q" must be at least 2 characters.'));
    return;
  }

  req.query.q = query;
  next();
};

export const requireCategoryName: RequestHandler = (req, _res, next) => {
  const name = String(req.params.name || '').trim();

  if (!name) {
    next(new HttpError(400, 'Category name is required.'));
    return;
  }

  req.params.name = name;
  next();
};

export const requireMealId: RequestHandler = (req, _res, next) => {
  const id = String(req.params.id || '').trim();

  if (!idPattern.test(id)) {
    next(new HttpError(400, 'Meal id must be numeric.'));
    return;
  }

  req.params.id = id;
  next();
};
