import { env } from 'app/settings';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ZodSchema, z } from 'zod';

interface IAuthorizationPayload {
  userId: string;
  iat: number;
  exp: number;
}
class validate {
  public static body<T>(validator: ZodSchema<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await validator.parseAsync(req.body);
        req.body = data;

        next();
      } catch (err) {
        if (!(err instanceof z.ZodError)) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(400).json({
          message: err.errors.reduce((acc, err) => {
            return { ...acc, [err.path.toString()]: err.message };
          }, {}),
        });
      }
    };
  }

  public static param<T>(validator: ZodSchema<T>) {
    return async (req: Request<T>, res: Response, next: NextFunction) => {
      try {
        const data = await validator.parseAsync(req.params);
        req.params = data;

        next();
      } catch (err) {
        if (!(err instanceof z.ZodError)) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(400).json({
          message: err.errors.reduce((acc, err) => {
            return { ...acc, [err.path.toString()]: err.message };
          }, {}),
        });
      }
    };
  }

  public static authorization() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = this.getAuthorizationToken(req);

        if (!token) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const payload = verify(token, env.JWT_SECRET) as IAuthorizationPayload;

        if (!payload) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        req['userId'] = payload.userId;

        next();
      } catch {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    };
  }

  private static getAuthorizationToken = (req: Request) => {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
}

export { validate };
