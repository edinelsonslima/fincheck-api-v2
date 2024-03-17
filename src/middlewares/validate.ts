import { IRequest, IResponse } from '@interfaces/express';
import { NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { handleZodError } from './helpers';

export function validate(
  field: keyof Pick<IRequest, 'params' | 'body' | 'query'>,
  validator: ZodSchema
) {
  return async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      req[field] = await validator.parseAsync(req.body);

      return next();
    } catch (err) {
      return handleZodError(err);
    }
  };
}
