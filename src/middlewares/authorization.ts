import { IRequest, IResponse } from '@interfaces/express';
import { AuthorizationError } from 'errors/authorization-error';
import { NextFunction } from 'express';
import { getAuthorizationToken, verifyToken } from './helpers';

export function authorization() {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    const token = getAuthorizationToken(req);

    if (!token) {
      throw new AuthorizationError('unauthorized');
    }

    const payload = verifyToken(token);

    if (!payload) {
      throw new AuthorizationError('unauthorized');
    }

    req['userId'] = payload.userId;

    return next();
  };
}
