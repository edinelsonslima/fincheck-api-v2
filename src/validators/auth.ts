import { z } from 'zod';

export const signinBodySchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export const signupBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});
