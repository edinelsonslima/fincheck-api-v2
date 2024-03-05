import { z } from 'zod';

const DEFAULT_PORT = 3000;

const schema = z.object({
  PORT: z.string().transform((port) => Number(port) || DEFAULT_PORT),
});

export const env = { ...schema.parse(process.env) };
