import express from "express";

import { env } from "./settings";
import { router } from "routers";

const app = express();

app.use(router);

app.listen(env.PORT, () => {
  console.log(`🚀 server is running in port ${env.PORT}`);
});
