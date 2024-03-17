import { IRequest, IResponse } from '@interfaces/express';
import { NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { handleZodError } from './helpers';

export function paramValidator<T>(validator: ZodSchema<T>) {
  return async (
    req: IRequest<unknown, T, unknown>,
    res: IResponse,
    next: NextFunction
  ) => {
    try {
      const data = await validator.parseAsync(req.params);
      req.params = data;

      return next();
    } catch (err) {
      return handleZodError(err, res);
    }
  };
}
