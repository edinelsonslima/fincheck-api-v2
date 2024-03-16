import { signinBodySchema, signupBodySchema } from '@validators/auth';
import { z } from 'zod';

export type ISigninBodySchema = z.infer<typeof signinBodySchema>;
export type ISignupBodySchema = z.infer<typeof signupBodySchema>;
