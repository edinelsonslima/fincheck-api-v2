import { IRequest, IResponse } from '@interfaces/express';
import { env } from 'app/settings';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ZodSchema, z } from 'zod';

interface IAuthorizationPayload {
  userId: string;
  iat: number;
  exp: number;
}
class validate {
  public static body<T>(validator: ZodSchema<T>) {
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
        return this.handleZodError(err, res);
      }
    };
  }

  public static param<T>(validator: ZodSchema<T>) {
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
        return this.handleZodError(err, res);
      }
    };
  }

  public static query<T>(validator: ZodSchema<T>) {
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
        return this.handleZodError(err, res);
      }
    };
  }

  public static authorization() {
    return (req: IRequest, res: IResponse, next: NextFunction) => {
      try {
        const token = this.getAuthorizationToken(req);

        if (!token) {
          return res.status(401).json({ message: 'unauthorized' });
        }

        const payload = verify(token, env.JWT_SECRET) as IAuthorizationPayload;

        if (!payload) {
          return res.status(401).json({ message: 'unauthorized' });
        }

        req['userId'] = payload.userId;

        return next();
      } catch {
        return res.status(401).json({ message: 'unauthorized' });
      }
    };
  }

  private static getAuthorizationToken = (req: IRequest) => {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };

  private static handleZodError = (err: any, res: IResponse) => {
    if (!(err instanceof z.ZodError)) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const message = err.errors.reduce((acc, err) => {
      return { ...acc, [err.path.toString()]: err.message };
    }, {});

    return res.status(400).json(message);
  };
}

export { validate };
