import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

class validate {
  public static schema<T>(validator: ZodSchema<T>) {
    return async (req: Request, _: Response, next: NextFunction) => {
      try {
        const data = await validator.parseAsync(req.body);
        req.body = data;

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export { validate };
