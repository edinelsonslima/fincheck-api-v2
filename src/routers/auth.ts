import { authController } from '@controllers/auth';
import { signinBodySchema, signupBodySchema } from '@validators/auth';
import { Router } from 'express';
import { validate } from 'middleware/validators';

const router = Router();

router.post(
  '/signin',
  validate.schema(signinBodySchema),
  authController.signin
);

router.post(
  '/signup',
  validate.schema(signupBodySchema),
  authController.signup
);

export { router };
