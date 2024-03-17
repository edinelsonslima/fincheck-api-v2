import { IRequest, IResponse } from '@interfaces/express';
import { z } from 'zod';

export function getAuthorizationToken(req: IRequest) {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export function handleZodError(err: any, res: IResponse) {
  if (!(err instanceof z.ZodError)) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  const message = err.errors.reduce((acc, err) => {
    return { ...acc, [err.path.toString()]: err.message };
  }, {});

  return res.status(400).json(message);
}
