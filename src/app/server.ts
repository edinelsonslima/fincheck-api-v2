/* eslint-disable no-console */
import express from 'express';
import { router } from 'routers';
import { env } from './settings';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(env.PORT, () => {
  console.log('🚀 server is running on port %s', env.PORT);
});
