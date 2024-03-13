import { env } from 'app/settings';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ZodSchema, z } from 'zod';

class validate {
  public static schema<T>(validator: ZodSchema<T>) {
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

  public static jwt() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = this.getAuthorizationToken(req);

        if (!token) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const verified = verify(token, env.JWT_SECRET);

        if (!verified) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        req['userId'] = token;

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
