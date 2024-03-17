/* eslint-disable no-console */
import 'express-async-errors';

import { enStatusCodes } from '@enums/status-code';
import { IRequest, IResponse } from '@interfaces/express';
import cors from 'cors';
import { DomainError } from 'errors/domain';
import express, { NextFunction } from 'express';
import { router } from 'routers';
import { env } from './settings';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((error: any, req: IRequest, res: IResponse, next: NextFunction) => {
  if (!(error instanceof DomainError)) {
    console.error(error);
    return res
      .status(enStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'internal server error' });
  }

  const { code, message, data } = error.toJSON();
  return res
    .status(code)
    .json({ message, ...(Object.keys(data).length && data) });
});

app.listen(env.PORT, () => {
  console.log('🚀 server is running on port %s', env.PORT);
});
