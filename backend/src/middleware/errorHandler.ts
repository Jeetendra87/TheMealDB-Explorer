import type { ErrorRequestHandler, RequestHandler } from 'express';
import { isProduction } from '../config/env.js';
import { HttpError } from '../utils/httpError.js';

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found.',
      status: 404
    }
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message = error instanceof HttpError ? error.message : 'Unexpected server error.';

  if (!isProduction) {
    console.error(error);
  }

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      ...(!isProduction && error instanceof Error ? { stack: error.stack } : {})
    }
  });
};
