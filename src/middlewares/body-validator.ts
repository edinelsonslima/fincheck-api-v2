import { IRequest, IResponse } from '@interfaces/express';
import { NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { handleZodError } from './helpers';

export function bodyValidator<T>(validator: ZodSchema<T>) {
  return async (
    req: IRequest<T, unknown, unknown>,
    res: IResponse,
    next: NextFunction
  ) => {
    try {
      const data = await validator.parseAsync(req.body);
      req.body = data;

      return next();
    } catch (err) {
      return handleZodError(err, res);
    }
  };
}
