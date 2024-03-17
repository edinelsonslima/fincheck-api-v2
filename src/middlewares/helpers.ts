import { enStatusCode } from '@enums/status-code';
import { IRequest } from '@interfaces/express';
import { env } from 'app/settings';
import { AuthorizationError } from 'errors/authorization-error';
import { ValidatorError } from 'errors/validator-error';
import { verify } from 'jsonwebtoken';
import { z } from 'zod';

interface IAuthorizationPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function getAuthorizationToken(req: IRequest) {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' && token !== 'null' ? token : undefined;
}

export function handleZodError(err: any) {
  if (!(err instanceof z.ZodError)) {
    console.error(err);
    throw new ValidatorError('internal server error');
  }

  const message = err.errors.reduce((acc, err) => {
    return { ...acc, [err.path.toString()]: err.message };
  }, {});

  throw new ValidatorError(
    'validation error',
    enStatusCode.BAD_REQUEST,
    message
  );
}

export function verifyToken(token: string) {
  try {
    return verify(token, env.JWT_SECRET) as IAuthorizationPayload;
  } catch (error) {
    console.error(error);
    throw new AuthorizationError('unauthorized');
  }
}
