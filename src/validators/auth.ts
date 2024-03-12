import { z } from 'zod';

const signinBodySchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

const signupBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export { signinBodySchema, signupBodySchema };
