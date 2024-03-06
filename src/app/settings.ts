/* eslint-disable no-console */
import { env as environments, exit } from 'node:process';

import { z } from 'zod';

const DEFAULT_PORT = 3000;

const schema = z.object({
  PORT: z.string().transform((port) => Number(port) || DEFAULT_PORT),

  DB_USER: z.string().min(1, 'is required'),
  DB_PASS: z.string().min(1, 'is required'),
  DB_SERVER: z.string().min(1, 'is required'),
  DB_DATABASE: z.string().min(1, 'is required'),
  DB_PORT: z.string().transform((port) => Number(port) || 1433),
});

const result = schema.safeParse(environments);

if (!result.success) {
  const errors = result.error.errors
    .map((err) => `=> ${err.path} ${err.message}`)
    .join(' \n');

  console.error(`environment variables error: \n%s`, errors);
  exit(1);
}

const env = result.data;
export { env };
