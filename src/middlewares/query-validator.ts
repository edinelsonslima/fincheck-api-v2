import { IRequest, IResponse } from '@interfaces/express';
import { NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { handleZodError } from './helpers';

export function queryValidator<T>(validator: ZodSchema<T>) {
  return async (
    req: IRequest<unknown, unknown, T>,
    res: IResponse,
    next: NextFunction
  ) => {
    try {
      const data = await validator.parseAsync(req.query);
      req.query = data;

      return next();
    } catch (err) {
      return handleZodError(err, res);
    }
  };
}
