import { authController } from '@controllers/auth';
import { validate } from '@middlewares/validate';
import { signinBodySchema, signupBodySchema } from '@validators/auth';
import { Router } from 'express';

const router = Router();

router.post(
  '/signin',
  validate('body', signinBodySchema),
  authController.signin
);

router.post(
  '/signup',
  validate('body', signupBodySchema),
  authController.signup
);

export { router };
