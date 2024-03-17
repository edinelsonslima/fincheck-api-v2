import { IRequest, IResponse } from '@interfaces/express';
import { env } from 'app/settings';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getAuthorizationToken } from './helpers';

interface IAuthorizationPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function authorization() {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      const token = getAuthorizationToken(req);

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
