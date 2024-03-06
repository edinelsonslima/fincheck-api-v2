/* eslint-disable no-console */

import express from 'express';

import { db } from 'database';
import { router } from 'routers';

import { env } from './settings';

const app = express();

app.use(router);

db.connect()
  .then((pool) => {
    app.request.db = pool;

    app.listen(env.PORT, () => {
      console.log('🚀 server is running on port %s', env.PORT);
    });
  })
  .catch((err) =>
    console.error('🔥 fail in connect to database \n', err.message)
  );
