import express from 'express';

import { router } from 'routers';

import { env } from './settings';

const app = express();

app.use(router);

app.listen(env.PORT, () => {
  console.log(`🚀 server is running in port ${env.PORT}`);
});
