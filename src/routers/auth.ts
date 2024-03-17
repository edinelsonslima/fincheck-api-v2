import { authController } from '@controllers/auth';
import { bodyValidator } from '@middlewares/body-validator';
import { signinBodySchema, signupBodySchema } from '@validators/auth';
import { Router } from 'express';

const router = Router();

router.post('/signin', bodyValidator(signinBodySchema), authController.signin);

router.post('/signup', bodyValidator(signupBodySchema), authController.signup);

export { router };
